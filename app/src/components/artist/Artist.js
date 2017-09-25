import React, {Component } from 'react'
import './artist.css';

export default class Artist extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: props.name,
            age: props.age,
            info: props.info,
            popularity: props.popularity,
            albumSales: props.albumSales,
            earlierConcerts: props.earlierConcerts,
            concertNeeds: props.concertNeeds, //kanskje cost hentes herifra. Også ting som antall mikrofoner og instrumenter
            cost: props.cost,
            approved: false,
            booked: false,    
        }
    }

    render() {
        return (
            <div className = "artistDiv">
                <h1> {this.state.name} ({this.state.age}) </h1>
                <p> {this.state.info} </p>
                <p> popularity: {this.state.popularity} </p>
                <p> albumSales: {this.state.albumSales} </p>
                <p> earlierConcerts: {this.state.earlierConcerts} </p>
                <p> cost: {this.state.cost} </p>
                <p> approved: {this.checkApproved()} booked: {this.checkBooked()} </p>
            </div>

        )
    }

    checkApproved() {
        if (this.state.approved) {
            return "true";
        } else {
            return "false"
        }
    }

    checkBooked() {
        if (this.state.booked) {
            return "true";
        } else {
            return "false"
        }
    }


}