import React, {Component } from 'react'

import './programslots.css';
import database from '../../database' //firebase
import ConcertProgram from '../concertprogram/ConcertProgram'

export default class ProgramSlots extends Component {

    constructor(props) {
        super(props);
        
        this.state = { 
            festival:props.festival,
            date:props.date,
            slots:[],
        }
        
    }

    componentWillMount() {
        let prevSlots = this.state.slots
        
            database.ref(this.state.festival).child('program').child(this.state.date).child('slots').on('child_added', snap => {
              var vals = snap.val();
              
              prevSlots.push({
                id: snap.key,
                start: vals.start,
                end:vals.end,
                concert:vals.concert,
              })
        
              this.setState({
                slots: prevSlots,
              })
            })
            
       
      }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
          }
        );
      }


    render() {
        return (
            <div>
            
            {this.state.slots.map((slot) => {
                return(
                <div id="concertSlot">
                    <ConcertProgram festival={this.state.festival} concert={slot.concert} startTime={slot.start} endTime={slot.end} />
                </div>)
            })
            }
            
            
            </div>
        )
    }
}