import React, {Component } from 'react'


import database from '../../database' //firebase

import './slots.css';

export default class Slots extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            festival:props.festival,
            start:props.start,
            end:props.end,
            key:props.id,
            dayKey:props.dayKey,
            deleted: false,
           

        }
        this.removeSlot = this.removeSlot.bind(this)
    }

    removeSlot(key){
        if(window.confirm("Are you sure you want to remove this timeslot?\n\nRemoving a timeslot from a festival will affect all concerts on that timeslot")){
        database.ref(this.state.festival).child('program').child(this.state.dayKey).child("slots").child(key).remove()
        
        this.setState({
            deleted:true,
          })
        }
    }




    render() {

        if(this.state.deleted){ //nice way to hide deleted elements
           return(null)
        }

        return (
            
            
                <tr>
                    <td>
                        {this.state.start}-{this.state.end}
                    </td>

                    <td>
                        <button className="removeX" onClick={() => this.removeSlot(
                                    this.state.key
                        )}>X</button>
                    </td>
                </tr>
                
    
            
        )
    }
}