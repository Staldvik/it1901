import React, { Component } from 'react';
import NavComponent from '../../components/navbar/navbar'
import './style.css';
import database from '../../database';
import Concert from '../../components/concert/Concert';
import Technician from '../../components/technician/Technician'

export default class PreviousBands extends Component {
  // static propTypes = {}
  // static defaultProps = {}
  // state = {}

  constructor() {
    super();
    this.state = {
      technicians: [],
    }

  }

  componentWillMount() {
    var previousTechnicians = this.state.technicians;

    database.ref('festival17').child('technicians').on('child_added', technicianSnapshot => {
      var vals = technicianSnapshot.val();
      previousTechnicians.push ({
        name:vals.name,
      })
    this.setState({
      technicians: previousTechnicians,
    })
  })

  }





   /*  return database.ref('festival').once('value').then(festivalSnapshot => {
      return festivalSnapshot.forEach(daySnapshot => {
        return daySnapshot.child('concerts').forEach(concertSnapshot => {
          if (concertSnapshot.val()[query] == value) {
            this.matches.push(concertSnapshot);
            console.log(this.matches);
          }
        })
      })
    }) */
    render(){
      return(
        <div className="app">
          <NavComponent/>

          <h1> Teknikere </h1>
          <ul>
          <li> Tekniker1 </li>
          <li> Tekniker2 </li>
          </ul>

          <div className="techniciansBody">
          {
          this.state.technicians.map((technician) => {
            return (
              <Technician name={technician.name} />
            )
          })
          }
          </div>
        </div>
      )
    }
}
