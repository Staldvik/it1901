import React, {Component } from 'react'
import './technician.css';

export default class Technician extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: props.name,
            concerts: props.concerts,
        }
    }

    render() {
        return (
            <div className = "technicianDiv">
                <h1> Mine Konserter: </h1>
                <p> ({this.state.name}) </p>
                <p> {this.getConcerts()} </p>
            </div>
        )
    }

    getConcerts() {
      var text = ""
        for (var i = 0; i < 1; i++) {
          text += this.state.concerts[i] + ("\n"); // Trenger noe getmetode for å få printed ut concerts?
        }
        return text;
    }

}
