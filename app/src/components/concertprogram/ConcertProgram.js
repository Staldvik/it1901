import React, {Component } from 'react'

import './concertprogram.css';
import database from '../../database' //firebase

export default class ConcertProgram extends Component {

    constructor(props) {
        super(props);
        
        this.state = { 
            festival:props.festival,
            concert: props.concert,
        }
        
    }

    componentDidMount() {
        if(this.state.concert != null){
            database.ref(this.state.festival).child('concerts').child(this.state.concert).once('value', snap => {
              var vals = snap.val();
              console.log(vals.name, "hehhhhhhhhhhhhhhhhhhhhhhhhhhh")
             
            })
        }
            
       
      }
    

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
          }
        );
      }


    render() {
        return (
            <div id="">{this.state.concert} {this.state.festival} bilde:</div>
        )
    }
}