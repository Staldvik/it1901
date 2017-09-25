import React, {Component } from 'react'
import './scene.css';

export default class Concert extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.name,
            capacity: this.props.capacity,
            cost: this.props.cost,
            
             
        }
    }

    render() {
        return (
            <div className = "sceneDiv">
                <h1> Scene: {this.state.name}</h1>
                <p> Capacity: {this.state.capacity}</p> 
                <p> Rigging cost: {this.state.cost} </p>
            </div>

        )
    }

    isSoldOut() {
        if (this.state.sales >= this.state.capacity) {
            return "true";
        }
        return "false"
        
    }


}