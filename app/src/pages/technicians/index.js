import React, { Component } from 'react';


import './style.css';

import Technician from '../../components/technician/Technician'
import Concert from '../../components/concert/Concert'
import TechniciansList from '../../components/technicianslist/TechniciansList'

//Firebase
import database from '../../database'
//region
/**
 * Component that renders the technicians page 
 */
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

  /**
   * Pulls information from the database
   */
  componentWillMount() {
    var previousTechnicians = this.state.technicians;
    var previousConcertOptions = this.state.concertOptions;
    var previousTechnicianOptions = this.state.technicianOptions;
    var previousTechnicianMap = this.state.technicianMap;
    var previousArtists = this.state.artists;

    // User Form
    var previousUserOptions = this.state.userOptions;

    var firstConcert = ""
    database.ref(this.props.state.festival).child('concerts').on('child_added', concertSnapshot => {
      console.log(concertSnapshot.val().name)
      console.log(concertSnapshot.key)
      previousConcertOptions.push(
        <option label={concertSnapshot.val().name} value={concertSnapshot.key} key={concertSnapshot.key}> {concertSnapshot.val().name} </option>
        
      )
      if (! firstConcert) {
        firstConcert = concertSnapshot.key
      }
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
        selectedTechnician: techSnapshot.key, //set the selected to the one last added to prevent error if none i selected
        selectedConcert: firstConcert// Funket ikke: previousConcertOptions[0].value,
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

  /**
   * Keeps the state synced with fields
   * @param {event} e 
   */
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }


  /**
   * Checks if technician is in concert
   */
  isTechInConcert() { 
    console.log("Running check: is tech already in concert?");
    console.log("Festivalkey:", this.props.state.festival, "Selected concert:", this.state.selectedConcert)
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

  /**
   * Pushes technician into concert
   * @param {event} e 
   */
  pushTech(e) {
    e.preventDefault();

    // Kjør isTechInConcert, denne returnerer en Promise.
    // Promisen vi får tilbake kan vi kalle .then() på. then() kjøres når Promisen blir "resolved" altså returnerer noe.
    // Da får man også med variabelen(e) som ble returnert i Promisen.
    this.isTechInConcert()
    .then(isInConcert => {

     
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

  


 
  /**
   * Pushes a new technician into the database
   * @param {event} e 
   */
  handleSubmitTech(e) {
    e.preventDefault();

    database.ref(this.props.state.festival).child('technicians').push({
      name: this.state.currentTechnicianNameInput
    })
    this.setState({ //setter input boksen tilbake til tom
      currentTechnicianNameInput: "",
    })
  }

  

  /**
   * Generic function that searches concert query for value and sets this.match to concert that matches
   * @param {String} query 
   * @param {String} value 
   */
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

  /**
   * Renders the page
   */
  render() {
    return (
      <div className="App">

        <form>
          <h2> Add Technician</h2>
          <input name="currentTechnicianNameInput" type="text" value={this.state.currentTechnicianNameInput} onChange={this.handleChange} placeholder="Technician Name" />
          <button onClick={this.handleSubmitTech}>Add</button>
        </form>
        <br></br>
        
        <table>
          <thead>
                <tr>
                 <th>Technicians</th>
                </tr>
          </thead>
          
          <tbody>
            <tr>
              {this.state.technicians.map((tech) => {
                      return(<TechniciansList
                      name = {tech.name}
                      />)
                  })
              }
            </tr>


          </tbody>
        
        </table>

        <br></br>
        <form>
          <h2>Assign to concert</h2>
          <select name="selectedTechnician" onChange={this.handleChange} value={this.state.selectedTechnician}>
            {this.state.technicianOptions}
          </select>
          <select name="selectedConcert" onChange={this.handleChange} value={this.state.selectedConcert}>
            {this.state.concertOptions}
          </select>
          <button onClick={this.pushTech}>Assign</button>
        </form>

      </div>
    );
  }
}
