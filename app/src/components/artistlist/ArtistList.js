import React, {Component } from 'react'
import './artistlist.css';

import database from '../../database' //firebase

import spotifyIcon from '../../static/img/spotify.png'

export default class ArtistList extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            id: props.id,
            name: props.name, 
            followers: props.followers, 
            popularity: props.popularity, 
            genres: props.genres,
            uri: props.uri,
            reviews: props.reviews,
        }
        this.editArtist = this.editArtist.bind(this);
    }


    editArtist(key,name,followers,popularity,genres,uri){
        console.log(key)
        const data = {
            //name: "nils",
        }
        database.ref("festival17").child("artists").child(key).update(data)    
    }


    render() {

        return (
            <tr className = "artistList">
                <td> {this.state.name} </td>
                <td> {this.state.followers} </td>
                <td> {this.state.popularity} </td>
                <td> {this.state.genres} </td>
                <td> {this.state.reviews} </td>
                <td> <a href={this.state.uri}><img  width="30" height="30" src={spotifyIcon}></img></a>
                </td>
                <td> <button onClick={() => this.editArtist(
                        this.state.id,
                        this.state.name, 
                        this.state.followers, 
                        this.state.popularity,
                        this.state.genres,
                        this.state.uri,
                    )}> Edit </button>
                </td>
            </tr>

        )
    }
}