import React, { Component } from 'react';
import './style.css';
import Artist from '../../components/artist/Artist'
import Concert from '../../components/concert/Concert'
import Technician from '../../components/technician/Technician'
import Scene from '../../components/scene/Scene'

// Prøver å lage navbar
import NavComponent from '../../components/navbar/navbar';

// Firebase
import database, {firebaseApp} from '../../database';

import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";

// React Router
import {auth, roles} from '../../routes'



class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      errorCode: null,
      errorMessage: null,
    };

  }

  componentWillMount() {
    auth.authenticate(() => {
      console.log("Auth says logged in:", auth.isAuthenticated)
    })

    roles.fetchRoles(() => {
      console.log("Roles says users:", roles.roleMap)
    })

    
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSignup = event => {
    event.preventDefault();

    firebaseApp.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
    .catch(error => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode, errorMessage)
      this.setState({
        errorCode: errorCode,
        errorMessage: errorMessage
      })
    })
  }

  handleSignin = event => {
    event.preventDefault();

    firebaseApp.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
    .then(() => {
      console.log("Signed In")
      this.setState({
        errorCode:null, 
        errorMessage:null
      })
    })
    .catch(error => {
      this.handleError(error);
    })
  }

  handleSignOut = event => {
    event.preventDefault();

    firebaseApp.auth().signOut()
    .then(() => {
      console.log("Signed Out")
      this.forceUpdate()
    })
    .catch(error => {
      this.handleError(error);
    }) 
  }
  
  handleError = error => {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorCode, errorMessage)
    this.setState({
      errorCode: errorCode,
      errorMessage: errorMessage,
      email: "",
      password: "",
    })
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } }

    var error = ""
    // TODO: catch them all
    switch(this.state.errorCode) {
      case "auth/user-not-found":
        error = <h3> User not found </h3>
        break;
      
      case "auth/email-already-in-use":
        error = <h3> This email is already in use </h3>
        break; 

      default:
        error = <h3> {this.state.errorCode} </h3>
        break;
    }

    var redirected = ""
    if (from.pathname !== "/") {
      redirected = <h3> You don't have access to {from.pathname} </h3>
    }

    return (

      <div className="App">
        <NavComponent />

        <h1 className="App-intro">
          Login/Signup
        </h1>

        <div className="Login">
        {
          error
        }
        {
          redirected
        }

        {
          // Her prøvde jeg bare å bruke react-bootstrap, det gikk ikke i første omgang.
          // FormGroup og slikt er altså ikke viktig for funksjonaliteten
        }
        <form>
          <FormGroup controlId="email" bsSize="large">
            <ControlLabel>Email</ControlLabel>
            <FormControl
              autoFocus
              type="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="password" bsSize="large">
            <ControlLabel>Password</ControlLabel>
            <FormControl
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
            />
          </FormGroup>
          <Button
            block
            bsSize="large"
            disabled={!this.validateForm()}
            onClick={this.handleSignin}
            id="signin"
          >
            Login
          </Button>
          <Button
            block
            bsSize="large"
            disabled={!this.validateForm()}
            onClick={this.handleSignup}
            id="signup"
          >
            Sign Up
          </Button>
          <Button
            block
            bsSize="large"
            onClick={this.handleSignOut}
            id="signout"
          >
            Sign Out
          </Button>
        </form>
      </div>
      </div>
    );
  }
}

export default Login;
