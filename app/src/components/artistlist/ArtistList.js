import React, {Component } from 'react'
import './artistlist.css';

import database from '../../database' //firebase

import spotifyIcon from '../../static/img/spotify.png'

export default class ArtistList extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            festival:props.festival,

            id: props.id,
            name: props.name, 
            followers: props.followers, 
            popularity: props.popularity, 
            genres: props.genres,
            uri: props.uri,
            reviews: props.reviews,
            status: props.status,

            deleted: false,
        }
        
    }


    deleteArtist(key,status){
        if(status == null || status == ""){ //only remove artists that have not concerts or are not in booking process
            database.ref(this.state.festival).child("artists").child(key).remove() 
            
            this.setState({ //nice way to hide deleted elements
                deleted: true,
            })
            }
        
        else(
            alert("Cannot remove ", this.state.name)
        )
    }

    setColorCode(status){
        switch(status){
            case("booked"):
                return "colorCodeBooked"
            case("declined"):
                return "colorCodeDeclined"
            case("pending"):
                return "colorCodePending"
        }

    }


    render() {

        if(this.state.deleted){ //nice way to hide deleted elements
            return(null)
         }

        if(this.state.status == null || this.state.status ==="" || this.state.status ==="declined"){ //nice way to hide deleted elements
            let colorCodedRow = this.setColorCode(this.state.status); //returns a css id
            return (
                <tr id = {colorCodedRow} >
                    <td> {this.state.name} </td>
                    <td> {this.state.followers} </td>
                    <td> {this.state.popularity} </td>
                    <td> {this.state.genres} </td>
                    <td> {this.state.status} </td>
                    <td> <a href={this.state.uri}><img  width="30" height="30" src={spotifyIcon}></img></a>
                    </td>
                    <td> <button className="removeX" onClick={() => this.deleteArtist(
                            this.state.id,
                            this.state.status,
                        )}> X </button>
                    </td>
                </tr>
    
            )
        }
        
        let colorCodedRow = this.setColorCode(this.state.status); //returns a css id
        return (
            <tr id = {colorCodedRow} >
                <td> {this.state.name} </td>
                <td> {this.state.followers} </td>
                <td> {this.state.popularity} </td>
                <td> {this.state.genres} </td>
                <td> {this.state.status} </td>
                <td> <a href={this.state.uri}><img  width="30" height="30" src={spotifyIcon}></img></a>
                </td>

            </tr>

        )
    }
}