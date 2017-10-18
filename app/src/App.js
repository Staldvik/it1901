import React, { Component } from 'react';
import './App.css';
import Artist from './components/artist/Artist'
import Concert from './components/concert/Concert'
import Technician from './components/technician/Technician'
import Scene from './components/scene/Scene'

// Prøver å lage navbar
import NavComponent from './components/navbar/navbar';

// Firebase
import database, {firebaseApp} from './database';

import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: ""
    };

  }

  validateForm() {
    return this.state.username.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSignup = event => {
    event.preventDefault();

    firebaseApp.auth().createUserWithEmailAndPassword(this.state.username, this.state.password).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode, errorMessage)
    })
  }

  handleSignin = event => {
    event.preventDefault();

    firebaseApp.auth().signInWithEmailAndPassword(this.state.username, this.state.password).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode, errorMessage)
    })
  }
  
  
  render() {
    return (
    <div className="App">
        <NavComponent />
        <p className="App-intro">
          Hver div er en component
        </p>

        <Artist name="Kygo" age={26} info="Kyrre Gørvell-Dahll, bedre kjent under artistnavnet Kygo, er en EDM-musiker fra Fana i Bergen i Hordaland.
        Han ble kjent gjennom nettstedene YouTube og SoundCloud, der han publiserer sin musikk som samlet har over 400 millioner treff." popularity={10} albumSales={400} cost={50000} earlierConcerts={["test1", "test2"]}
        />

        <Concert price={300} sales={150} genre="Rock" />

        <Technician name="Tekniker1" concerts={[<Concert price={300} sales={150} genre="Rock" />]} />

        <Scene name="Dødens Dal" capacity={1000} cost={7500} />

      </div>
    );
  }
}

export default App;
