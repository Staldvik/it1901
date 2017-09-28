import React, { Component } from 'react';
import NavComponent from '../../components/navbar/navbar'
import './style.css';

export default class BandBooking extends Component {
  // static propTypes = {}
  // static defaultProps = {}
  // state = {}

  render() {
    return (
      <div className="App">
        <NavComponent />
        <h1>
          Band Booking
        </h1>
        <p> This is just to test React-Router </p>
      </div>
    );
  }
}
