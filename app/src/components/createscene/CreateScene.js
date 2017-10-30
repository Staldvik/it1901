import React, {Component } from 'react'


import database from '../../database' //firebase

export default class CreateScene extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            festival:props.festival,
            name: "",
            capacity: "",
            cost: "",
        }
        this.handleChange = this.handleChange.bind(this);
        this.create = this.create.bind(this);
        
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
          }
        );
      }

    create(name, capacity, cost) {
        var data = {
          name: name,
          capacity: capacity,
          cost: cost,
        }
        database.ref(this.state.festival).child("scenes").push(data);

        this.setState({
            name: "",
            capacity: "",
            cost: "",
        })
      }

    render() {
        return (
            <tr>
                <td> <input name="name" placeholder="Death Valley" type="text" value={this.state.name} onChange={this.handleChange}/></td>
                <td> <input name="capacity" placeholder="10,000" type="number" value={this.state.capacity} onChange={this.handleChange}/></td> 
                <td> <input name="cost" placeholder="5000 $" type="number" value={this.state.cost} onChange={this.handleChange}/></td> 
                <td> <button onClick={() => this.create(
                        this.state.name,
                        this.state.capacity,
                        this.state.cost,
                    )}> Create </button>
                </td>
            </tr>

        )
    }
}