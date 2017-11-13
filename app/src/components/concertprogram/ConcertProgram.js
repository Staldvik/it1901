import React, {Component } from 'react'

import './concertprogram.css';
import database from '../../database' //firebase
import template from '../../static/img/defaultArtistPic.jpg'

/**
 * Component that fetches info for concert from database
 */
export default class ConcertProgram extends Component {

    /**
     * Here used to set current festival and concert
     * @param {props} props 
     */
    constructor(props) {
        super(props);
        
        this.state = { 
            festival: props.festival,
            concert: props.concert,
            startTime: props.startTime,
            endTime: props.endTime,
            artist: "",
            name:"",
            scene: "",
            pic:""
        }
        
    }

    /**
     * Here used to pull info for concert from database. 
     */
    componentDidMount() {
        if(this.state.concert != null){ //need to check if there is a concert on that timeslot
            database.ref(this.state.festival).child('concerts').child(this.state.concert).once('value', snap => {
              var vals = snap.val();
              console.log(vals.artist, "hehhhhhhhhhhhhhhhhhhhhhhhhhhh")
             
              this.setState({
                artist: vals.artist,
                name: vals.name,
                scene: vals.sceneName,
                pic: vals.pic

              })
            })
           
        }
        
            
       
      }
    
    /**
     * Updates target state based on event value.
     * This way the state always reflects value in different inputs
     * @param {event} e 
     */
    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
          }
        );
      }

    /**
     * Renders a slot based on if there is a concert or not. 
     */
    render() {
        if(this.state.concert==null){
            return(<div id="availableProgramSlot">
                <div id="">{this.state.startTime}-{this.state.endTime}</div>
                </div>)
        }
        return (
            <div id="bookedProgramSlot">
                <div id="programArtistName">{this.state.name}</div>
                <img src={this.state.pic} id="smallArtistPicture"></img>
                <div id="concertTime">{this.state.scene}</div>
                <div id="concertTime">{this.state.startTime}-{this.state.endTime}</div>
            </div>
        )
    }
}