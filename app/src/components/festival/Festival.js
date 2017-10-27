import React, {Component } from 'react'
import './festival.css';

import database from '../../database' //firebase

export default class Festival extends Component {

    constructor(props) {
        super(props);
        this.state = {
            festival: props.festival,
            name: props.name,   
        }
        this.enterFestival = this.enterFestival.bind(this);
    }

    enterFestival(festival,name){
        this.props.enter(festival,name);
    }


    render() {
        return (
            <button class="festivalSelector" onClick={() => 
                this.enterFestival(this.state.festival,this.state.name)}>{this.state.name}</button>
        )
    }


}