import React, { Component } from 'react';

import './setup.css';

import database from '../../database'

import CreateScene from '../../components/createscene/CreateScene'


export default class Setup extends Component {

  constructor(props) {
    super(props);

    this.state = {
    }

  }

  componentWillMount() {
   
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


        </div>
      )
  }
}
