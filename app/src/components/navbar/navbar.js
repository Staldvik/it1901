import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';
import logo from '../../static/img/festival.png'

import {Redirect} from 'react-router-dom';

// Firebase
import database, {firebaseApp} from '../../database';

export default class NavComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: props.user,
            username: props.username,
            viewableLinks: [],
            loginOptions: [],
        }

        // TODO: fikse linker til å stemme med navn/funksjon
        this.adminLinks = [
            <Link key="setup" className="nav-link" to='/setup'>Setup</Link>,
            <Link key="technicians" className="nav-link" to='/technicians'>Technicians</Link>,
            <Link key="concerts" className="nav-link" to='/concerts'>Concerts</Link>,
            <Link key="search" className="nav-link" to='/search'>Artist Search</Link>,
            <Link key="artists" className="nav-link" to='/artists'>My Artists</Link>,
            <Link key="bandbooking" className="nav-link" to='/bandbooking'>Confirm Booking</Link>,
            <Link key="banddatabase" className="nav-link" to='/banddatabase'>Previous Concerts</Link>,
            <Link key="pricecalculator" className="nav-link" to='/pricecalculator'>Price Calculator</Link>,

            // TODO: Kanskje ha "Min side" eller noe
            <Link key="admin" className="nav-link" to='/admin'>Admin</Link>,
            <Link key="manager" className="nav-link" to='/manager'>Manager</Link>,
            <Link key="pr" className="nav-link" to='/pr'>PR</Link>,
            
        ]
        
        this.organizerLinks = [
            <Link key="setup" className="nav-link" to='/setup'>Setup</Link>,
            <Link key="technicians" className="nav-link" to='/technicians'>Technicians</Link>,
            <Link key="concerts" className="nav-link" to='/concerts'>Concerts</Link>,
            
        ]

        this.managerLinks = [
            <Link key="manager" className="nav-link" to='/manager'>My Concert Offers</Link>,
        ]
        this.prLinks = [
            <Link key="pr" className="nav-link" to='/pr'>Public Relations</Link>,
        ]
        this.technicianLinks = [
            <Link key="concerts" className="nav-link" to='/concerts'>Concerts</Link>,
        ]
        this.bookingResponsibleLinks = [
            <Link key="search" className="nav-link" to='/search'>Artist Search</Link>,
            <Link key="artists" className="nav-link" to='/artists'>My Artists</Link>,
            <Link key="bandbookingresponsible" className="nav-link" to='/bandbookingresponsible'>Book Artist</Link>,
            <Link key="pricecalculator" className="nav-link" to='/pricecalculator'>Ticket Price Calculator</Link>,
        ]
        this.bookingBossLinks = [
            <Link key="search" className="nav-link" to='/search'>Artist Search</Link>,
            <Link key="artists" className="nav-link" to='/artists'>My Artists</Link>,
            <Link key="bandbooking" className="nav-link" to='/bandbooking'>Confirm Booking</Link>,
            <Link key="pricecalculator" className="nav-link" to='/pricecalculator'>Ticket Price Calculator</Link>,
        ]

        
        this.exit = this.exit.bind(this) //exit and go to festival selection page        
    }

    componentDidMount() {
        var previousLoginOptions = this.state.loginOptions
        database.ref('users').orderByChild('displayName').once('value', usersSnapshot => {
            usersSnapshot.forEach(userSnapshot => {
              previousLoginOptions.push(
                <option id="dropdownItem" onClick={this.changeUser} value={userSnapshot.val().email} key={userSnapshot.key}> {userSnapshot.val().displayName} </option> 
              )
            })
          }).then(() => {
            this.setState({
              loginOptions: previousLoginOptions,
              viewableLinks: this.getCorrectNav(),
            })
          })
    }

    componentWillReceiveProps(nextProps) {

        this.setState({
            user: nextProps.user,
            username: nextProps.username,
            viewableLinks: this.getCorrectNav(nextProps.user)
        })

    }

    // Om den ikke mottar user, bruk this.state.user
    getCorrectNav(user = this.state.user) {
        if (user !== null) {
            var previousViewableLinks = this.state.viewableLinks;
            var displayName = user.email.split('@')[0]
            
            switch(displayName){
    
                case "manager":
                    previousViewableLinks = this.managerLinks
                    break;
    
                case "admin":
                    previousViewableLinks = this.adminLinks
                    break;

                case "organizer":
                    previousViewableLinks = this.organizerLinks
                    break;
    
                case "pr":
                    previousViewableLinks = this.prLinks
                    break;
                
                case "tekniker":
                    previousViewableLinks = this.technicianLinks
                    break;
    
                case "booking.manager":
                    previousViewableLinks = this.bookingBossLinks
                    break;

                case "booking.responsible":
                    previousViewableLinks = this.bookingResponsibleLinks
                    break;
    
                default:
                    previousViewableLinks = []
                    break;
            }
            return previousViewableLinks
        } else {
            return []
        }
    }

    exit(){
        this.props.exit();
    }

    changeUser = event => {
        event.preventDefault();
    
        // Logg inn med epost fra dropdown og passord festival (som er passordet til alle brukere jeg har lagt inn)
        firebaseApp.auth().signInWithEmailAndPassword(event.target.value, "festival")
        .then((user) => {
          console.log("Signed In as", user)
          this.setState({
            errorCode:null, 
            errorMessage:null,
          })
    
        })
        .catch(error => {
          this.handleError(error);
        })
    
      }

    render() {


        var loggedInAs = "Not logged in"
        var festivalName = this.props.festivalName

        return(
            <nav className="navbar navbar-expand-lg fixed-top navbar-dark bg-dark">
                 <a id="exitFestivalButton" href="#" onClick={this.exit}>X</a>
                 <Link className="navbar-brand" key="home" to='/home'>{festivalName}</Link>
               
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#festivalNavbar" aria-controls="festivalNavbar" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="festivalNavbar">
                    <ul className="navbar-nav mr-auto">
                        {
                            this.state.viewableLinks.map(link => {
                                return (
                                    <li className="nav-item active">
                                        {link}
                                    </li>
                                )
                            })
                        }
                        
                    </ul>
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                {this.state.username}
                            </a>
                            <div id="navDropdown" className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                {this.state.loginOptions}
                            </div>
                        </li>
                    </ul>
                </div>

            </nav>
            
        )
    }
}
