import React, {Component } from 'react'


import database from '../../database' //firebase

import './technicianslist.css';

export default class TechniciansList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            techName: props.name,

        }
       
    }


    




    render() {


        return (
            
            <div>{this.state.techName}</div>
    
    
            
        )
    }
}