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
            user: null,
            viewableLinks: []
        }

        this.adminLinks = [
            <Link id="navLink" to='/'>Home</Link>,
            <Link id="navLink" to='/concerts'>Concerts</Link>,
            <Link id="navLink" to='/artists'>My Artists</Link>,
            <Link id="navLink" to='/bandbooking'>Band Booking</Link>,
            <Link id="navLink" to='/previousbands'>TeknikerTest</Link>,
            <Link id="navLink" to='/banddatabase'>Band Database</Link>,
            <Link id="navLink" to='/pricecalculator'>Ticket Price Calculator</Link>,
            <Link id="navLink" to='/calendar'>Booking Calendar</Link>,
            <Link id="navLink" to='/admin'>Admin Page</Link>,
            <Link id="navLink" to='/manager'>Manager Site</Link>,
            <Link id="navLink" to='/pr'>Pr Site</Link>,
        ]
        this.managerLinks = [
            <Link id="navLink" to='/'>Home</Link>,
            <Link id="navLink" to='/manager'>Manager Site</Link>,
        ]
        this.prLinks = [
            <Link id="navLink" to='/'>Home</Link>,
            <Link id="navLink" to='/pr'>Pr Site</Link>,
        ]
        this.technicianLinks = [
            <Link id="navLink" to='/'>Home</Link>,
            <Link id="navLink" to='/concerts'>Concerts</Link>,
        ]
        this.bookingLinks = [
            <Link id="navLink" to='/'>Home</Link>,
            <Link id="navLink" to='/concerts'>Concerts</Link>,
            <Link id="navLink" to='/artists'>My Artists</Link>,
            <Link id="navLink" to='/bandbooking'>Band Booking</Link>,
            <Link id="navLink" to='/previousbands'>TeknikerTest</Link>,
            <Link id="navLink" to='/banddatabase'>Band Database</Link>,
            <Link id="navLink" to='/pricecalculator'>Ticket Price Calculator</Link>,
        ]
    }

    componentDidMount() {
        var previousViewableLinks = this.state.viewableLinks;
        auth.authenticate((user) => {
            var displayName = user.email.split('@')[0]
            console.log(displayName)

            switch(displayName){

                case "manager":
                    previousViewableLinks = this.managerLinks
                    break;

                case "admin":
                    previousViewableLinks = this.adminLinks
                    break;

                case "pr":
                    previousViewableLinks = this.prLinks
                    break;
                
                case "tekniker":
                    previousViewableLinks = this.technicianLinks
                    break;

                case "booking":
                    previousViewableLinks = this.bookingLinks
                    break;


                default:
                    previousViewableLinks = []
                    break;
            }

            console.log("viewable links", previousViewableLinks)


            this.setState({
                user: user,
                viewableLinks: previousViewableLinks
            })
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
                <h2>Arrangørsoftware for IT1901 [Logged in as: <Link to='/login'>{loggedInAs}</Link>]</h2>
                <nav>
                    <div className="wideDiv">
                        {this.state.viewableLinks}
                    </div>
                </nav>
            </div>
        )
    }
}
