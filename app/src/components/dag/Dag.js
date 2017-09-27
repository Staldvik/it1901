import React, {Component } from 'react'
import Slot from "../slot/Slot"
import Scene from "../scene/Scene"
import './dag.css';

export default class Artist extends Component {

    constructor(props) {
        super(props);
        this.state = { //Kommentarer er tenkt datatype fra objektdiagrammet
            id: props.id, //Int
            slot1: props.slot1, //Slot
            slot2: props.slot2, //Slot
            slot3: props.slot3, //Slot
            slot4: props.slot4, //Slot
            slot5: props.slot5, //Slot
            scene: props.scene  //scene
        }
    }

    render() {
        return (
            <div className = "dagDiv">
                <h1> {this.state.id} ({this.state.scene}) </h1>
                <p> {this.state.slot1} </p>
                <p> {this.state.slot2} </p>
                <p> {this.state.slot3} </p>
                <p> {this.state.slot4} </p>
                <p> {this.state.slot5} </p>
                <p> {this.state.scene} </p>
            </div>

        )
    }
    }
}
