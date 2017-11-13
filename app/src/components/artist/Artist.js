import React, {Component } from 'react'
import './artist.css';

import database from '../../database' //firebase

import spotifyIcon from '../../static/img/spotify.png'

/**
 * Component used to render an entry in the table in /search
 */
export default class Artist extends Component {

    /**
     * Initializes state
     * @param {props} props 
     */
    constructor(props) {
        super(props);
        this.state = { 
            festival:props.festival,
            name: props.name, //String
            info: props.info, //String
            popularity: props.popularity, //Int
            followers: props.followers, //Int
            genres: props.genres,
            uri: props.uri,
            pic: props.pic,
            /* earlierConcerts: props.earlierConcerts, //List
            concertNeeds: props.concertNeeds, // String //kanskje cost hentes herifra. Også ting som antall mikrofoner og instrumenter
            cost: props.cost, // Int
            approved: false, // Boolean
            booked: false, // Boolean */
            addButtonDisabled: false
        }
    }

    /**
     * Decides if component should update state based on props
     * @param {props} nextProps 
     */
    componentWillReceiveProps(nextProps) {
        if (this.props.info != nextProps.info) {
            this.setState({info: nextProps.info})
        }
    }

    /**
     * This method tries to add an Artist to the database.
     * If there's an Artist with the same Spotify URI already in the database, it alerts the user.
     * @param {String} name 
     * @param {Integer} followers 
     * @param {Integer} popularity 
     * @param {Array<String>} genres 
     * @param {String} uri 
     * @param {String} pic 
     */
    addArtist(name,followers,popularity,genres,uri,pic){
        this.setState({addButtonDisabled: true})

        database.ref(this.state.festival).child("artists").orderByChild("uri").equalTo(uri).once("value", artistEqualSnap => {
            if (! artistEqualSnap.exists()) {
                const data = {
                    name: name,
                    followers: followers,
                    popularity: popularity, 
                    genres: genres,
                    uri: uri,
                    pic: pic,
                }
                database.ref(this.state.festival).child("artists").push(data)
                alert(name + " is now added to database");
            } else {
                alert(name + " is already in database")
            }
        })
        .then(() => {
            this.setState({addButtonDisabled: false})
        }) 

           
    }

    /**
     * Returns a table row with the information gotten from props
     */
    render() {

        let genres = ""
        if (this.state.genres !== undefined) {
            genres = this.state.genres.slice(0,2).join(", ")
        } else {
            genres = "None provided"
        }

        return (
            <tr className = "artistTable">
                <td> {this.state.name} </td>
                <td> {this.state.followers} </td>
                <td> {this.state.popularity} </td>
                <td> {genres} </td>
                <td> <a href={this.state.uri}><img  width="30" height="30" src={spotifyIcon}></img></a>
                </td>
                <td> <button disabled={this.state.addButtonDisabled} onClick={() => this.addArtist(
                        this.state.name, 
                        this.state.followers, 
                        this.state.popularity,
                        genres,
                        this.state.uri,
                        this.state.pic,
                    )}> Add </button>
                </td>
            </tr>

        )
    }
}