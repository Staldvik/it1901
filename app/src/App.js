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

  render() {

    const PrivateRoute = ({ component: Component, path: pathname, ...rest }) => (
      <Route {...rest} render={props => (
        auth.isCorrectRole(pathname) ? (
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
          <NavComponent />
        </div>

        <div className="container">
          <Switch>
            <Route exact path="/" component={Login}/>
            <Route path="/login" component={Login}/>
            
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
