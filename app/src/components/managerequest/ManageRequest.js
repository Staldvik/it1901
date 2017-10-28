import React, {Component } from 'react'


import database from '../../database' //firebase

export default class ManageRequest extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            festival:props.festival,
            requestKey: props.requestKey,
            artist: props.artist,
            name: props.name,
            day: props.day,
            price:props.price,
            technicalrequirements: "",
            rider: ""
            
        }
        this.handleChange = this.handleChange.bind(this);
        this.accept = this.accept.bind(this);
        this.decline = this.decline.bind(this);
        
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
          }
        );
      }

    accept(artist, day, price, key, technicalrequirements, rider) {
        var data = {
          artist: artist,
          day: day,
          price: price,
          status: "booked",
          requirements: technicalrequirements,
          rider: rider,
        }
        database.ref(this.state.festival).child("concerts").push(data);
        alert(this.state.name + " will play on " + day + "\n"
                + "requirements: " + technicalrequirements + "\n"
                + "rider: " + rider);
        database.ref(this.state.festival).child("requests").child(key).remove(); //remove from requests
        database.ref(this.state.festival).child('artists').child(artist).update({status:"booked"}) //setter artist status til booked 
      }

      decline(artist,key) {
        database.ref(this.state.festival).child("requests").child(key).remove();
        database.ref(this.state.festival).child('artists').child(artist).update({status:"declined"})
        window.location.reload();
      }
    




    render() {
        return (
            <tr>
                <td> {this.state.name} </td>
                <td> {this.state.day} </td>
                <td> {this.state.price} </td>
                <td> <input name="technicalrequirements" type="text" size={50} value={this.state.technicalrequirements} onChange={this.handleChange}/></td>
                <td> <input name="rider" type="text" value={this.state.rider} onChange={this.handleChange}/></td> 
                <td> <button onClick={() => this.accept(
                        this.state.artist,
                        this.state.day,
                        this.state.price,
                        this.state.requestKey,
                        this.state.technicalrequirements,
                        this.state.rider
                    )}> Accept </button>
                    
                    <button onClick={() => this.decline(
                        this.state.artist,
                        this.state.requestKey
                        )}> Decline </button>
                </td>
            </tr>

        )
    }
}