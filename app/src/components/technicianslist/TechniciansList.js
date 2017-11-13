import React, {Component } from 'react'


import database from '../../database' //firebase

import './technicianslist.css';

/**
 * Component used to show a technician name in a div?
 */
export default class TechniciansList extends Component {

    /**
     * Sets state
     * @param {props} props 
     */
    constructor(props) {
        super(props);
        this.state = {
            techName: props.name,

        }
       
    }


    



    /**
     * Renders a div containing the name of technician
     */
    render() {


        return (
            
            <div>{this.state.techName}</div>
    
    
            
        )
    }
}