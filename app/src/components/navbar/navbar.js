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

        this.adminLinks = [
            <Link id="navLink" to='/concerts'>Concerts</Link>,
            <Link id="navLink" to='/search'>Artist Search</Link>,
            <Link id="navLink" to='/artists'>My Artists</Link>,
            <Link id="navLink" to='/bandbooking'>Band Booking</Link>,
            <Link id="navLink" to='/previousbands'>TeknikerTest</Link>,
            <Link id="navLink" to='/banddatabase'>Band Database</Link>,
            <Link id="navLink" to='/pricecalculator'>Ticket Price Calculator</Link>,
            <Link id="navLink" to='/calendar'>Booking Calendar</Link>,
            <Link id="navLink" to='/admin'>Admin Page</Link>,
            <Link id="navLink" to='/manager'>Manager Site</Link>,
            <Link id="navLink" to='/pr'>Public Relations</Link>,
        ]
        this.managerLinks = [
            <Link id="navLink" to='/manager'>My Concert Offers</Link>,
        ]
        this.prLinks = [
            <Link id="navLink" to='/pr'>Public Relations</Link>,
        ]
        this.technicianLinks = [
            <Link id="navLink" to='/concerts'>Concerts</Link>,
        ]
        this.bookingLinks = [
            <Link id="navLink" to='/search'>Artist Search</Link>,
            <Link id="navLink" to='/artists'>My Artists</Link>,
            <Link id="navLink" to='/bandbooking'>Band Booking</Link>,
            <Link id="navLink" to='/previousbands'>TeknikerTest</Link>,
            <Link id="navLink" to='/banddatabase'>Band Database</Link>,
            <Link id="navLink" to='/pricecalculator'>Ticket Price Calculator</Link>,
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
            <div className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <div id="navbarInfo">
                    <div id="left">
                        <button class="" onClick={() => this.exit()}><Link to='/'>Exit</Link></button></div>
                    <div id="right">[{loggedInAs}] <Link to='/login'> Logout</Link></div>
                    <div id="center"><h2>{festivalName}</h2></div>
                </div>
                <nav>
                    <div className="wideDiv">
                        {this.state.viewableLinks}
                    </div>
                </nav>
            </div>
        )
    }
}
