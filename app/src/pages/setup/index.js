import React, { Component } from 'react';

import './setup.css';

import database from '../../database'

import CreateScene from '../../components/createscene/CreateScene'
import CreateDay from '../../components/createday/CreateDay'
import CreatedDays from '../../components/createddays/CreatedDays'


export default class Setup extends Component {

  constructor(props) {
    super(props);

    this.state = {
      days: [],
    }

  }

  componentWillMount() {
    var prevDays = this.state.days;
    
    
        database.ref(this.props.state.festival).child('program').on('child_added', snap => {
          var vals = snap.val();
    
          prevDays.push({
            id: snap.key,
            date:vals.date,
          })
    
          this.setState({
            days: prevDays,
          })
        })
   
  }


  render() {
      return(
        <div id="">
          <h2>Create Scenes</h2>
          <table>
            <thead>
              <tr>
                  <th>Name</th>
                  <th>Capacity</th>
                  <th>Cost</th>
                  <th>Create</th>
              </tr>
            </thead>
            <tbody>
            
            <CreateScene
            festival={this.props.state.festival}/>

            </tbody>
          </table>

          <h2>My Scenes</h2>
          <table>
            <thead>
              <tr>
                  <th>Name</th>
                  <th>Capacity</th>
                  <th>Cost</th>
                  <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                  <p>will list all scenes...</p>
              </tr>

            </tbody>
          </table>


          <h2>Add Day</h2>
            <table>
            <CreateDay
              festival={this.props.state.festival}/>
            </table>
          
          <h2>Program</h2>
              
                {this.state.days.map((day) => {
                  return(<CreatedDays
                    day={day.date}
                    key={day.id}
                  />
                  )
                })
                }
             
        


        </div>
      )
  }
}
