import React, { Component } from 'react';
import './style.css';
import Artist from '../../components/artist/Artist'
import Concert from '../../components/concert/Concert'
import Technician from '../../components/technician/Technician'
import Scene from '../../components/scene/Scene'

// Firebase
import database, {firebaseApp} from '../../database';

// React Router
import {Redirect} from 'react-router-dom';

// Material
import {
  TextField,
  RaisedButton,
  Tab,Tabs,


} 
from 'material-ui';



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
      redirectToReferrer: false,

    };

  }

  componentDidMount() {
    var previousLoginOptions = this.state.loginOptions
    var previousUser = this.state.user
    var previousSelectedLogin = this.state.selectedLogin

    database.ref('users').once('value', usersSnapshot => {
      usersSnapshot.forEach(userSnapshot => {
        previousLoginOptions.push(
          <option value={userSnapshot.val().email} key={userSnapshot.key}>{userSnapshot.val().displayName}</option> 
        )

        if (! previousSelectedLogin) {
          previousSelectedLogin = userSnapshot.val().email
        }
      })
    }).then(() => {
      this.setState({
        loginOptions: previousLoginOptions,
        selectedLogin: previousSelectedLogin,
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
    .then(() => {
      this.setState({redirectToReferrer: true})
    })
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
        errorMessage:null,
        redirectToReferrer: true,
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

    // Logg inn med epost fra dropdown og passord festival (som er passordet til alle brukere jeg har lagt inn)
    firebaseApp.auth().signInWithEmailAndPassword(this.state.selectedLogin, "festival")
    .then((user) => {
      console.log("Signed In as", user)
      this.setState({
        errorCode:null, 
        errorMessage:null,
        redirectToReferrer: true,
      })

    })
    .catch(error => {
      this.handleError(error);
    })

  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } }

    if (this.state.redirectToReferrer) {
      return(
        <Redirect to={from.pathname} />
      )
    }

    var error = ""
    // TODO: catch them all
    switch(this.state.errorCode) {
      case "auth/user-not-found":
        error = <h3 className="Error-message"> User not found </h3>
        break;
      
      case "auth/email-already-in-use":
        error = <h3 className="Error-message"> This email is already in use </h3>
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
      <div>

        <hgroup>
          <h2>Login</h2>
        </hgroup>

        <Tabs style={"max-width: 50%"}>
          <Tab label="Login" >
            <div>
              <h2>Login</h2>
              <TextField
                floatingLabelText="Username"
                /><br />
              <TextField
                hintText="Password Field"
                floatingLabelText="Password"
                type="password"
              /><br />
      
              <span> 
                <RaisedButton label="Sign In" backgroundColor="lightgreen" />
                <RaisedButton label="Log Out" backgroundColor="lightgreen" />
                <RaisedButton label="Sign Up" backgroundColor="lightgreen" />
              </span>
            </div>
          </Tab>
          <Tab label="Sign Up" >
            <div>
              <h2>Tab Two</h2>
              <p>
                This is another example tab.
              </p>
            </div>
          </Tab>
        </Tabs>     
      
      </div>




      /* <div className="App">

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

        <form className="Login-form">
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
      </div> */
    );
  }
}

export default Login;
