import React, { Component } from 'react';
import './App.css';

// Prøver å lage navbar
import NavComponent from './components/navbar/navbar';

// Firebase
import database, {firebaseApp} from './database';

// React Router
import {Switch, Route, Redirect} from 'react-router-dom';

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
import PrSite from './pages/pr_site';
import FrontPage from './pages/frontpage';
import HomePage from './pages/homepage';
import Setup from './pages/setup';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      festival: 'festival17', //this state will allow you to select which festival
      festivalName: "festival17", //just use this as a default
      isFestivalSelected: false,
      message: "Hello from App",
      user: null
    }

    this.roleMap = new Map()
  }

  // Callback kalles som en funksjon når database-søket er ferdig.
  // Dermed kan man sende inn en funksjon som skal kjøres når updateRoleMap blir ferdig.
  updateRoleMap(callback) {
    database.ref('users').once("value", users => {
      users.forEach(user => {
          console.log(user.val().displayName)
          this.roleMap.set(user.key, user.val().roles)
      })
    })
    .then(
      callback()
    )
  }

  componentWillMount() {
    // Get user from firebase Auth
    console.log("Running auth")
    this.updateRoleMap(() => {
      // Dette kjøres når updateRoleMap() er ferdig
      firebaseApp.auth().onAuthStateChanged(user => {
        if (user) {
          // Logged in
          console.log("Changed user")
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
    })

    this.enter = this.enter.bind(this) //to enter the selected festival
    this.exit = this.exit.bind(this) //to enter the selected festival

    console.log(this.state.isFestivalSelected)
  }

  componentDidMount() {
    
  }

  exit(){
    console.log("exited festival")
    this.setState({
      isFestivalSelected: false,
    })
  }

  enter(festival,name){
    console.log("switched to festival", name, "with key:",festival)
    this.setState({
      isFestivalSelected: true,
      festival: festival,
      festivalName: name,
    })
  }

  isCorrectRole = path => {
    if (this.state.user === null) {return false}

    console.log("isCorrectRole is checking", path, "And user is", this.state.user)
    var rolesForUser = this.roleMap.get(this.state.user.uid)
    console.log("roles for user is",rolesForUser)

    // Mulig rolemap ikke er oppdatert?
    if (rolesForUser === undefined) {
      // I så fall oppdater
      this.updateRoleMap(() => {
        rolesForUser = this.roleMap.get(this.state.user.uid)
        // Om fortsatt ikke returner false, mulig en feil har skjedd?
        if (rolesForUser === undefined) {
          console.log("Roles for user still undefined!")
          return false
        }
      })
    }

    // Admin har tilgang til alt
    if (rolesForUser.admin === true) {return true}

    // Sjekk path
    switch(path) {

        case "/bandbooking":
            return rolesForUser.booking === true 

        case "/previousbands":
            return rolesForUser.booking === true

        case "/banddatabase":
            return rolesForUser.booking === true

        case "/pricecalculator":
            return rolesForUser.booking === true

        case "/calendar":
            return rolesForUser.booking === true

        case "/concerts":
            return rolesForUser.technician === true || rolesForUser.booking === true

        case "/artists":
            return rolesForUser.booking === true

        case "/search":
            return rolesForUser.booking === true
        
        case "/setup":
            return rolesForUser.booking === true

        case "/manager":
            return rolesForUser.manager === true
            
        default:
            return false

    }
  }



  render() {

    if (! this.state.isFestivalSelected){
      console.log("No festival. Redirecting to Frontpage")
      return <Route path="/" render={(props)=><FrontPage {...props} enter={this.enter}/>}/>
    } else if (!this.state.user && window.location.pathname !== "/login") {
      return <Redirect to="/login" />
    }

    const PrivateRoute = ({ component: Component, path: pathname, ...rest }) => (
      <Route {...rest} render={props => (
        this.isCorrectRole(pathname) ? (
          <Component {...props} state={this.state}/>
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
        <div className="navbar-container">
          <NavComponent user={this.state.user} festivalName={this.state.festivalName} exit={this.exit}/>
        </div>

        <div className="content-container">
          <Switch>
            <Route exact path="/" render={(props)=><HomePage {...props} state={this.state}/>}/>
            <Route path="/login" render={(props)=><Login {...props} state={this.state}/>}/>

            <PrivateRoute path="/setup" component={Setup}/>
            <PrivateRoute path="/bandbooking" component={BandBooking}/>
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
