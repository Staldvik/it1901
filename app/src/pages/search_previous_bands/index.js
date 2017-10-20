import React, { Component } from 'react';
import NavComponent from '../../components/navbar/navbar';
import './style.css';
import database from '../../database';


export default class SearchPreviousBand extends Component {
    constructor() {
        console.log("heiigjeje");
        super();
    }

   

        render(){
            return(
                <div className = "App">
                    <NavComponent/>

                    <h1>hei</h1>

                </div>
            )
        }
}
