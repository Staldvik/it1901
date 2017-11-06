import React, {Component } from 'react'


import database from '../../database' //firebase

export default class CreateDay extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            festival:props.festival,
            date:"",
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

    create(date) {
        var data = {
          date: date,
        }
        database.ref(this.state.festival).child("program").push(data);

        this.setState({
            date: "",
           
        })
      }

    render() {
        return (
            <tr>
                <td> <input name="date" placeholder="02.11.2017" type="text" value={this.state.date} onChange={this.handleChange}/></td>
                <td> <button onClick={() => this.create(
                        this.state.date,
                    )}> Add Day</button>
                </td>
            </tr>

        )
    }
}