import React from 'react';
import { Switch, Route } from 'react-router-dom';

import App from './App';
import BandBooking from './components/bandbooking';
import PreviousBands from './components/previousbands';
import BandDatabase from './components/banddatabase';
import ProfitCalculator from './components/profitcalculator';
import BookingCalendar from './components/bookingcalendar';

const Routes = () => (
    <Switch>
        <Route exact path="/" component={App}/>
        <Route path="/bandbooking" component={BandBooking}/>
        <Route path="/previousbands" component={PreviousBands}/>
        <Route path="/banddatabase" component={BandDatabase}/>
        <Route path="/calculator" component={ProfitCalculator}/>
        <Route path="/calendar" component={BookingCalendar}/>
    </Switch>
);

export default Routes;