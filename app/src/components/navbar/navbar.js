import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';
import logo from '../../static/img/festival.png'

// Firebase
import database, {firebaseApp} from '../../database';

// Roles
import {auth, roles} from '../../roles';

export default class NavComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: props.user,
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
        this.setState({viewableLinks: this.getCorrectNav()})
    }

    componentWillReceiveProps(nextProps) {

        this.setState({
            user: nextProps.user,
            viewableLinks: this.getCorrectNav(nextProps.user)
        })

    }

    // Om den ikke mottar user, bruk this.state.user
    getCorrectNav(user = this.state.user) {
        var previousViewableLinks = this.state.viewableLinks;
        var displayName = user.email.split('@')[0]
        
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
        return previousViewableLinks
    }

    render() {


        var loggedInAs = "Not logged in"
        var festivalName = this.props.festivalName


        if (this.state.user) {
            loggedInAs = this.state.user.email.split('@')[0]
        }


        return(
            <div className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <h2>Arrangørsoftware for {festivalName} [Logged in as: <Link to='/login'>{loggedInAs}</Link>]</h2>
                <nav>
                    <div className="wideDiv">
                        {this.state.viewableLinks}
                    </div>
                </nav>
            </div>
        )
    }
}
