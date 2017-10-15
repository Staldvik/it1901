import React, { Component } from 'react';
import NavComponent from '../../components/navbar/navbar'

import './style.css';

import Technician from '../../components/technician/Technician'
import Concert from '../../components/concert/Concert'

//Firebase
import database from '../../database'

export default class AdminPage extends Component {

  constructor(props) {
    super(props);
    var technicianMap = new Map();

    this.state = {
      concerts: [],
      concertOptions: [],
      technicianOptions: [],
      technicianMap: technicianMap,

      // Technician => Concert form
      selectedTechnician: "",
      selectedConcert: "",

      // Technician => database form
      currentTechnicianConcert: "",
      currentTechnicianNameInput: "",
      currentTechnicianIdInput: "",

      // Concert => database form
      currentConcertNameInput: "",
      currentConcertGenreInput: "",
      currentConcertPriceInput: "",
      currentConcertDayInput: "day1",
    }

    // Binder for å få tilgang til dem i andre funksjoner i denne klassen
    this.match = "";
    this.handleChange = this.handleChange.bind(this);
    this.pushTech = this.pushTech.bind(this);
    this.handleSubmitTech = this.handleSubmitTech.bind(this);
    this.handleSubmitConcert = this.handleSubmitConcert.bind(this);
    this.searchConcertsFor = this.searchConcertsFor.bind(this);
  }


  // Kjøres når siden/komponenten lastes
  componentWillMount() {
    // Tar vare på verdier vi skal endre på i denne funksjonen
    // Dette er fordi man ikke skal endre på state direkte
    var previousTechnicianMap = this.state.technicianMap;
    var previousConcerts = this.state.concerts;

    // Tilgjengelige valg for formen til å pushe en tekniker inn i en konsert.
    var previousConcertOptions = this.state.concertOptions;
    var previousTechnicianOptions = this.state.technicianOptions;

    // Valgt option for formen til å pushe en tekniker inn i en konsert. 
    var previousSelectedConcert = this.state.selectedConcert;
    var previousSelectedTechnician = this.state.selectedTechnician;

    //Kjøres en gang og gir alt av data under "festival17" som en snapshot
    database.ref('festival17').once('value', festivalSnapshot => {
      
      // For hver tekniker i festival-snapshotet
      festivalSnapshot.child('technicians').forEach(technicianSnapshot => {

        // Hvis det ikke er valgt noen tekniker, sett til denne tekniker (som også blir første option i dropdown)
        if (previousSelectedTechnician === "") {
          previousSelectedTechnician = technicianSnapshot.key
        }

        // Lag option for denne teknikeren
        previousTechnicianOptions.push(
          <option value={technicianSnapshot.key} key={technicianSnapshot.key}> {technicianSnapshot.val().name} </option>
        )

        // Map ligner veldig på dictionary fra python. Her tar vi vare på teknikerens navn og keyen er rett og slett key.
        // Dette gjør vi for å slippe å sjekke databasen bare for å finne navnet som samsvarer til key. 
        previousTechnicianMap.set(technicianSnapshot.key, technicianSnapshot.val().name)
      })

      // For hver konsert i festival-snapshotet
      festivalSnapshot.child('concerts').forEach(concertSnapshot => {
        // Hvis det ikke er valgt en konsert, sett til denne konserten (som også blir første option i dropdown)
        if (previousSelectedConcert === "") {
          previousSelectedConcert = concertSnapshot.key; 
        }

        // Lag option for denne konserten
        previousConcertOptions.push(
          <option label={concertSnapshot.val().name} value={concertSnapshot.key} key={concertSnapshot.key}> {concertSnapshot.val().name} </option>
        )

        // Ta vare på konserten
        previousConcerts.push(concertSnapshot)
      })

      // Oppdater "staten" med alle disse vi har pushet til/endret på
      this.setState({
        technicianOptions: previousTechnicianOptions,
        technicianMap: previousTechnicianMap,
        concertOptions: previousConcertOptions,
        concerts: previousConcerts,
        selectedConcert: previousSelectedConcert,
        selectedTechnician: previousSelectedTechnician,
      })
    })
    
    //Lytter etter child added på tekniker, altså om tekniker blir lagt til
    // Den nye teknikeren vil ikke vises i dropdown før componenten blir rendered på nytt. Dette for å unngå duplikater.
    //database.ref('festival17').child('technicians').orderByKey().limitToLast(1).on('child_added', lastTechnician => {
      //console.log(lastTechnician);

      //var previousTechnicianMap = this.state.technicianMap;
      //var previousConcerts = this.state.concerts;

      //previousTechnicianMap.set(parseInt(lastTechnician.key), lastTechnician.val().name)

      //this.setState({
      //  technicianOptions: previousTechnicianOptions,
     //   technicianMap: previousTechnicianMap,
      //})
    //})
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }


  pushTech(e) {
    e.preventDefault();
    database.ref('festival17').child('concerts').child(this.state.selectedConcert).child('technicians').child(this.state.selectedTechnician).set({
      name: this.state.technicianMap.get(this.state.selectedTechnician),
    })
  }

  handleSubmitTech(e) {
    e.preventDefault();
    //regner ut index for ny tekniker til alltid å være en høyere enn den høyeste.
    //Dermed hindrer man overskriving hvis teknikere er fjernet
    let indices = []
    for(var key of this.state.technicianMap.keys()){
      indices.push(parseInt(key)); //key må være en int for å finne max
      }
    var maxIndex = indices.reduce(function(a, b) {
      return Math.max(a, b);
    });

    database.ref("festival17").child('technicians').child(maxIndex+1).set({
      name: this.state.currentTechnicianNameInput
    })
  }

  handleSubmitConcert(e) {
    e.preventDefault();
    if (this.state.currentConcertNameInput.length > 2 && this.state.currentConcertGenreInput.length > 2 && !isNaN(this.state.currentConcertPriceInput)) {
      var data = {
        name: this.state.currentConcertNameInput,
        day: this.state.currentConcertDayInput,
        price: this.state.currentConcertPriceInput,
        genre: this.state.currentConcertGenreInput,
      }
      database.ref('festival17').child('concerts').push(data)
    } else {
      alert("need more info")
    }   
  }

  searchConcertsFor(query, value) {
    return database.ref('festival17').child('concerts').once('value').then(concertsSnapshot => {
      return concertsSnapshot.forEach(concertSnapshot => {
        if (concertSnapshot.val()[query] == value) {
          this.match = concertSnapshot;
          console.log(this.match);
        }
      })
    })
  }


  render() {
    return (
      <div className="App">
        <NavComponent />
        <h1>
          AdminPage
        </h1>

        <p> Dette er en haug med former for å legge til forskjellige ting i databasen </p>

        <form>
          <h3> Denne formen er for å pushe en tekniker inn i databasen </h3>
          <input name="currentTechnicianNameInput" type="text" value={this.state.currentTechnicianNameInput} onChange={this.handleChange} placeholder="Technician Name" />
          <button onClick={this.handleSubmitTech}>Pushit</button>
        </form>

        <form>
          <h3> Denne formen er for å pushe en tekniker inn i konserten </h3>
          <select name="selectedTechnician" onChange={this.handleChange} value={this.state.selectedTechnician}>
            {this.state.technicianOptions}
          </select>
          <select name="selectedConcert" onChange={this.handleChange} value={this.state.selectedConcert}>
            {this.state.concertOptions}
          </select>
          <button onClick={this.pushTech}>Pushit</button>
        </form>

        <form>
          <h3> Denne formen er for å pushe en konsert inn i databasen </h3>
          <input type="text" name="currentConcertNameInput" placeholder="Name" value={this.state.currentConcertNameInput} onChange={this.handleChange}/>
          <input type="text" name="currentConcertGenreInput" placeholder="Genre" value={this.state.currentConcertGenreInput} onChange={this.handleChange}/>
          <input type="number" name="currentConcertPriceInput" placeholder="Price" value={this.state.currentConcertPriceInput} onChange={this.handleChange}/>
          <select name="currentConcertDayInput" onChange={this.handleChange} value={this.state.currentConcertDayInput}>
            <option value="day1">Dag 1</option>
            <option value="day2">Dag 2</option>
            <option value="day3">Dag 3</option>
            <option value="day4">Dag 4</option>
            <option value="day5">Dag 5</option>
            <option value="day6">Dag 6</option>
            <option value="day7">Dag 7</option>
          </select>
          <button onClick={this.handleSubmitConcert}> Pushit</button>
        </form>
      </div>
    );
  }
}