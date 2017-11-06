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
import BandBookingResponsible from './pages/bandbookingresponsible';
import BandDatabase from './pages/banddatabase';
import PriceCalculator from './pages/pricecalculator';
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
import Technicians from './pages/technicians';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      festival: 'festival17', //this state will allow you to select which festival
      festivalName: "festival17", //just use this as a default
      isFestivalSelected: false,
      user: null,
      username: "Not logged in"
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
          database.ref("users").once("value", usersSnap => {
            usersSnap.forEach(userSnap => {
              console.log(userSnap.val())
              console.log(userSnap.key === user.uid)
              if (userSnap.key === user.uid) {
                this.setState({username: userSnap.val().displayName})
              }
            })
          })
          .then(() => {     
            console.log("Changed user")
            this.setState({
              user: user
            })
          })
          
        } else {
          // Logged out
          this.setState({
            user: null,
            username: "Not logged in"
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
    if (rolesForUser.admin === true || path === "/home") {return true}

    // Sjekk path
    switch(path) {

        case "/bandbooking":
            return rolesForUser.booking === true && rolesForUser["booking-manager"] === true
        
        case "/bandbookingresponsible":
            return rolesForUser.booking === true && rolesForUser["booking-responsible"] === true

        case "/banddatabase":
            return rolesForUser.booking === true

        case "/pricecalculator":
            return rolesForUser.booking === true

        case "/concerts":
            return rolesForUser.technician === true || rolesForUser.booking === true || rolesForUser.organizer === true

        case "/artists":
            return rolesForUser.booking === true

        case "/search":
            return rolesForUser.booking === true
        
        case "/setup":
            return rolesForUser.booking === true

        case "/manager":
            return rolesForUser.manager === true
        
        case "/technicians":
            return rolesForUser.manager === true
        default:
            return false

    }
  }



  render() {
    console.log("Displayname:", this.state.username)

    if (! this.state.isFestivalSelected){
      console.log("No festival. Redirecting to Frontpage")
      return <Route path="/" render={(props)=><FrontPage {...props} enter={this.enter}/>}/>
    } else if (!this.state.user && window.location.pathname !== "/home") {
      return <Redirect to="/home" />
    }

    const PrivateRoute = ({ component: Component, path: pathname, ...rest }) => (
      <Route {...rest} render={props => (
        this.isCorrectRole(pathname) ? (
          <Component {...props} state={this.state}/>
        ) : (
          <Redirect to={{
            pathname: '/home',
            state: { from: props.location }
          }}/>
        )
      )}/>
    )

    
    return (
      <div>
        <NavComponent user={this.state.user} username={this.state.username} festivalName={this.state.festivalName} exit={this.exit}/>

        <div className="container" id="mainContainer">
          <Switch>
            <Route exact path="/" render={(props)=><HomePage {...props} state={this.state}/>}/>
            <Route path="/login" render={(props)=><Login {...props} state={this.state}/>}/>
            <Route path="/home" render={(props) => <HomePage {...props} state={this.state}/>}/>


            <PrivateRoute path="/setup" component={Setup}/>
            <PrivateRoute path="/bandbooking" component={BandBooking}/>
            <PrivateRoute path="/bandbookingresponsible" component={BandBookingResponsible}/>
            
            <PrivateRoute path="/banddatabase" component={BandDatabase}/>
            <PrivateRoute path="/pricecalculator" component={PriceCalculator}/>
            <PrivateRoute path="/concerts" component={ConcertPage}/>
            <PrivateRoute path="/artists" component={Artists}/>
            <PrivateRoute path="/search" component={Search}/>
            <PrivateRoute path="/pr" component={PrSite}/>
            <PrivateRoute path="/admin" component={AdminPage}/>
            <PrivateRoute path="/manager" component={ManagerSite}/>
            <PrivateRoute path="/technicians" component={Technicians}/>
          </Switch>
        </div>
      </div>
    );
  }
  
}

export default App;
