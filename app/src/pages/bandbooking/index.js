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
    database.ref('festival17').child('requests').on('child_added', requestSnapshot => {
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
    database.ref('festival17').child('artists').on('child_added', snap => {
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
    database.ref("festival17").child("requests").push(data)
    database.ref("festival17").child("artists").child(this.state.selectedArtist).update({status: "pending"});
    console.log(this.state.requests);
  }

  handleAccept(key) {
    console.log("accept");
    console.log(JSON.stringify(key));
    database.ref("festival17").child("requests").child(key).update({status: "accepted"});
    window.location.reload();
  }

  handleDecline(key) {
    console.log("decline");
    database.ref("festival17").child("requests").child(key).update({status: "declined"});
    window.location.reload();
  }
  
  handleDelete(key) {
    console.log("Deleted");
    database.ref("festival17").child("requests").child(key).remove();
    window.location.reload();
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
          <input name="currentPriceInput" type="number" value={this.state.currentPriceInput} onChange={this.handleChange} placeholder="price" />
          <select name="currentConcertDayInput" id="day" value={this.state.currentConcertDayInput} onChange={this.handleChange}>
            <option value="day1">Dag 1</option>
            <option value="day2">Dag 2</option>
            <option value="day3">Dag 3</option>
            <option value="day4">Dag 4</option>
            <option value="day5">Dag 5</option>
            <option value="day6">Dag 6</option>
            <option value="day7">Dag 7</option>
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
              {this.state.requests.map((requests) => {
                if (requests.status === "pending") {
                    return(
                    <tr className="pendingRequests">
                      <td>{this.state.artistMap.get(requests.artist)}</td>
                      <td>{requests.day}</td>
                      <td>{requests.price}</td>
                      <td>{requests.status}</td>
                      <td>
                        <button onClick={() =>this.handleAccept(requests.key)}> Accept </button>
                        <button onClick={() =>this.handleDecline(requests.key)}> Reject </button>
                      </td>
                    </tr>
                    )
                  }
                if (requests.status === "accepted") {
                  return(
                  <tr className="acceptedRequests">
                    <td>{this.state.artistMap.get(requests.artist)}</td>
                    <td>{requests.day}</td>
                    <td>{requests.price}</td>
                    <td>{requests.status}</td>
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
              {this.state.requests.map((requests) => {
                if (requests.status === "declined") {
                    return(
                    <tr>
                      <td>{this.state.artistMap.get(requests.artist)}</td>
                      <td>{requests.day}</td>
                      <td>{requests.price}</td>
                      <td>{requests.status}</td>
                      <td><button onClick={() =>this.handleDelete(requests.key)}> Delete </button></td>
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
