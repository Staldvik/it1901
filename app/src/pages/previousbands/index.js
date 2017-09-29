import React, { Component } from 'react';
import NavComponent from '../../components/navbar/navbar'
import './style.css';
import database from '../../database';
import Concert from '../../components/concert/Concert';

export default class PreviousBands extends Component {
  // static propTypes = {}
  // static defaultProps = {}
  // state = {}

  constructor(props) {
    super(props);

    this.state = {
      concertsForTechnician: [],
      currentConcertInput: "",
      currentTechnicianInput: "",
      currentIdInput: "",
    }

    this.matches = [];
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.searchConcertsFor = this.searchConcertsFor.bind(this);
  }

  componentWillMount() {
    var previousConcertsForTechnician = this.state.concertsForTechnician;

    database.ref().child('festival').on('child_added', daySnapshot => {
      daySnapshot.child('concerts').forEach(concertSnapshot => {
        concertSnapshot.child('technicians').forEach(techSnapshot => {
          console.log("Techcshchsch");
          var vals = techSnapshot.val();
          previousConcertsForTechnician.push({
            name: vals.name,
            id: vals.id
          })
        })
      })
      this.setState({
        concertsForTechnician: previousConcertsForTechnician,
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
    this.searchConcertsFor("name", this.state.currentConcertInput).then(match => {
      if (this.matches.length > 0) {
        var insertIntoThese = [];
        for (var i = 0; i < this.matches.length; i++) {
          insertIntoThese.push(this.matches[i]);
          console.log(insertIntoThese);
        }
        for (var j = 0; j < insertIntoThese.length; j++) {
          var day = insertIntoThese[j].ref.parent.parent.key;
          console.log("Day: " + day);
          var key = insertIntoThese[j].key;
          console.log("Key: " + key);
          
          database.ref("festival").child(day).child('concerts').child(key).child('technicians').push({
            name: this.state.currentTechnicianInput,
            id: this.state.currentIdInput
          });
        }
      } else {
        console.log("No matches in array?");
      }
    })
  }

  searchConcertsFor(query, value) {
    return database.ref('festival').once('value').then(festivalSnapshot => {
      return festivalSnapshot.forEach(daySnapshot => {
        return daySnapshot.child('concerts').forEach(concertSnapshot => {
          if (concertSnapshot.val()[query] == value) {
            this.matches.push(concertSnapshot);
            console.log(this.matches);
          }
        })
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

        <p> Formen er for å pushe en tekniker inn i en konsert </p>
        <form>
          <input name="currentTechnicianInput" type="text" value={this.state.currentTechnicianInput} onChange={this.handleChange} placeholder="Technician Name" />
          <input name="currentIdInput" type="number" value={this.state.currentIdInput} onChange={this.handleChange} placeholder="id" />
          <input name="currentConcertInput" type="text" value={this.state.currentConcertInput} onChange={this.handleChange} placeholder="Concert Name" />
          <button onClick={this.handleSubmit}>Pushit</button>
        </form>
        <div> 
          {
            this.state.concertsForTechnician.map((concert) => {
              return (
                <Concert name={concert.name}/>
              )
            })
          }
        </div>
      </div>
    );
  }
}