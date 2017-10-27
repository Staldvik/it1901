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

class App extends Component {

  constructor() {
    super();

    this.state = {
      festival: 'festival16', //this state will allow you to select which festival
      festivalName: "festival16", //just use this as a default
      isFestivalSelected: false,
      message: "Hello from App",
      user: null
    }

    this.roleMap = new Map()
  }

  componentWillMount() {
    // Get user from firebase Auth
    console.log("Running auth")
    database.ref('users').once("value", users => {
      users.forEach(user => {
          console.log(user.val().displayName)
          this.roleMap.set(user.key, user.val().roles)
      })
    })
    .then(() => {
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

    database.ref("isFestivalSelected").once("value", snap => {
      let bool = snap.val();
      this.setState({
        isFestivalSelected: bool,
      })
    })

    database.ref("selectedFestival").once("value", snap => {
      let festival = snap.val();
      
      this.setState({
        festival: festival,
      })
    })

    database.ref("selectedFestivalName").once("value", snap => {
      let festivalName = snap.val();
      this.setState({
        festivalName: festivalName,
      })
    })

    this.enter = this.enter.bind(this) //to enter the selected festival
  }

  componentDidMount() {
    
  }

  enter(festival,name){
    database.ref("selectedFestival").set(festival)
    database.ref("selectedFestivalName").set(name)
    database.ref("isFestivalSelected").set("true")
    console.log("switched to festival: ", name)
    this.setState({
      festivalSelected: true,
    })

    database.ref("isFestivalSelected").once("value", snap => {
      let bool = snap.val();
      console.log("heuhuehuafhhefhaefaufueuafuehu", festival)
      this.setState({
        isFestivalSelected: bool,
      })
    })

    database.ref("selectedFestival").once("value", snap => {
      let festival = snap.val();
      console.log("heuhuehuafhhefhaefaufueuafuehu", festival)
      this.setState({
        festival: festival,
      })
    })

    database.ref("selectedFestivalName").once("value", snap => {
      let festivalName = snap.val();
      this.setState({
        festivalName: festivalName,
      })
    })
    
  }

  isCorrectRole = path => {
    console.log("isCorrectRole is checking", path, "And user is", this.state.user)
    var rolesForUser = this.roleMap.get(this.state.user.uid)
    console.log("while roles for user is",rolesForUser)

    if (rolesForUser === undefined) {return false}

    // Admin har tilgang til alt
    if (rolesForUser.admin === true) {console.log("User is admin so returned true"); return true}

    // Sjekk path
    switch(path) {

        case "/":
          return true

        case "/login":
          return true

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

        case "/manager":
            return rolesForUser.manager === true
            
        default:
            return false

    }
  }



  render() {

    if (this.state.user === null) {
      return <div>Loading</div>
    }

    if (! this.state.isFestivalSelected) {
      return <Route exact path="/" render={(props)=><FrontPage {...props} enter={this.enter}/>}/>
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
          <NavComponent user={this.state.user} festivalName={this.state.festivalName}/>
        </div>

        <div className="content-container">
          <Switch>
            <Route exact path="/" render={(props)=><FrontPage {...props} enter={this.enter}/>}/>
            <Route path="/login" render={(props)=><Login {...props} state={this.state}/>}/>

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
