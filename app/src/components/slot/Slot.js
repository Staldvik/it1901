import React, {Component } from 'react'
import Concert from "../concert/concert"
import './dag.css';

export default class Slot extends Component {

    constructor(props) {
        super(props);
        this.state = { //Kommentarer er tenkt datatype fra objektdiagrammet
            id: props.id, //Int
            start_time: props.start_time,
            duration: props.duration,
            end_time: props.end_time,
            concert: props.concert
        }
    }

    render() {
        return (
            <div className = "slotDiv">
                <h1> Slot nr : {this.state.id} </h1>
                <p> Starttid : {this.state.start_time} </p>
                <p> Varighet : {this.state.duration} </p>
                <p> Sluttid : {this.state.end_time} </p>
                <p> Konsert : {this.state.concert} </p>

            </div>
        )
    }

    getSlot(){
      return this
    }

    setSlot(start_time, duration, end_time, Concert concert){
      this.state.start_time = start_time
      this.state.duration = duration
      this.state.end_time = end_time
      this.state.concert = concert
    }

    }
}
