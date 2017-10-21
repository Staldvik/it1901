import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';
import logo from '../../static/img/festival.png'

// Firebase
import database, {firebaseApp} from '../../database';

// Roles
import {auth, roles} from '../../roles';

export default class NavComponent extends Component {
    
    constructor() {
        super();
        this.state = {
            user: null
        }
    }

    componentDidMount() {
        auth.authenticate((user) => {
            this.setState({user: user})
        })
    }


    render() {
        var loggedInAs = "Not logged in"

        if (this.state.user) {
            loggedInAs = this.state.user.email.split('@')[0]
        } 


        return(
            <div className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <h2>Arrangørsoftware for IT1901 [Logged in as: {loggedInAs}]</h2>
                <nav>
                    <div className="wideDiv">
                        <Link id="navLink" to='/'>Home</Link>
                        <Link id="navLink" to='/concerts'>Concerts</Link>
                        <Link id="navLink" to='/artists'>My Artists</Link>
                        <Link id="navLink" to='/bandbooking'>Band Booking</Link>
                        <Link id="navLink" to='/previousbands'>TeknikerTest</Link>
                        <Link id="navLink" to='/banddatabase'>Band Database</Link>
                        <Link id="navLink" to='/pricecalculator'>Ticket Price Calculator</Link>
                        <Link id="navLink" to='/calendar'>Booking Calendar</Link>
                        <Link id="navLink" to='/admin'>Admin Page</Link>
                        <Link id="navLink" to='/manager'>Manager Site</Link>
                    </div>
                </nav>
            </div>
        )
    }
}
