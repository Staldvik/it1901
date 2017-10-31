import React, {Component } from 'react'


import database from '../../database' //firebase

export default class Slots extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            festival:props.festival,
            date:props.date,
            key:props.key,

        }
        this.handleChange = this.handleChange.bind(this);
        
    }


    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
          }
        );
      }


    render() {
        return (
            
                <tr>
                    <td>{this.state.date}</td>
                </tr>
                
    
            
        )
    }
}