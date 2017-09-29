import React, {Component } from 'react'
import Scene from "../scene/Scene"
import './concert.css';

export default class Concert extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: props.name,
            price: props.price,
            sales: props.sales, //number of tickets sold
            genre: props.genre,
            capacity: props.capacity, //skal komme fra Scene component
            //Må også ha en Artist component og en liste med Tekniker components
            date: props.date
             
        }
    }

    render() {
        return (
            <div className = "concertDiv">
                <h1> Concert with: {this.state.name}</h1>
                <p> Genre: {this.state.genre}</p> 
                <p> ticket price: {this.state.price} </p>
                <p> tickets sold: {this.state.sales} </p>
                <p> Sold out : {this.isSoldOut()} </p>
                <p> Date: {this.state.date} </p>
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