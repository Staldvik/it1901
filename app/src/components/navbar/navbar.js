import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';
import logo from '../../static/img/festival.png'

import {Redirect} from 'react-router-dom';

export default class NavComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: props.user,
            viewableLinks: []
        }

        // TODO: gå vekk fra å ikke vise linken, til å ha den disabled
        // TODO: fikse linker til å stemme med navn/funksjon
        this.adminLinks = [
            <Link key="setup" className="nav-link" to='/setup'>Setup</Link>,
            <Link key="concerts" className="nav-link" to='/concerts'>Konserter</Link>,
            <Link key="search" className="nav-link" to='/search'>Artistsøk</Link>,
            <Link key="artists" className="nav-link" to='/artists'>Artister</Link>,
            <Link key="bandbooking" className="nav-link" to='/bandbooking'>Bandbooking</Link>,
            <Link key="banddatabase" className="nav-link" to='/banddatabase'>Tidligere konserter</Link>,
            <Link key="pricecalculator" className="nav-link" to='/pricecalculator'>Priskalkulator</Link>,
            <Link key="calendar" className="nav-link" to='/calendar'>Bookingkalender</Link>,

            // TODO: Kanskje ha "Min side" eller noe
            <Link key="admin" className="nav-link" to='/admin'>Admin</Link>,
            <Link key="manager" className="nav-link" to='/manager'>Manager</Link>,
            <Link key="pr" className="nav-link" to='/pr'>PR</Link>,
            
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
        this.bookingLinks = [
            <Link key="search" className="nav-link" to='/search'>Artist Search</Link>,
            <Link key="artists" className="nav-link" to='/artists'>My Artists</Link>,
            <Link key="bandbooking" className="nav-link" to='/bandbooking'>Band Booking</Link>,
            <Link key="banddatabase" className="nav-link" to='/banddatabase'>Band Database</Link>,
            <Link key="pricecalculator" className="nav-link" to='/pricecalculator'>Ticket Price Calculator</Link>,
        ]

        this.exit = this.exit.bind(this) //exit and go to festival selection page        
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
    
                case "pr":
                    previousViewableLinks = this.prLinks
                    break;
                
                case "tekniker":
                    previousViewableLinks = this.technicianLinks
                    break;
    
                case "booking.manager":
                    previousViewableLinks = this.bookingLinks
                    break;

                case "booking.responsible":
                    previousViewableLinks = this.bookingLinks
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

    render() {


        var loggedInAs = "Not logged in"
        var festivalName = this.props.festivalName


        if (this.state.user) {
            loggedInAs = this.state.user.email.split('@')[0]
        }


        return(
            <nav className="navbar navbar-expand-md fixed-top navbar-dark bg-dark">
                <a className="navbar-brand" href="#" onClick={console.log("Todo")}>{festivalName}</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample04" aria-controls="navbarsExample04" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarsExample04">
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
                                {loggedInAs}
                            </a>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                
                            </div>
                        </li>
                    </ul>
                </div>

            </nav>
            
        )
    }
}
