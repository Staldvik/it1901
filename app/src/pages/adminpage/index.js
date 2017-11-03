import React, { Component } from 'react';


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
      artists: [],
      currentConcertNameInput: "",
      currentConcertGenreInput: "",
      currentConcertInput: "",
      currentConcertPriceInput: "",
      currentConcertContactInfo: "",
      currentConcertSalesNumber: "",
      currentConcertDayInput: "",

      // User form
      selectedRole: "",
      selectedUser: "",
      userOptions: [],
      roleOptions: [
        <option value="admin" key="admin">admin</option>,
        <option value="servering" key="servering">servering</option>,
        <option value="band" key="band">band</option>,
        <option value="booking-responsible" key="bookingansvarlig">bookingansvarlig</option>,
        <option value="booking-manager" key="bookingsjef">bookingsjef</option>,
        <option value="tekniker" key="tekniker">tekniker</option>,
        <option value="manager" key="manager">manager</option>,
        <option value="pr-ansvarlig" key="pr-ansvarlig">pr-ansvarlig</option>
      ]
    }



    this.match = "";
    this.handleChange = this.handleChange.bind(this);
    this.pushTech = this.pushTech.bind(this);
    this.pushRole = this.pushRole.bind(this);
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
        currentTechnicianIdInput: ""
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

    database.ref('users').on('child_added', user => {
      console.log(user.key)
      previousUserOptions.push(
        <option value={user.key} key={user.key}>{ user.val().displayName } </option>
      )
      this.setState({userOptions: previousUserOptions})
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

      // Hvis i konsert:
      // TODO: Feedback til bruker
      } else {
        console.log("Technician was already in concert")
      }
    })
  }

  pushRole(e) {
    e.preventDefault();

    if (this.state.selectedRole === "booking-responsible" || this.state.selectedRole === "booking-manager") {
      database.ref('users').child(this.state.selectedUser).child("roles").update({
        [this.state.selectedRole]: true,
        "booking": true,
      })
    } else {
      database.ref('users').child(this.state.selectedUser).child("roles").update({
        [this.state.selectedRole]: true
      })
    }
    
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
          <h3> Denne formen er for å legge til rettigheter på bruker </h3>
          <select name="selectedUser" onChange={this.handleChange} value={this.state.selectedUser}>
            {this.state.userOptions}
          </select>
          <select name="selectedRole" onChange={this.handleChange} value={this.state.selectedRole}>
            {this.state.roleOptions}
          </select>
          <button onClick={this.pushRole}>Submit</button>
        </form>
      </div>
    );
  }
}
