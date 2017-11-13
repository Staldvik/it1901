import React, {Component } from 'react'
import './createfestival.css';

import database from '../../database' //firebase

/**
 * Component used to create festival
 */
export default class CreateFestival extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            name: props.name,
        }

        this.createFestival = this.createFestival.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    /**
     * Keeps state updated
     * @param {event} e 
     */
    handleChange(e) {
        this.setState({
          [e.target.name]: e.target.value
        })
      }


    /**
     * Passes desired festival name one layer up
     * @param {String} name 
     */
    createFestival(name){
       this.props.create(name);
    }


    /**
     * Renders a input form to make a new festival
     */
    render() {
    return(
        <div id="createNewFestival">
            <input type="text" name="name" placeholder="UKA 2018" value={this.state.name} onChange={this.handleChange}/>
            <button type="button" onClick={() => this.createFestival(this.state.name)}> Create </button>
        </div>
    )
    }

}
