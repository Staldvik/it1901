import React, { Component } from 'react';
import NavComponent from '../navbar/navbar'
import logo from '../../uka.png'

import './style.css';

export default class BookingCalendar extends Component {
  // static propTypes = {}
  // static defaultProps = {}
  // state = {}

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Arrangørsoftware for </h2>
          <NavComponent />
        </div>
        <h1>
          Booking Calendar
        </h1>
        <p> This is just to test React-Router </p>
      </div>
    );
  }
}