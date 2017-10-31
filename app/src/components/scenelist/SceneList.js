import React, {Component } from 'react'
import './scenelist.css';

import database from '../../database' //firebase


export default class SceneList extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            festival: props.festival,
            name: props.name,
            capacity: props.capacity,
            cost: props.cost,
            key: props.id,
            deleted: false, //nice way to hide deleted elements
        }
    }


    delete(key){
        database.ref(this.state.festival).child('scenes').child(key).remove()
        this.setState({
           deleted: true,
        })
    }


    render() {

        if(this.state.deleted){ //nice way to hide deleted elements
           return(null)
        }
        return (
            <tr>
                <td> {this.state.name} </td>
                <td> {this.state.capacity} </td>
                <td> {this.state.cost} </td>
                <td> <button className="removeX" onClick={() => this.delete(
                        this.state.key
                    )}> X </button>
                </td>
            </tr>

        )
    }
    
}