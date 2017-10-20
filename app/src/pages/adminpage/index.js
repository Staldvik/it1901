import React, { Component } from 'react';
import NavComponent from '../../components/navbar/navbar'

import './style.css';

import Technician from '../../components/technician/Technician'
import Concert from '../../components/concert/Concert'

//Firebase
import database from '../../database'
//region
export default class AdminPage extends Component {
//endregion
  constructor(props) {
    super(props);
    var technicianMap = new Map();

    this.state = {
      technicians: [],
      concertOptions: [],
      technicianOptions: [],
      selectedConcert: "",
      selectedTechnician: "",
      technicianMap: technicianMap,

      // Technician form
      currentTechnicianConcert: "",
      currentTechnicianNameInput: "",
      currentTechnicianIdInput: "",

      // Concert form
      currentConcertNameInput: "",
      currentConcertGenreInput: "",
      currentConcertInput: "",
      currentConcertPriceInput: "",
      currentConcertDayInput: "",
    }


    
    this.match = "";
    this.handleChange = this.handleChange.bind(this);
    this.pushTech = this.pushTech.bind(this);
    this.handleSubmitTech = this.handleSubmitTech.bind(this);
    this.handleSubmitConcert = this.handleSubmitConcert.bind(this);
    this.searchConcertsFor = this.searchConcertsFor.bind(this);
    this.isTechInConcert = this.isTechInConcert.bind(this);
  }

  componentWillMount() {
    var previousTechnicians = this.state.technicians;
    var previousConcertOptions = this.state.concertOptions;
    var previousTechnicianOptions = this.state.technicianOptions;
    var previousTechnicianMap = this.state.technicianMap;

    database.ref('festival17').child('concerts').on('child_added', concertSnapshot => {
      console.log(concertSnapshot.val().name)
      previousConcertOptions.push(
        <option label={concertSnapshot.val().name} value={concertSnapshot.key} key={concertSnapshot.key}> {concertSnapshot.val().name} </option>
      )
    })


    database.ref('festival17').child('technicians').on('child_added', techSnapshot => {
      var val = techSnapshot.val();
      previousTechnicians.push({
        name: val.name,
        id: techSnapshot.key,
      })
      console.log('adding option for', techSnapshot.val().name)
      previousTechnicianOptions.push(
        <option value={techSnapshot.key} key={techSnapshot.key}> {techSnapshot.val().name} </option>
      )
      previousTechnicianMap.set(techSnapshot.key, techSnapshot.val().name)
      this.setState({
        technicians: previousTechnicians,
        concertOptions: previousConcertOptions,
        technicianOptions: previousTechnicianOptions,
        technicianMap: previousTechnicianMap,
        currentTechnicianConcert: "",
        currentTechnicianNameInput: "",
        currentTechnicianIdInput: ""
      })
    })
    
    //Lytter etter child added på tekniker, altså om tekniker blir lagt til
    // Den nye teknikeren vil ikke vises i dropdown før componenten blir rendered på nytt. Dette for å unngå duplikater.
    database.ref('festival17').child('technicians').orderByKey().limitToLast(1).on('child_added', lastTechnician => {
      console.log(lastTechnician.val().name +  " added");
      var previousTechnicianMap = this.state.technicianMap;
      previousTechnicianMap.set(parseInt(lastTechnician.key), lastTechnician.val().name)

      this.setState({
        technicianOptions: previousTechnicianOptions,
        technicianMap: previousTechnicianMap,
      })
    })
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

 

  isTechInConcert(){ //sjekker om en tekniker allerede er i en konsert
    console.log("is technician already in concert");
    let bool = false;
    const currentKey = this.state.selectedTechnician
    database.ref('festival17').child('concerts').child(this.state.selectedConcert).child('technicians').once('value', function(snap) {
      snap.forEach(function(childSnap){
        if(childSnap.key == currentKey){
          console.log(currentKey, "equals", childSnap.key)
          bool = true
          console.log("this is the result after comparison", bool)
      }    
      bool= bool;
    })
    })
    return bool;
  }

  pushTech(e) {
    e.preventDefault();
    console.log(this.state.selectedTechnician);
    console.log("this is the return value of the function", this.isTechInConcert())
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
    this.setState({ //setter input boksen tilbake til tom
      currentTechnicianNameInput: "",
    })
  }

  handleSubmitConcert(e) {
    e.preventDefault();
    if (this.state.currentConcertNameInput.length > 2 && this.state.currentConcertGenreInput.length > 2 && !isNaN(this.state.currentConcertPriceInput)) {
      var data = {
        name: this.state.currentConcertNameInput,
        day: this.state.currentConcertDayInput
      }
      database.ref('festival17').child('concerts').push({
        name: this.state.currentConcertNameInput,
        day: this.state.currentConcertDayInput,
      })
    } else {
      alert("need more info")
    } 
    this.setState({ //setter input boksen tilbake til tom
      currentConcertNameInput: "",
      currentConcertDayInput: "Day1",
      currentConcertPriceInput: "",
      currentConcertGenreInput: "",
    })  
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
          <button onClick={this.handleSubmitTech}>Submit</button>
        </form>

        <form>
          <h3> Denne formen er for å pushe en tekniker inn i konserten </h3>
          <select name="selectedTechnician" onChange={this.handleChange} value={this.state.selectedTechnician}>
            {this.state.technicianOptions}
          </select>
          <select name="selectedConcert" onChange={this.handleChange} value={this.state.selectedConcert}>
            {this.state.concertOptions}
          </select>
          <button onClick={this.pushTech}>Submit</button>
        </form>

        <form>
          <h3> Denne formen er for å pushe en konsert inn i databasen </h3>
          <input type="text" name="currentConcertNameInput" placeholder="Name" value={this.state.currentConcertNameInput} onChange={this.handleChange}/>
          <input type="text" name="currentConcertGenreInput" placeholder="Genre" value={this.state.currentConcertGenreInput} onChange={this.handleChange}/>
          <input type="number" name="currentConcertPriceInput" placeholder="Price" value={this.state.currentConcertPriceInput} onChange={this.handleChange}/>
          <select name="currentConcertDayInput" onChange={this.handleChange}>
            <option value="day1">Dag 1</option>
            <option value="day2">Dag 2</option>
            <option value="day3">Dag 3</option>
            <option value="day4">Dag 4</option>
            <option value="day5">Dag 5</option>
            <option value="day6">Dag 6</option>
            <option value="day7">Dag 7</option>
          </select>
          <button onClick={this.handleSubmitConcert}> Submit</button>
        </form>
      </div>
    );
  }
}