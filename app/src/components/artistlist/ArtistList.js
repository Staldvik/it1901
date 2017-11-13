import React, {Component } from 'react'
import './artistlist.css';

import database from '../../database' //firebase

import spotifyIcon from '../../static/img/spotify.png'

/**
 * Component determines style of and returns an entry in the list of artists on the artists page. 
 */
export default class ArtistList extends Component {

    /**
     * 
     * @param {props} props 
     */
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

    /**
     * Deletes an Artist if it doesn't have any concerts or are not in the process of getting booked.
     * @param {firebase.database.Reference.key} key 
     * @param {String} status 
     */
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

    /**
     * Returns an ID that makes CSS style it accordingly to status
     * @param {String} status 
     */
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

    /**
     * Renders a row in a table based on status
     */
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