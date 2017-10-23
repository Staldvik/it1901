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
        database.ref().push( //creating the strucuture of the database.
            {name:name,
            artists:{"placeholder":"placeholder"}, //I dont think it's possible to create empty children
            concerts:{"placeholder":"placeholder"},
            scenes:{"placeholder":"placeholder"},
            requests:{"placeholder":"placeholder"},
            technicians:{"placeholder":"placeholder"},
            users:{"placeholder":"placeholder"},
            
    })
    }

  


    render() {
    return(
        <div>
            <input type="text" name="name" placeholder="name" value={this.state.name} onChange={this.handleChange}/>
            <button type="submit" onClick={() => this.createFestival(this.state.name)}> Create </button>
        </div>
    )
    }

}
