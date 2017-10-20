import React from 'react';
import { Switch, Route } from 'react-router-dom';
import {
    BrowserRouter as Router,
    Link,
    Redirect,
    withRouter
  } from 'react-router-dom';

//Firebase
import database, {firebaseApp} from './database';


//Pages
import App from './App';
import BandBooking from './pages/bandbooking';
import PreviousBands from './pages/previousbands';
import BandDatabase from './pages/banddatabase';
import PriceCalculator from './pages/pricecalculator';
import BookingCalendar from './pages/bookingcalendar';
import ConcertPage from './pages/concertpage';
import ManagerSite from './pages/manager_site'
import AdminPage from './pages/adminpage';
import Search from './pages/search';
import Login from './pages/login';


const auth = {
  user: null,
  authenticate(callback) {
    firebaseApp.auth().onAuthStateChanged(user => {
        if (user) {
          //TODO check if correct role
          this.isAuthenticated = true
          this.user = user
          callback();
        } else {
          this.isAuthenticated = false
          this.user = false
          callback();
        }
      })
  },
  isCorrectRole(path) {
    var rolesForUser = roles.roleMap.get(this.user.uid)
    // Admin har tilgang til alt
    if (rolesForUser.admin === true) {return true}
    switch(path) {

        case "/manager":
            return rolesForUser.manager == true
    }
  }
}


// Tanken er user som key og roles som value
const roles = {
    roleMap: new Map(),
    fetchRoles(callback) {
        database.ref('users').once("value", users => {
            users.forEach(user => {
                console.log(user.val().displayName)
                this.roleMap.set(user.key, user.val().roles)
            })
        }).then(() => {
            callback()
        })
    }
}

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

const Routes = () => (
    <Switch>
        <Route exact path="/" component={Login}/>
        <Route path="/login" component={Login}/>
        <Route path="/bandbooking" component={BandBooking}/>
        <Route path="/previousbands" component={PreviousBands}/>
        <Route path="/banddatabase" component={BandDatabase}/>
        <Route path="/pricecalculator" component={PriceCalculator}/>
        <Route path="/calendar" component={BookingCalendar}/>
        <Route path="/concerts" component={ConcertPage}/>
        <Route path="/search" component={Search}/>
        <Route path="/home" component={App}/>

        <PrivateRoute path="/admin" component={AdminPage}/>
        <PrivateRoute path="/manager" component={ManagerSite}/> 
    </Switch>
);

export default Routes;
export {auth, roles};
