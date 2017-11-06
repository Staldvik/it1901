import React, {Component } from 'react'

import './concertprogram.css';
import database from '../../database' //firebase

export default class ConcertProgram extends Component {

    constructor(props) {
        super(props);
        
        this.state = { 
            festival:props.festival,
            concert: props.concert,
        }
        
    }
   

    

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
          }
        );
      }


    render() {
        return (
            <div id="">{this.state.concert} bilde:</div>
        )
    }
}