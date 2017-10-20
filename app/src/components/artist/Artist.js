import React, {Component } from 'react'
import './artist.css';

export default class Artist extends Component {

    constructor(props) {
        super(props);
        this.state = { //Kommentarer er tenkt datatype fra objektdiagrammet
            name: props.name, //String
            info: props.info, //String
            popularity: props.popularity, //Int
            followers: props.followers, //Int
            genres: props.genres,
            earlierConcerts: props.earlierConcerts, //List
            concertNeeds: props.concertNeeds, // String //kanskje cost hentes herifra. Også ting som antall mikrofoner og instrumenter
            cost: props.cost, // Int
            approved: false, // Boolean
            booked: false, // Boolean
        }
    }

    render() {
        return (
            <tr className = "artistTable">
                <td> {this.state.name} </td>
                <td> {this.state.followers} </td>
                <td> {this.state.popularity} </td>
                <td> {this.state.genres} </td>
            </tr>

        )
    }

}