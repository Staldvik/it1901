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

// React Router
import {
  BrowserRouter as Router,
  Link,
  Redirect,
  withRouter,
  Switch,
  Route
} from 'react-router-dom';

//Pages
import BandBooking from './pages/bandbooking';
import PreviousBands from './pages/previousbands';
import BandDatabase from './pages/banddatabase';
import PriceCalculator from './pages/pricecalculator';
import BookingCalendar from './pages/bookingcalendar';
import ConcertPage from './pages/concertpage';
import Artists from './pages/artists';
import ManagerSite from './pages/manager_site'
import AdminPage from './pages/adminpage';
import Search from './pages/search';
import Login from './pages/login';
import PrSite from './pages/pr_site'

//Roles
import {roles, auth} from './roles';

class App extends Component {

  constructor() {
    super();

    this.state = {
      message: "Hello from App",
      user: null
    }

    this.roleMap = new Map()
  }

  componentWillMount() {
    // Get user from firebase Auth
    console.log("Running auth")
    firebaseApp.auth().onAuthStateChanged(user => {
      if (user) {
        // Logged in
        this.setState({
          user: user
        })
      } else {
        // Logged out
        this.setState({
          user: null
        })
      }
    })
  }

  componentDidMount() {
    database.ref('users').once("value", users => {
      users.forEach(user => {
          console.log(user.val().displayName)
          this.roleMap.set(user.key, user.val().roles)
      })
    })
    .then(() => {
      console.log("Component did mount")
      console.log("User", this.state.user)
      console.log("roles for user", this.roleMap.get(this.state.user.uid))
      console.log(this.isCorrectRole("/bandbooking", this.roleMap.get(this.state.user.uid)))
    })
  }

  isCorrectRole = path => {
    var rolesForUser = this.roleMap.get(this.state.user.uid)

    if (rolesForUser === undefined) {return false}

    // Admin har tilgang til alt
    console.log("Roles for user",rolesForUser)
    if (rolesForUser.admin === true) {return true}

    // Sjekk path
    switch(path) {

        case "/bandbooking":
            return rolesForUser.booking == true

        case "/previousbands":
            return rolesForUser.booking == true

        case "/banddatabase":
            return rolesForUser.booking == true

        case "/pricecalculator":
            return rolesForUser.booking == true

        case "/calendar":
            return rolesForUser.booking == true

        case "/concerts":
            return rolesForUser.technician == true || rolesForUser.booking == true

        case "/artists":
            return rolesForUser.booking == true

        case "/search":
            return rolesForUser.booking == true

        case "/manager":
            return rolesForUser.manager == true
            
        default:
            return false

    }
  }



  render() {

    if (this.state.user === null) {
      return <div>Loading</div>
    }

    const PrivateRoute = ({ component: Component, path: pathname, ...rest }) => (
      <Route {...rest} render={props => (
        this.isCorrectRole(pathname) ? (
          <Component {...props}/>
        ) : (
          <Redirect to={{
            pathname: '/login',
            state: { from: props.location }
          }}/>
        )
      )}/>
    )

    return (
      <div className="App">
        <div className="navbar">
          <NavComponent user={this.state.user} />
        </div>

        <div className="container">
          <Switch>
            <Route exact path="/" component={Login}/>
            <Route path="/login" component={Login}/>
            
            <PrivateRoute path="/bandbooking" component={BandBooking} state={this.state}/>
            <PrivateRoute path="/previousbands" component={PreviousBands}/>
            <PrivateRoute path="/banddatabase" component={BandDatabase}/>
            <PrivateRoute path="/pricecalculator" component={PriceCalculator}/>
            <PrivateRoute path="/calendar" component={BookingCalendar}/>
            <PrivateRoute path="/concerts" component={ConcertPage}/>
            <PrivateRoute path="/artists" component={Artists}/>
            <PrivateRoute path="/search" component={Search}/>
            <PrivateRoute path="/pr" component={PrSite}/>
            <PrivateRoute path="/admin" component={AdminPage}/>
            <PrivateRoute path="/manager" component={ManagerSite}/>
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
