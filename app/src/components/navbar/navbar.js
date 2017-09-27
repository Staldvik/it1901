import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';

export default class NavComponent extends Component {

    render() {
        return(
            <nav>
                <div className="wideDiv">
                    <Link to='/'>Home</Link>
                    <Link to='/bandbooking'>Band Booking</Link>
                    <Link to='/previousbands'>Previous Bands</Link>
                    <Link to='/banddatabase'>Band Database</Link>
                    <Link to='/calculator'>Profit Calculator</Link>
                    <Link to='/calendar'>Booking Calendar</Link>
                </div>
            </nav>
        )
    }

}