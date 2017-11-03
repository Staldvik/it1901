import React, { Component } from 'react';

import './style.css';
import database from '../../database';

export default class PreviousBands extends Component {
  constructor() {
    super();
    this.state = {
      technicians: [],
    }

  }

  componentWillMount() {
    var previousTechnicians = this.state.technicians;

    database.ref(this.props.state.festival).child('technicians').on('child_added', technicianSnapshot => {
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
