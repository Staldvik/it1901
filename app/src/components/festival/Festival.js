import React, {Component } from 'react'
import './festival.css';

import database from '../../database' //firebase

/**
 * Component used to display button to enter specific festival
 */
export default class Festival extends Component {

    constructor(props) {
        super(props);
        this.state = {
            festival: props.festival,
            name: props.name,   
        }
        this.enterFestival = this.enterFestival.bind(this);
    }

    /**
     * Passes chosen festival to enter one layer up
     * @param {firebase.database.Reference.key} festival 
     * @param {String} name 
     */
    enterFestival(festival,name){
        this.props.enter(festival,name);
    }

    /**
     * Renders a button for this festival
     */
    render() {
        return (
            <button id="festivalSelector" onClick={() => 
                this.enterFestival(this.state.festival,this.state.name)}>{this.state.name}</button>
        )
    }


}