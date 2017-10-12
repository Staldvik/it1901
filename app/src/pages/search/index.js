import React, { Component } from 'react';
import NavComponent from '../../components/navbar/navbar'
import './style.css';
import database from '../../database';
import Concert from '../../components/concert/Concert';
import Technician from '../../components/technician/Technician'

export default class Search extends Component {
  constructor() {
    super();
    this.state = {
      technicians: [],
    }

  }

  componentWillMount() {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Basic 88641e06b03f46d886b98db9c58e9935:8b9aa7488fb2456a98d4168dd4b5c2c4")
    var myInit = { 
      method: 'POST',
      headers: myHeaders,
      body: {"grant_type":"client_credentials"},
      mode: 'no-cors',
      cache: 'default' 
    };
    
    fetch("https://accounts.spotify.com/api/token", {
      method: "post",
      headers: {
        'Authorization': "Basic 88641e06b03f46d886b98db9c58e9935:8b9aa7488fb2456a98d4168dd4b5c2c4"
      },
      body: JSON.stringify({
        "grant_type": "client_credentials"
      }),
      mode: 'no-cors'
    })
    
    
    
    
    .then((data) => {console.log(data)})

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
