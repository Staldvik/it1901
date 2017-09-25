import React, {Component } from 'react'
import Artist from "../Artist/Artist"

export default class Concert extends Component {
    constructor(props) {
        super(props);
        this.state = {
            price: props.price,
            sales: props.sales,
            capacity: props.capacity //skal komme fra Scene component
            //Må også ha en Artist component og en liste med Tekniker components
             
        }
    }

    render() {
        return (
            <div className = "concertDiv">
                <h1> Konsert med: Artist</h1>
                <p> ticket price: {this.state.price} </p>
                <p> tickets sold: {this.state.sales} </p>
                <p> Sold out : {this.isSoldOut()} </p>
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