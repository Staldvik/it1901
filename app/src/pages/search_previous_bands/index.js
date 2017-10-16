import React, { Component } from 'react';
import NavComponent from '../../components/navbar/navbar'
import './style.css';
import database from '../../database';
import Concert from '../../components/concert/Concert';
import Technician from '../../components/technician/Technician'

export default class SearchPreviousBand extends Component {
    constructor() {
        super();
    }

    render() {
        return(
            <div className = "app">
                <NavComponent/>
                <p>hei</p>
            </div>
        )
    }
}