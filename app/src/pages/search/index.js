import React, { Component } from 'react';
import NavComponent from '../../components/navbar/navbar'
import './style.css';
import database from '../../database';
import Concert from '../../components/concert/Concert';
import Technician from '../../components/technician/Technician';


export default class Search extends Component {
  constructor() {
    super();
    this.state = {
      technicians: [],
    }

  }

  componentWillMount() {

    /* var clientId = '88641e06b03f46d886b98db9c58e9935',
        clientSecret = '8b9aa7488fb2456a98d4168dd4b5c2c4';

    var spotifyApi = new SpotifyWebApi({
      clientId: clientId,
      clientSecret: clientSecret
    });

    spotifyApi.clientCredentialsGrant()
      .then(data => {
        console.log(data);
      }) */

    
  }
  
    render(){
      return(
        <div className="App">
          <NavComponent/>

          <h1> Lets search </h1>
          


        </div>
      )
    }
}
