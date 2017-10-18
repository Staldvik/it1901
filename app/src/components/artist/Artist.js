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
            /* earlierConcerts: props.earlierConcerts, //List
            concertNeeds: props.concertNeeds, // String //kanskje cost hentes herifra. Også ting som antall mikrofoner og instrumenter
            cost: props.cost, // Int
            approved: false, // Boolean
            booked: false, // Boolean */
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.info != nextProps.info) {
            this.setState({info: nextProps.info})
        }
    }


    render() {

        var genres = ""
        if (this.state.genres !== undefined) {
            genres = this.state.genres.slice(0,2).join("/")
        } else {
            genres = "None provided"
        }

        return (
            <div className = "artistDiv">
                <h1> {this.state.name} </h1>
                <p> {this.state.info} </p>
                <p> Popularity on Spotify: {this.state.popularity}/100 points </p>
                <p> Followers: {this.state.followers} </p>
                <p> Genres: {genres} </p>
            </div>
        )
    }
}