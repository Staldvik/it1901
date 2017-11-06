import React, { Component } from 'react';


import './style.css';

import Technician from '../../components/technician/Technician'
import Concert from '../../components/concert/Concert'

//Firebase
import database from '../../database'
//region
export default class Technicians extends Component {
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
      artists: [],
      currentConcertNameInput: "",
      currentConcertGenreInput: "",
      currentConcertInput: "",
      currentConcertPriceInput: "",
      currentConcertContactInfo: "",
      currentConcertSalesNumber: "",
      currentConcertDayInput: "",

    }



    this.match = "";
    this.handleChange = this.handleChange.bind(this);
    this.pushTech = this.pushTech.bind(this);
    this.handleSubmitTech = this.handleSubmitTech.bind(this);
    this.searchConcertsFor = this.searchConcertsFor.bind(this);
    this.isTechInConcert = this.isTechInConcert.bind(this);
  }

  componentWillMount() {
    var previousTechnicians = this.state.technicians;
    var previousConcertOptions = this.state.concertOptions;
    var previousTechnicianOptions = this.state.technicianOptions;
    var previousTechnicianMap = this.state.technicianMap;
    var previousArtists = this.state.artists;

    // User Form
    var previousUserOptions = this.state.userOptions;

    database.ref(this.props.state.festival).child('concerts').on('child_added', concertSnapshot => {
      console.log(concertSnapshot.val().name)
      previousConcertOptions.push(
        <option label={concertSnapshot.val().name} value={concertSnapshot.key} key={concertSnapshot.key}> {concertSnapshot.val().name} </option>
      )
    })

    database.ref(this.props.state.festival).child('technicians').on('child_added', techSnapshot => {
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
        currentTechnicianIdInput: "",
        selectedTechnician: techSnapshot.key //set the selected to the one last added to prevent error if none i selected
      })
    })

    // Henter ut artistene i databasen
    database.ref(this.props.state.festival).child('artists').on('child_added', artistSnapShot => {
      var val = artistSnapShot.val();
      previousArtists.push({
        name: val.name,
        id: artistSnapShot.key,
      })
    })

    //Lytter etter child added på tekniker, altså om tekniker blir lagt til
    // Den nye teknikeren vil ikke vises i dropdown før componenten blir rendered på nytt. Dette for å unngå duplikater.
    database.ref(this.props.state.festival).child('technicians').orderByKey().limitToLast(1).on('child_added', lastTechnician => {
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



  isTechInConcert() { 
    console.log("Running check: is tech already in concert?");
    var isInConcert = false;
    var currentTechKey = this.state.selectedTechnician;

    // Returnerer en Promise. Når then() kjøres sendes isInConcert gjennom denne Promisen
    return database.ref(this.props.state.festival).child('concerts').child(this.state.selectedConcert).child('technicians').once('value', techSnap => {
      techSnap.forEach(technician => {
        // Hvis denne teknikeren i konserten er den vi ser etter, er den i konserten
        if (technician.key === currentTechKey) {
          isInConcert = true
        }
      })
    })
    // Når databasegreiene er ferdig, returner isInConcert gjennom Promisen
    .then(() => {
      return isInConcert
    })
  }

  pushTech(e) {
    e.preventDefault();

    // Kjør isTechInConcert, denne returnerer en Promise.
    // Promisen vi får tilbake kan vi kalle .then() på. then() kjøres når Promisen blir "resolved" altså returnerer noe.
    // Da får man også med variabelen(e) som ble returnert i Promisen.
    this.isTechInConcert()
    .then(isInConcert => {

      // Hvis ikke i konsert:
      // TODO: Feedback til bruker
      if (!isInConcert) {
        database.ref(this.props.state.festival).child('concerts').child(this.state.selectedConcert).child('technicians').child(this.state.selectedTechnician).set({
          name: this.state.technicianMap.get(this.state.selectedTechnician),
        })

        alert(this.state.technicianMap.get(this.state.selectedTechnician) + " assigned to work on that concert")

      } else {
        alert(this.state.technicianMap.get(this.state.selectedTechnician) + " is already assigned to that concert")
        console.log("Technician was already in concert")
      }
    })
  }

 

  handleSubmitTech(e) {
    e.preventDefault();

    database.ref(this.props.state.festival).child('technicians').push({
      name: this.state.currentTechnicianNameInput
    })
    this.setState({ //setter input boksen tilbake til tom
      currentTechnicianNameInput: "",
    })
  }

  


  searchConcertsFor(query, value) {
    return database.ref(this.props.state.festival).child('concerts').once('value').then(concertsSnapshot => {
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
        <h1>
          Technicians
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

      </div>
    );
  }
}
