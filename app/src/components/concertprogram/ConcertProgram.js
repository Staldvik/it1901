import React, {Component } from 'react'

import './concertprogram.css';
import database from '../../database' //firebase

export default class ConcertProgram extends Component {

    constructor(props) {
        super(props);
        
        this.state = { 
            festival: props.festival,
            concert: props.concert,
            startTime: props.startTime,
            endTime: props.endTime,
            artist: "",
            name:"",
            scene: ""
        }
        
    }

    componentDidMount() {
        if(this.state.concert != null){ //need to check if there is a concert on that timeslot
            database.ref(this.state.festival).child('concerts').child(this.state.concert).once('value', snap => {
              var vals = snap.val();
              console.log(vals.artist, "hehhhhhhhhhhhhhhhhhhhhhhhhhhh")
             
              this.setState({
                artist: vals.artist,
                name: vals.name,
                scene: vals.sceneName
              })
            })
           
        }
        
            
       
      }
    

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
          }
        );
      }


    render() {
        if(this.state.concert==null){
            return(<div id="availableProgramSlot">Slot Available
                <div id="">{this.state.startTime}-{this.state.endTime}</div>
                </div>)
        }
        return (
            <div id="bookedProgramSlot">
                <div id="">{this.state.name}</div>
                <div id="">{this.state.scene}</div>
                <div id="">{this.state.startTime}-{this.state.endTime}</div>
            </div>
        )
    }
}