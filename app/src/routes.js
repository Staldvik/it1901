/* import React from 'react';
import { Switch, Route } from 'react-router-dom';
import {
    BrowserRouter as Router,
    Link,
    Redirect,
    withRouter
  } from 'react-router-dom';

//Roles
import {roles, auth} from './roles';

//Pages
import App from './App';
import BandBooking from './pages/bandbooking';
import  from './pages/';
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
        <Route exact path="/" component={App}/>
        <Route path="/login" component={Login}/>
        
        <PrivateRoute path="/bandbooking" component={BandBooking}/>
        <PrivateRoute path="/" component={}/>
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
);

export default Routes; */
