import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';
import logo from '../../static/img/festival.png'

// Firebase
import database, {firebaseApp} from '../../database';

export default class NavComponent extends Component {
    
    constructor() {
        super();
        this.state = {
            user: null
        }
    }

    componentWillMount() {
        firebaseApp.auth().onAuthStateChanged(user => {
            if (user) {
              console.log(user.uid)
              this.setState({user: user})
            } else {
              // User is signed out.
              // ...
            }
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
                        <Link to='/home'>Home</Link>
                        <Link to='/concerts'>Concerts</Link>
                        <Link to='/bandbooking'>Band Booking</Link>
                        <Link to='/previousbands'>TeknikerTest</Link>
                        <Link to='/banddatabase'>Band Database</Link>
                        <Link to='/pricecalculator'>Ticket Price Calculator</Link>
                        <Link to='/calendar'>Booking Calendar</Link>
                        <Link to='/admin'>Admin Page</Link>
                        <Link to='/manager'>Manager Site</Link>
                    </div>
                </nav>
            </div>
        )
    }
}
