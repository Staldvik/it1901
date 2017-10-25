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

// React Router
import {auth, roles} from '../../roles';



class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      errorCode: null,
      errorMessage: null,
      

      // Login
      loginOptions: [],
      selectedLogin: "",
      user: null,

    };

  }

  componentDidMount() {
    var previousLoginOptions = this.state.loginOptions
    var previousUser = this.state.user

    auth.authenticate(() => {
      console.log("Auth says logged in:", auth.user)
      previousUser = auth.user
    })

    database.ref('users').once('value', usersSnapshot => {
      usersSnapshot.forEach(userSnapshot => {
        previousLoginOptions.push(
          <option value={userSnapshot.val().email} key={userSnapshot.key}>{userSnapshot.val().displayName}</option> 
        )
      })
    }).then(() => {
      this.setState({
        loginOptions: previousLoginOptions,
        user: previousUser
      })
    })
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
    console.log("changing", event.target.name, "to", event.target.value)
    this.setState({
      [event.target.name]: event.target.value
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

  handleSignout = event => {
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

  changeUser = event => {
    event.preventDefault();

    firebaseApp.auth().signInWithEmailAndPassword(this.state.selectedLogin, "festival")
    .then((user) => {
      console.log("Signed In as", user)
      this.setState({
        errorCode:null, 
        errorMessage:null
      })
      this.forceUpdate();
    })
    .catch(error => {
      this.handleError(error);
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

        <div>
        {
          error
        }
        {
          redirected
        }

        <form>
          <label>
            Email:
            <input name="email" type="email" value={this.state.email} onChange={this.handleChange} />
          </label>
          <label>
            Password:
            <input name="password" type="password" value={this.state.password} onChange={this.handleChange} />
          </label>
          <button onClick={this.handleSignin}>Sign in</button>
          <button onClick={this.handleSignout}>Sign out</button>
          <button onClick={this.handleSignup}>Sign up</button>
        </form>

        <form>
          <h3> Dropdown to select user </h3>
          
          <select name="selectedLogin" value={this.state.selectedLogin} onChange={this.handleChange} >
            {this.state.loginOptions}
          </select>

          <button onClick={this.changeUser}>Change to</button>

        </form>
      </div>
      </div>
    );
  }
}

export default Login;
