import React, { Component } from 'react';
import NavComponent from '../../components/navbar/navbar'
import './style.css';
import Concert from '../../components/concert/Concert'

//firebase
import database from '../../database'

export default class ConcertPage extends Component {
  // static propTypes = {}
  // static defaultProps = {}

  constructor() {
    super();

    this.state = {
      concerts: [],
      opts: [<option value="showAll"> show all </option>],
      selectedTech: "showAll",
    }

    this.handleChange = this.handleChange.bind(this);

  }

  componentWillMount() {
    var previousConcerts = this.state.concerts;
    var previousOpts = this.state.opts;
    var previousSelectedTech = this.state.selectedTech;    

    database.ref('festival17').child('concerts').on('child_added', concertSnapshot => {
      var vals = concertSnapshot.val();
      previousConcerts.push({
        name: vals.name,
        genre: vals.genre,
        price: vals.price,
        day: vals.day,
        key: concertSnapshot.key,
        technicians: vals.technicians
      })
    })

    database.ref('festival17').child('technicians').on('child_added', technicianSnapshot => {
      previousOpts.push(
        <option key={technicianSnapshot.key} value={technicianSnapshot.key}> {technicianSnapshot.val().name + " " + technicianSnapshot.key} </option>
      )
      this.setState({
        concerts: previousConcerts,
        opts: previousOpts,
        selectedTech: previousSelectedTech,
      })
    })
  }


  handleChange(e) {
    var previousConcerts = this.state.concerts;
    var previousOpts = this.state.opts;

    this.setState({
      concerts: previousConcerts,
      opts: previousOpts,
      selectedTech: e.target.value,
    })    
    console.log("Selected tech set to: " + e.target.value)
  }

  render() {
    return (
      <div className="App">
        <NavComponent />
        <h1>
          Concerts
        </h1>
        <p> Alle konsertene til teknikeren funnet i databasen </p>
        <div className="select">     
          <select onChange={this.handleChange} value={this.state.selectedTech}>
            {this.state.opts}
          </select>
        </div>
        <div className="concertsBody"> 
          {
            // Går gjennom alle konsertene den finner i concerts-arrayet og returnerer en ny Concert-component fra hver av disse.
            this.state.concerts.map((concert) => {
              let match = false;

              // Sjekk om alle skal vises
              if (this.state.selectedTech == "showAll") {
                match = true;
              }

              // Hvis ikke, sjekk om konserten har noen teknikere på seg
              else if (concert.technicians != undefined) {
                console.log(this.state.selectedTech)
                if (concert.technicians[this.state.selectedTech] != undefined) {
                  match = true;
                }

              }
                
              if (match) {
                return (
                  <Concert name={concert.name} price={concert.price} sales={concert.sales} genre={concert.genre} key={concert.key} day={concert.day} technicians={concert.technicians} />
                )
              }
                          
            })
          }
        </div>
      </div>
    );
  }
}