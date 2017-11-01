import React, { Component } from 'react';

import './style.css';
import database from '../../database'

export default class BandBooking extends Component {
  // static propTypes = {}
  // static defaultProps = {}
  // state = {}

  constructor(props) {
    super(props);
    let artistMap = new Map();
    this.state = {

      artists: [],
      artistOptions: [],
      selectedArtist:"",
      artistMap: artistMap, //for keeping name of artist and be able to get it by key

      currentArtistNameInput: "",
      currentPriceInput: "",
      currentConcertDayInput: "day1",
      
      sceneOptions: [],
      selectedScene:"",

      requests: [],
      currentArtistAccepted: "ARTISTACCEPTED",
      currentPriceAccepted: "",
      currentConcertDayAccepted: "day1",
      email: "Hei <name>!\nVi vil gjerne invitere <artist> til å spille på festival17 på <dag>.\nPris: <pris>.\n\nMvh\n   bookingansvarlig"
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmitRequest = this.handleSubmitRequest.bind(this);
    this.handleAccept = this.handleAccept.bind(this);
    this.handleDecline = this.handleDecline.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  //kjøres når siden/komponenten lastes
  componentWillMount() {
    var previousRequests = this.state.requests;
    console.log(previousRequests);

    //get requests from database
    database.ref(this.props.state.festival).child('requests').on('child_added', requestSnapshot => {
      var vals = requestSnapshot.val();
      previousRequests.push({
        artist:vals.artist,
        price:vals.price,
        day:vals.day,
        status:vals.status, //Kan ha tre tilstander: pending, accepted eller declined.
        key: requestSnapshot.key
      })
      this.setState({
        requests: previousRequests,
      })
    })

    let previousArtistMap = this.state.artistMap;
    

    let previousArtists = this.state.artists;

    let previousArtistsOptions = this.state.artistOptions;

    //get artists from database
    database.ref(this.props.state.festival).child('artists').on('child_added', snap => {
      var vals = snap.val();

      previousArtists.push({
        id: snap.key,
        name:vals.name,
        followers:vals.followers,
        popularity:vals.popularity,
        genres:vals.genres,
        reviews: vals.reviews, 
        uri: vals.uri,
        
      })

      //push artists into an array of options elements
      previousArtistsOptions.push(
        <option value={snap.key} key={snap.key}> {vals.name} </option>
      )
      
      //push name and key into a map
      previousArtistMap.set(snap.key, vals.name);
      console.log(previousArtistMap);

      this.setState({
        artists: previousArtists,
        artistOptions: previousArtistsOptions,
        artistMap: previousArtistMap,
        selectedArtist: previousArtistsOptions[0].key, //sets the dropdown automatically to the first element, in case you don't select before submitting
      })

     
      //Create Scene Select Options 
      let prevSceneOptions = this.state.sceneOptions;
      
          //get artists from database
          database.ref(this.props.state.festival).child('scenes').on('child_added', snap => {
            var vals = snap.val();
      
            prevSceneOptions.push(
              <option value={snap.key} key={snap.key}> {vals.name} ({vals.capacity}) </option>
            )
            this.setState({
              sceneOptions: prevSceneOptions,
              selectedScene: prevSceneOptions[0].key, //sets the dropdown automatically to the first element, in case you don't select before submitting
            })
          })
    })
  }
  

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmitRequest(e) {
    e.preventDefault(); //prevents page from reloading

    var data = {
      artist: this.state.selectedArtist, //key of artist in firebase
      price: this.state.currentPriceInput,
      day: this.state.currentConcertDayInput,
      status: "pending",
    }

    //Push requesten inn i databasen
    database.ref(this.props.state.festival).child("requests").push(data)
    database.ref(this.props.state.festival).child("artists").child(this.state.selectedArtist).update({status: "pending"});
    console.log(this.state.requests);
  }

  handleAccept(request) {
    database.ref(this.props.state.festival).child("requests").child(request.key).update({status: "accepted"});

    // Kan dette gjøres bedre?
    var previousRequests = this.state.requests;
    previousRequests.map(item => {
      if (item === request) {
        item.status = "accepted"
      }
    })
    this.setState({
      requests: previousRequests
    })
  }

  handleDecline(request) {
    database.ref(this.props.state.festival).child("requests").child(request.key).update({status: "declined"});
    database.ref(this.props.state.festival).child("artists").child(request.artist).update({status: ""});

    // Kan dette gjøres bedre?
    var previousRequests = this.state.requests;
    previousRequests.map(item => {
      if (item === request) {
        item.status = "declined"
      }
    })
    this.setState({
      requests: previousRequests
    })
  }
  
  handleDelete(request) {
    database.ref(this.props.state.festival).child("requests").child(request.key).remove();
    this.setState({
      // Fjerner request fra this.state.requests og rendrer tabellen på nytt. 
      // Dermed slipper vi å force page refresh
      requests: this.state.requests.filter(item => item !== request)
    })
  }

  handleCopyEmail(e) {
    e.preventDefault();
    var copyText = this.state.email;
    copyText.select();
    document.execCommand("Copy");
  }

  render() {
    return (
      <div className="App">
        
        
        <h1>Band Booking</h1>
        
        {/*Sendes videre til bookingsjef for godkjenning.*/}
        <h3> Her kan du sende tilbud til manager for et band om de vil spille. </h3>

        <form>
          
          <select name="selectedArtist" onChange={this.handleChange} value={this.state.selectedArtist}>
            {this.state.artistOptions}
          </select>
          <input name="currentPriceInput" type="number" value={this.state.currentPriceInput} onChange={this.handleChange} placeholder="Price offer" />
          <select name="selectedScene" value={this.state.selectedScene} onChange={this.handleChange}>
              {this.state.sceneOptions}
          </select>
          <select name="selectedTime" value={this.state.selectedTime} onChange={this.handleChange}>
              {this.state.timeOptions}
          </select>
          <button onClick={this.handleSubmitRequest}>Submit</button>
        </form>

        {/*Liste med requests til Bookingsjef som kan godkjennes, eller ikke godkjennes.*/}
        <div className="requestsBody">

        <h3>Active Bookings</h3>

          <table>
            <thead>
              <tr>
                  <th>Artist</th>
                  <th>Day</th>
                  <th>Price</th>
                  <th>Status</th>
                  <th>Approve</th>
              </tr>
            </thead>
            <tbody>
              {this.state.requests.map((request) => {
                if (request.status === "pending") {
                    return(
                    <tr className="pendingRequests">
                      <td>{this.state.artistMap.get(request.artist)}</td>
                      <td>{request.day}</td>
                      <td>{request.price}</td>
                      <td>{request.status}</td>
                      <td>
                        <button onClick={() =>this.handleAccept(request)}> Accept </button>
                        <button onClick={() =>this.handleDecline(request)}> Reject </button>
                      </td>
                    </tr>
                    )
                  }
                if (request.status === "accepted") {
                  return(
                  <tr className="acceptedRequests">
                    <td>{this.state.artistMap.get(request.artist)}</td>
                    <td>{request.day}</td>
                    <td>{request.price}</td>
                    <td>{request.status}</td>
                    <td>
                      
                    </td>
                  </tr>
                  )
                }
              })

              }
            </tbody>
          </table>
        

          <h3>Declined by Bookingsjef</h3>
          <table>
            <thead>
              <tr>
                  <th>Artist</th>
                  <th>Day</th>
                  <th>Price</th>
                  <th>Status</th>
                  <th>Delete</th>
              </tr>
            </thead>
            <tbody className="declinedRequests">
              {this.state.requests.map((request) => {
                if (request.status === "declined") {
                    return(
                    <tr>
                      <td>{this.state.artistMap.get(request.artist)}</td>
                      <td>{request.day}</td>
                      <td>{request.price}</td>
                      <td>{request.status}</td>
                      <td><button onClick={() =>this.handleDelete(request)}> Delete </button></td>
                    </tr>
                    )
                  }
                })

              }
            </tbody>
          </table>

          {/*For senere om en skal legge til email funksjon.
          <div>
          <h1> Generated email: </h1>
          <textarea name="email" value={this.state.email} onChange={this.handleChange} rows="10" cols="60"></textarea>
          <button onClick={this.handleCopyEmail}>Copy Email</button>
          </div> */}

        </div>
      </div>
      
    );
    }
}
