import React, {Component } from 'react'
import './technician.css';

export default class Technician extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: props.name,
            id: props.id,
            concerts: props.concerts,
        }
    }

    render() {
        return (
            <div className = "technicianDiv">
                <h1> {this.state.name} </h1>
                <p> Mine konserter: {this.state.concerts} </p>
                <p> Min ID: {this.state.id} </p>
            </div>
        )
    }

    /* getConcerts() {
      var text = ""
        for (var i = 0; i < 1; i++) {
          text += this.state.concerts[i] + ("\n"); // Trenger noe getmetode for å få printed ut concerts?
        }
        return text;
    } */

}
