import React, {Component } from 'react'
import './scenelist.css';

import database from '../../database' //firebase

/**
 * Component used to show a scene in a table row
 */
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

    /**
     * Deletes a scene from the database
     * @param {firebase.database.Reference.key} key 
     */
    delete(key){
        if(window.confirm("Are you sure you want to remove the scene?\n\nRemoving a scene from a festival will affect all concerts on that day")){
            database.ref(this.state.festival).child('scenes').child(key).remove()
            this.setState({
            deleted: true,
            })
        }
    }

    /**
     * Renders a table row containing scene information
     */
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