import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';
import logo from '../../static/img/festival.png'

export default class NavComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: props.user,
            viewableLinks: []
        }

        // TODO gå vekk fra å ikke vise linken, til å ha den disabled
        this.adminLinks = [
            <Link key="setup" className="nav-link" to='/setup'>Setup</Link>,
            <Link key="concerts" className="nav-link" to='/concerts'>Concerts</Link>,
            <Link key="technicians" className="nav-link" to='/technicians'>Technicians</Link>,
            <Link key="search" className="nav-link" to='/search'>Artist Search</Link>,
            <Link key="artists" className="nav-link" to='/artists'>My Artists</Link>,
            <Link key="bandbookingresponsible" className="nav-link" to='/bandbookingresponsible'>Book Artist</Link>,
            <Link key="bandbooking" className="nav-link" to='/bandbooking'>Confirm Booking</Link>,
            <Link key="previousbands" className="nav-link" to='/previousbands'>TeknikerTest</Link>,
            <Link key="banddatabase" className="nav-link" to='/banddatabase'>Band Database</Link>,
            <Link key="pricecalculator" className="nav-link" to='/pricecalculator'>Ticket Price Calculator</Link>,
            <Link key="calendar" className="nav-link" to='/calendar'>Booking Calendar</Link>,
            <Link key="admin" className="nav-link" to='/admin'>Admin Page</Link>,
            <Link key="manager" className="nav-link" to='/manager'>Manager Site</Link>,
            <Link key="pr" className="nav-link" to='/pr'>Public Relations</Link>,
            
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
            <Link key="bandbooking" className="nav-link" to='/bandbookingresponsible'>Book Artist</Link>,
            <Link key="previousbands" className="nav-link" to='/previousbands'>TeknikerTest</Link>,
            <Link key="banddatabase" className="nav-link" to='/banddatabase'>Artist Database</Link>,
            <Link key="pricecalculator" className="nav-link" to='/pricecalculator'>Ticket Price Calculator</Link>,
        ]
        this.bookingBossLinks = [
            <Link key="search" className="nav-link" to='/search'>Artist Search</Link>,
            <Link key="artists" className="nav-link" to='/artists'>My Artists</Link>,
            <Link key="bandbooking" className="nav-link" to='/bandbooking'>Confirm Booking</Link>,
            <Link key="previousbands" className="nav-link" to='/previousbands'>TeknikerTest</Link>,
            <Link key="banddatabase" className="nav-link" to='/banddatabase'>Artist Database</Link>,
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

    render() {


        var loggedInAs = "Not logged in"
        var festivalName = this.props.festivalName


        if (this.state.user) {
            loggedInAs = this.state.user.email.split('@')[0]
        }


        return(
            <nav className="navbar navbar-expand-md fixed-top navbar-dark bg-dark">
                 <a id="exitFestivalButton" href="#" onClick={this.exit}>X</a>
                 <Link className="navbar-brand" key="home" to='/home'>{festivalName}</Link>
               
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
                    <form className="form-inline my-2 my-md-0">
                        <input className="form-control" type="text" placeholder="Search"/>
                    </form>
                </div>
            </nav>
        )
    }
}
