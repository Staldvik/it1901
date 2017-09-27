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
                <h1> {this.state.name} </h1>
                <p> Concerts: {this.getConcerts()} </p>
            </div>
        )
    }

    getConcerts() {
      var text = ""
        for (var i = 0; i < 3; i++) {
          text += this.state.concerts[i] + ("\n");
        }
        return text;
    }

}
