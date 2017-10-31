import React, {Component } from 'react'


import database from '../../database' //firebase

import Slots from '../slots/Slots'

export default class CreatedDays extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            festival:props.festival,
            day:props.day, //name/date of day
            key:props.id, //key in firebase, must call it id...

            slots: [],
            start:"",
            end:"",

            deleted:false,
        }
        this.handleChange = this.handleChange.bind(this);
        this.addSlot = this.addSlot.bind(this);
        
    }

    componentWillMount() {
        let prevSlots = this.state.slots
        
            database.ref(this.state.festival).child('program').child(this.state.key).child("slots").on('child_added', snap => {
              var vals = snap.val();
        
              prevSlots.push({
                id: snap.key,
                start: vals.start,
                end:vals.end,
              })
        
              this.setState({
                slots: prevSlots,
              })
            })
       
      }

    addSlot(start,end){
        if(start ==="" || end ===""){
            alert("please input start and end time")
        }
        else{
            database.ref(this.state.festival).child('program').child(this.state.key).child("slots").push(
                {start:start,
                end: end,
                }
            )
        }
    }

    removeDay(key){
        database.ref(this.state.festival).child('program').child(key).remove()

        this.setState({ //nice way to hide deleted elements
            deleted: true,
          })
    }

    

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
          }
        );
      }


    render() {

        if(this.state.deleted){ //nice way to hide deleted elements
            return(null)
         }

        return (
                <table id="programTable">
                    <thead>
                        <input name="start" placeholder="19" size={2} type="text" value={this.state.start} onChange={this.handleChange}/>
                        -
                        <input name="end" placeholder="21" size={2} type="text" value={this.state.end} onChange={this.handleChange}/>
                        <button onClick={() => this.addSlot(
                                    this.state.start,
                                    this.state.end,
                                 )}> Add Time </button>

                        <tr>
                            <th>
                                {this.state.day} 
                                     
                            </th> 
                            <th>
                                <button className="removeX" onClick={() => this.removeDay(
                                    this.state.key
                                )}>X</button> 
                            </th> 
                    
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.slots.map((slot) => {
                            return(<Slots
                            festival={this.state.festival}
                            dayKey={this.state.key}
                            id={slot.id}
                            start={slot.start}
                            end={slot.end}
                            />
                        )
                        })
                        }
                    </tbody>
                    
                </table>
                

        )
    }
}