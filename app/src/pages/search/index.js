import React, { Component } from 'react';
import NavComponent from '../../components/navbar/navbar'
import './style.css';
import database from '../../database';
import Concert from '../../components/concert/Concert';
import Technician from '../../components/technician/Technician';
import * as SpotifyWebApi from 'spotify-web-api-node';

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

      
      var client_id = '88641e06b03f46d886b98db9c58e9935'; // Your client id
      var client_secret = '8b9aa7488fb2456a98d4168dd4b5c2c4'; // Your secret
      
      // your application requests authorization
      var authOptions = {
        headers: {
          'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
        },
        form: {
          grant_type: 'client_credentials'
        },
        json: true
      };

      var myRequest = new Request('https://accounts.spotify.com/api/token', authOptions);

      fetch(myRequest).then(response => console.log(response))
      
      
    
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
