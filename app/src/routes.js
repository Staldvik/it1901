import React from 'react';
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
import PreviousBands from './pages/previousbands';
import BandDatabase from './pages/banddatabase';
import PriceCalculator from './pages/pricecalculator';
import BookingCalendar from './pages/bookingcalendar';
import ConcertPage from './pages/concertpage';
import Artists from './pages/artists';
import ManagerSite from './pages/manager_site'
import AdminPage from './pages/adminpage';
import Search from './pages/search';
import SearchPreviousBands from './pages/search_previous_bands';
import Login from './pages/login';


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
        <Route path="/bandbooking" component={BandBooking}/>
        <Route path="/previousbands" component={PreviousBands}/>
        <Route path="/banddatabase" component={BandDatabase}/>
        <Route path="/pricecalculator" component={PriceCalculator}/>
        <Route path="/calendar" component={BookingCalendar}/>
        <Route path="/concerts" component={ConcertPage}/>
        <Route path="/artists" component={Artists}/>
        <Route path="/search" component={Search}/>
<<<<<<< HEAD
        <Route path="/search_previous_bands" component={SearchPreviousBands}/>
=======

        <PrivateRoute path="/admin" component={AdminPage}/>
        <PrivateRoute path="/manager" component={ManagerSite}/> 
>>>>>>> master
    </Switch>
);

export default Routes;
