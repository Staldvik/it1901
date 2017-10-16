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
    var myHeaders = new Headers();
    
    var myInit = { method: 'GET',
                   headers: myHeaders,
                   mode: 'cors',
                   cache: 'default' };
    
    var myRequest = new Request('https://us-central1-festival-180609.cloudfunctions.net/app/', myInit);
    
    fetch(myRequest).then(function(response) {
      console.log(response.json().then(file => {
        return console.log(file["Hello"])
      }))
    })
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
