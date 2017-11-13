import React, {Component } from 'react'


import database from '../../database' //firebase

/**
 * Component used to create a day
 */
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

    /**
     * Keeps state updated according to the different input fields that may change
     * @param {event} e 
     */
    handleChange(e) {
        e.preventDefault();

        this.setState({
            [e.target.name]: e.target.value
          }
        );
      }

    /**
     * Pushes a new date to the database
     * @param {String} date 
     */
    create(date) {
        // Ikke push en tom date
        if (! date) {
            alert("Date is empty!")
            return
        }

        var data = {
          date: date,
        }
        database.ref(this.state.festival).child("program").push(data);

        this.setState({
            date: "",
        })
      }

    /**
     * Renders a table row that may be used to create days
     */
    render() {
        var dateToday = new Date().toLocaleDateString();

        // Burde ikke input være type="date"?
        return (
            <tr>
                <td> <input name="date" placeholder={dateToday} type="text" value={this.state.date} onChange={this.handleChange}/></td>
                <td> <button onClick={() => this.create(
                        this.state.date,
                    )}> Add Day</button>
                </td>
            </tr>

        )
    }
}