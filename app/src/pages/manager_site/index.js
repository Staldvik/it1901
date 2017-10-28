import React, { Component } from 'react';

import './style.css';
//firebase
import database from '../../database';


export default class ManagerSite extends Component {

  constructor(props) {
    super(props);

    let artistMap = new Map();

    this.state = {
      concerts: [],
      concertOptions : [],
      artist_name: '',
      tech_spec: '',
      rider: '',
      requests: [],
      artistMap: artistMap

    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.database = database;
 }

 componentWillMount() {
   var previousConcerts = this.state.concerts;
   var previousConcertOptions = this.state.concertOptions;
   var previousArtistName = this.state.artist_name;
   database.ref(this.props.state.festival).child('concerts').on('child_added', concertSnapshot => {
     var vals = concertSnapshot.val();
     previousConcerts.push({
       name : vals.name,
       key : concertSnapshot.key

       //tech_spec : vals.tech_spec,
       //rider : vals.rider
     })

     if (previousArtistName === "") {
       previousArtistName = concertSnapshot.key;
     }
     previousConcertOptions.push(
       <option label={concertSnapshot.val().name} value={concertSnapshot.key} key={concertSnapshot.key}> {concertSnapshot.val().name} </option>
     )

    this.setState({
      concerts: previousConcerts,
      concertOptions: previousConcertOptions,
      artist_name: previousArtistName,
      tech_spec: '',
      rider: ''
    })
  })
  
  //connect directly to artist objects in firebase
  let previousArtistMap = this.state.artistMap;
  database.ref(this.props.state.festival).child('artists').on('child_added', snap => {

    previousArtistMap.set(snap.key, snap.val().name);

    this.setState({
      artistMap: previousArtistMap,
    })
  })

  //For tilbud fra bookingsjef
  var previousRequests = this.state.requests;
  database.ref(this.props.state.festival).child('requests').on('child_added', requestSnapshot => {
    var vals = requestSnapshot.val();
    previousRequests.push({
      artist: vals.artist,
      price:vals.price,
      day:vals.day,
      status:vals.status,
      key:requestSnapshot.key,
    })

    this.setState({
      requestedStatus: previousRequests,
    })
  })
 }

handleChange(e) {
  this.setState({
      [e.target.name]: e.target.value
    }
  );
}

handleSubmit(event) {
  event.preventDefault();
  const concertsRef = database.ref(this.props.state.festival).child('concerts');
  // Lager "datapakken" som sendes
  const data = {
    tech_spec : this.state.tech_spec,
    rider : this.state.rider
  }
  // Sender data til riktig konsert
  concertsRef.child(this.state.artist_name).update(data);
  var previousArtistName = this.state.artist_name;

  this.setState({
    // Nullstiller formet etter data er sendt
    artist_name : previousArtistName,
    tech_spec : '',
    rider : ''
    })
  }

  //Sletter requesten fra databasen.
  //Burde kanskje etter hvert bli sendt en melding tilbake til bookingsjef om at de ikke vil spille der
  handleDeclineConcert(artist,key) {
    database.ref(this.props.state.festival).child("requests").child(key).remove();
    database.ref(this.props.state.festival).child('artists').child(artist).update({status:"declined"})
    window.location.reload();
  }

  handleJoinConcert(artist, day, price, key) {
    var data = {
      artist: artist,
      day: day,
      price: price,
      status: "booked"
    }
    database.ref(this.props.state.festival).child("concerts").push(data);
    alert(artist + " spiller nå på " + day);
    database.ref(this.props.state.festival).child("requests").child(key).remove(); //remove from requests
    database.ref(this.props.state.festival).child('artists').child(artist).update({status:"booked"}) //setter artist status til booked 

    window.location.reload();
  }


render() {
  return (
    <div className="App">
    

    <h3>Add requirements for my artist</h3>
    <div className="form-style">
    <form>
    <select name="artist_name" type="text" value={this.state.artist_name} onChange={this.handleChange} >
      {this.state.concertOptions}
    </select>
      <label>
        Technical Specifications:
        <input name="tech_spec" type="text" value={this.state.tech_spec} onChange={this.handleChange} />
      </label>
      <label>
        Rider:
        <input name="rider" type="text" value={this.state.rider} onChange={this.handleChange} />
      </label>
      <button onClick={this.handleSubmit}> Submit </button>
    </form>
    </div>

    <div className = "managerRequestsBody">
      <h3>Concert offers</h3>
      <p>(hver mananger skal kun se requests for de artistene han er manager for)</p>

      <table>
              <thead>
                <tr>
                    <th>Artist</th>
                    <th>Day</th>
                    <th>Price</th>
                    <th>Approve</th>
                </tr>
              </thead>
              <tbody className="managerRequests">
                {this.state.requests.map((requests) => {
                  if (requests.status == "accepted") {
                      return(
                      <tr>
                        <td>{this.state.artistMap.get(requests.artist)}</td>
                        <td>{requests.day}</td>
                        <td>{requests.price}</td>
                        <td>
                          <button onClick={() => this.handleJoinConcert(requests.artist, requests.day, requests.price, requests.key)}> Accept </button>
                          <button onClick={() => this.handleDeclineConcert(requests.artist, requests.key)}> Decline </button>
                        </td>
                      </tr>
                      )
                    }
                  })

                }
              </tbody>
        </table>
    </div>

    </div>
  );
}
}
