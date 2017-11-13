import React, {Component } from 'react'

import './programdays.css';
import database from '../../database' //firebase

/**
 * Component used on HomePage to render headers in table
 */
export default class ProgramDays extends Component {

    constructor(props) {
        super(props);
        
        this.state = { 
            festival:props.festival,
            date:props.date,
        }
        
    }

    /**
     * Keeps state updated
     * @param {event} e 
     */
    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
          }
        );
      }

    /**
     * Renders a table heading based on this.state.date
     */
    render() {
        return (
            <th id="programDay">{this.state.date}</th>
        )
    }
}