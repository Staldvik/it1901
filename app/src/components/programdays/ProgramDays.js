import React, {Component } from 'react'

import './programdays.css';
import database from '../../database' //firebase

export default class ProgramDays extends Component {

    constructor(props) {
        super(props);
        
        this.state = { 
            festival:props.festival,
            date:props.date,
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
            <th id="programDay">{this.state.date}</th>
        )
    }
}