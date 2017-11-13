import React, {Component } from 'react'
import './createfestival.css';

import database from '../../database' //firebase


export default class CreateFestival extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            name: props.name,
        }

        this.createFestival = this.createFestival.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(e) {
        this.setState({
          [e.target.name]: e.target.value
        })
      }



    createFestival(name){
       this.props.create(name);
    }

  


    render() {
    return(
        <div>
            <input type="text" name="name" placeholder="name" value={this.state.name} onChange={this.handleChange}/>
            <button type="button" onClick={() => this.createFestival(this.state.name)}> Create </button>
        </div>
    )
    }

}
