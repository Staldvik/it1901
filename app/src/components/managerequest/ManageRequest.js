import React, {Component } from 'react'


import database from '../../database' //firebase

export default class ManageRequest extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            festival:props.festival,
            requestKey: props.requestKey,
            artist: props.artist,
            scene: props.scene,
            name: props.name,
            date: props.date,
            time:props.time,
            price:props.price,
            technicalrequirements: "",
            rider: "",

            dateDisplay: props.dateDisplay,
            timeDisplay: props.timeDisplay,
            sceneDisplay: props.sceneDisplay,
            
        }
        this.handleChange = this.handleChange.bind(this);
        this.checkAccept = this.checkAccept.bind(this);
        this.accept = this.accept.bind(this);
        this.decline = this.decline.bind(this);
        
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
          }
        );
      }
    
    // checks if input fields are empty and asks for confirmation to submit empty rider and techSpecs.
    checkAccept(artist, name, scene, sceneDisplay, date, time, price, key, technicalrequirements, rider){
        if(this.state.technicalrequirements =="" || this.state.rider ==""){
            if(window.confirm("Are your sure you don't want to provide rider or technical requirements"))
                {this.accept(artist, name, scene, sceneDisplay, date, time, price, key, technicalrequirements, rider)}
        }
        else(this.accept(artist, name, scene, sceneDisplay, date, time, price, key, technicalrequirements, rider))
    }


    accept(artist, name, scene, sceneDisplay, date, time, price, key, technicalrequirements, rider) {
       
        var data = {
          artist: artist,
          name: name,
          scene: scene,
          sceneName: sceneDisplay,
          date: date,
          time: time,
          price: price,
          status: "booked",
          requirements: technicalrequirements,
          rider: rider,
        }
        let concertKey = database.ref(this.state.festival).child("concerts").push(data).key;
        database.ref(this.state.festival).child("requests").child(key).remove(); //remove from requests
        database.ref(this.state.festival).child('artists').child(artist).update({status:"booked"}) //setter artist status til booked 
        database.ref(this.state.festival).child('program').child(date).child('slots').child(time).update({concert: concertKey}) //legger til konserten i slot
        alert(this.state.name + " booked on " + this.state.sceneDisplay + "\n"
        + this.state.dateDisplay + " (" + this.state.timeDisplay + ")" + "\n"
        + "requirements: " + technicalrequirements + "\n"
        + "rider: " + rider);
        }

      decline(artist,key) {
        database.ref(this.state.festival).child("requests").child(key).remove();
        database.ref(this.state.festival).child('artists').child(artist).update({status:"declined"})
        .then(() => {
            this.forceUpdate();
        })
      }
    




    render() {
        return (
            <tr>
                <td> {this.state.name} </td>
                <td> {this.state.price} </td>
                <td> {this.state.sceneDisplay} </td>
                <td> {this.state.dateDisplay} 
                     {" "}
                     ({this.state.timeDisplay}) 
                </td>
            
                
                <td> <input name="technicalrequirements" type="text" placeholder="minimum eight microphones, large scene floor..."
                 size={50} value={this.state.technicalrequirements} onChange={this.handleChange}/></td>
                <td> <input name="rider" type="text" placeholder="64 ice cold beers, 128 Snickers bars"
                value={this.state.rider} onChange={this.handleChange}/></td> 
                <td> <button onClick={() => this.checkAccept(
                        this.state.artist,
                        this.state.name,
                        this.state.scene,
                        this.state.sceneDisplay,
                        this.state.date,
                        this.state.time,
                        this.state.price,
                        this.state.requestKey,
                        this.state.technicalrequirements,
                        this.state.rider,
                        
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