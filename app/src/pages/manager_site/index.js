import React, { Component } from 'react';
import NavComponent from '../../components/navbar/navbar';
import './style.css';
//firebase
import database from '../../database';


export default class ManagerSite extends Component {

  constructor(props) {
    super(props);
    this.state = {
      concerts: [],
      concertOptions : [],
      artist_name: '',
      tech_spec: '',
      rider: '',
      requests : [],

    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.database = database;
 }

 componentWillMount() {
   var previousConcerts = this.state.concerts;
   var previousConcertOptions = this.state.concertOptions;
   var previousArtistName = this.state.artist_name;
   database.ref('festival17').child('concerts').on('child_added', concertSnapshot => {
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

  //For tilbud fra bookingsjef
  var previousRequests = this.state.requests;
  database.ref('festival17').child('requests').on('child_added', requestSnapshot => {
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
  const concertsRef = database.ref('festival17').child('concerts');
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
  handleDeclineConcert(key) {
    database.ref("festival17").child("requests").child(key).remove();
    window.location.reload();
  }

  handleJoinConcert(artist, day, key) {
    var data = {
      name: artist,
      day: day,
    }
    database.ref("festival17").child("concerts").push(data);
    alert("Takk!\n" + artist + " spiller nå på " + day);
    database.ref("festival17").child("requests").child(key).remove();
    window.location.reload();
  }


render() {
  return (
    <div className="App">
    <NavComponent />
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

    <div className = "acceptedRequestsBody">
    <h2> Her er en liste med band som har blitt spurt som manager for band må godkjenne </h2>
    <h4> Dersom du godkjenner vil konserten bli registrert med en gang </h4>
    {this.state.requests.map((requests) => {
      if (requests.status == "accepted") {
        return (
          <div className = "acceptedRequests">
          <li> Artist: {requests.artist} Price: {requests.price} Day: {requests.day} </li>
          <button onClick={() => this.handleJoinConcert(requests.artist, requests.day, requests.key)}> Bli med! </button>
          <button onClick={() => this.handleDeclineConcert(requests.key)}> Avslå </button>
          </div>
        )
      }
    })}
    </div>

    </div>
  );
}
}
