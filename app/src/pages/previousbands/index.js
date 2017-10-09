import React, { Component } from 'react';
import NavComponent from '../../components/navbar/navbar'
import './style.css';
import database from '../../database';
import Concert from '../../components/concert/Concert';
import Technician from '../../components/technician/Technician'

export default class PreviousBands extends Component {
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
  
    render(){
      return(
        <div className="App">
          <NavComponent/>

          <h1> Teknikere </h1>

          <div className="techniciansBody">
          {
          this.state.technicians.map((technician) => {
            return (
              <div>
                <ul>
                  <li> {technician.name} </li>
                </ul>
              </div>
              
            )
          })
          }
          </div>
        </div>
      )
    }
}
