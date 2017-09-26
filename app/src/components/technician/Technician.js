import React, {Component } from 'react'
//import './technician.css';

export default class Technician extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: props.name,
        }
    }

    render() {
        return (
            <div className = "techicianDiv">
                <h1> {this.state.name} </h1>
                //          <p> Concerts: </p>
            </div>
        )
    }

}
