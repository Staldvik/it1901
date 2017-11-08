import React, {Component } from 'react'
import './artist.css';

export default class ArtistPR extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: props.name,
            contact_info: props.contact_info,
            sales_number: props.sales_number,
        }
    }

    render() {
        return (
            <div className = "artistDiv">
                <h2> {this.state.name} </h2>
                <p> contact_info: {this.state.contact_info} </p>
                <p> sales_number: {this.state.sales_number} </p>
            </div>

        )
    }

}
