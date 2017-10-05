import React, { Component } from 'react';
import NavComponent from '../../components/navbar/navbar'

import './style.css';

import database from '../../database'
import Technician from '../../components/technician/Technician'
import Concert from '../../components/concert/Concert'

export default class AdminPage extends Component {
  // static propTypes = {}
  // static defaultProps = {}
  // state = {}
  constructor(props) {
    super(props);

    this.state = {
      concertsForTechnician: [],
      technicians: [],
      currentConcertInput: "",
      currentTechnicianInput: "",
      currentIdInput: "",
    }

    this.match = "";
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSubmitTech = this.handleSubmitTech.bind(this);
    this.searchConcertsFor = this.searchConcertsFor.bind(this);
  }

  componentWillMount() {
    var previousTechnicians = this.state.technicians;

    database.ref('DatabaseModelingTry').child('technicians').on('child_added', techSnapshot => {
      var val = techSnapshot.val();
      previousTechnicians.push({
        name: val.name,
        id: val.id,
        concerts: val.concerts,
      })
      this.setState({
        technicians: previousTechnicians,
        currentConcertInput: "",
        currentTechnicianInput: "",
        currentIdInput: ""
      })
    })
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    this.searchConcertsFor("name", this.state.currentConcertInput)
    .then(() => {
      database.ref("DatabaseModelingTry").child('concerts').child(this.match.key).child('technicians').child(this.state.currentIdInput).set({
        name: this.state.currentTechnicianInput,
        id: this.state.currentIdInput,
      })
    })
  }

  handleSubmitTech(e) {
    e.preventDefault();
    database.ref("DatabaseModelingTry").child('technicians').child(this.state.currentIdInput).set({
      name: this.state.currentTechnicianInput,
      id: this.state.currentIdInput
    })
  }

  searchConcertsFor(query, value) {
    return database.ref("DatabaseModelingTry").child('concerts').once('value').then(concertsSnapshot => {
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
          TeknikerTest
        </h1>
        <p> Dette er bare en test for å hente konserten som en spesifik tekniker står på (planen er at de
          skal dukke opp som div'er under formen) </p>

        <form>
          <h3> Denne formen er for å pushe en tekniker inn i databasen </h3>
          <input name="currentTechnicianInput" type="text" value={this.state.currentTechnicianInput} onChange={this.handleChange} placeholder="Technician Name" />
          <input name="currentIdInput" type="number" value={this.state.currentIdInput} onChange={this.handleChange} placeholder="id" />
          <button onClick={this.handleSubmitTech}>Pushit</button>
        </form>

        <form>
          <h3> Denne formen er for å pushe en tekniker inn i konserten </h3>
          <input name="currentTechnicianInput" type="text" value={this.state.currentTechnicianInput} onChange={this.handleChange} placeholder="Technician Name" />
          <input name="currentIdInput" type="number" value={this.state.currentIdInput} onChange={this.handleChange} placeholder="id" />
          <input name="currentConcertInput" type="text" value={this.state.currentConcertInput} onChange={this.handleChange} placeholder="Concert Name" />
          <button onClick={this.handleSubmit}>Pushit</button>
        </form>
        <div>
          <h1> Concerts for [feature coming soon] </h1> 
          {
            this.state.concertsForTechnician.map((concert) => {
              return (
                <Concert name={concert.name}/>
              )
            })
          }
        </div>

        <div>
          <h1> Technicians found in database </h1>
          {
            this.state.technicians.map((technician) => {
              console.log("Trying to make a tech DIV" + technician.name);
              return (
                <Technician name={technician.name} id={technician.id} key={technician.id} />
              )
            })
          }
        </div>
      </div>
    );
  }
}