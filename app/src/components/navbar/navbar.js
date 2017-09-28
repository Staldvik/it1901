import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';
import logo from '../../static/img/uka.png'

export default class NavComponent extends Component {

    render() {
        return(
            <div className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <h2>Arrangørsoftware for IT1901</h2>
                <nav>
                    <div className="wideDiv">
                        <Link to='/'>Home</Link>
                        <Link to='/concerts'>Concerts</Link>
                        <Link to='/bandbooking'>Band Booking</Link>
                        <Link to='/previousbands'>Previous Bands</Link>
                        <Link to='/banddatabase'>Band Database</Link>
                        <Link to='/calculator'>Profit Calculator</Link>
                        <Link to='/calendar'>Booking Calendar</Link>
                    </div>
                </nav>
            </div>
        )
    }

}
