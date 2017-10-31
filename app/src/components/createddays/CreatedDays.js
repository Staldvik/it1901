import React, {Component } from 'react'


import database from '../../database' //firebase

import Slots from '../slots/Slots'

export default class CreatedDays extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            festival:props.festival,
            day:props.day,
            key:props.key,

            slots: [],
        }
        this.handleChange = this.handleChange.bind(this);
        
    }

    componentWillMount() {
        var prevSlots = this.state.slots;
        
        
            database.ref(this.props.state.festival).child('program').child("slots").on('child_added', snap => {
              var vals = snap.val();
        
              prevSlots.push({
                id: snap.key,
                date:vals.date,
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
            <table>
                <tr>
                    <th>{this.state.day}</th>
                </tr>
                
                {this.state.slots.map((slot) => {
                  return(<Slots
                    date={slot.date}
                    key={slot.id}
                  />
                  )
                })
                }

            </table>
            
        )
    }
}