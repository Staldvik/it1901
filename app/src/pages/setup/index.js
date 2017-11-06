import React, { Component } from 'react';

import './setup.css';

import database from '../../database'

import CreateScene from '../../components/createscene/CreateScene'
import CreateDay from '../../components/createday/CreateDay'
import CreatedDays from '../../components/createddays/CreatedDays'
import SceneList from '../../components/scenelist/SceneList'


export default class Setup extends Component {

  constructor(props) {
    super(props);

    this.state = {
      days: [],
      scenes: [],
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


    var prevScenes = this.state.scenes;
    
        database.ref(this.props.state.festival).child('scenes').on('child_added', snap => {
          var vals = snap.val();
          prevScenes.push({
            id: snap.key,
            name: vals.name,
            capacity: vals.capacity,
            cost: vals.cost,
          })
    
          this.setState({
            scenes: prevScenes,
          })
        })
   
  }


  render() {
      return(
        <div id="setupPage">
          <h2>Create Scenes</h2>
          <table className="setupTable">
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
          <table className="setupTable">
            <thead>
              <tr>
                  <th>Name</th>
                  <th>Capacity</th>
                  <th>Cost</th>
                  
              </tr>
            </thead>
            <tbody>
              {this.state.scenes.map((scene) => {
                  return(<SceneList
                    festival={this.props.state.festival}
                    id={scene.id}
                    name={scene.name}
                    capacity={scene.capacity}
                    cost={scene.cost}
                  />
                  )
                })
                }

            </tbody>
          </table>


          <h2>Add Day</h2>
            <table className="setupTable">
            <CreateDay
              festival={this.props.state.festival}/>
            </table>
          
          <h2>Program</h2>

                {this.state.days.map((day) => {
                  return(<CreatedDays
                    festival={this.props.state.festival}
                    day={day.date}
                    id={day.id}
                  />
                  )
                })
                }
        


        </div>
      )
  }
}
