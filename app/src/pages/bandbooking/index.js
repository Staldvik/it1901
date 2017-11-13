import React, { Component } from 'react';

import './style.css';
import database from '../../database'

/**
 * Component used to render Band booking site for booking boss
 */
export default class BandBooking extends Component {
  // static propTypes = {}
  // static defaultProps = {}
  // state = {}

  constructor(props) {
    super(props);
    let artistMap = new Map();
    let sceneMap = new Map();
    let dateMap = new Map();
    let timeMap = new Map();
    this.state = {

      artists: [],
      artistOptions: [],
      selectedArtist:"",
      artistMap: artistMap, //for keeping name of artist and be able to get it by key

      currentArtistNameInput: "",
      currentPriceInput: "",
      
      
      sceneOptions: [],
      selectedScene:"",

      dayOptions: [],
      selectedDay:"",

      timeOptions: [],
      selectedTime:"",

      sceneMap: sceneMap, //to get name of scenes by key
      dateMap: dateMap, //to get date/day by key
      timeMap: timeMap, //to get time by key
      

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
    this.handleChangeDay = this.handleChangeDay.bind(this);
    
  }

  /**
   * Pulls requests, scenes and artists from database based on current festival
   */
  componentWillMount() {
    var previousRequests = this.state.requests;
    console.log(previousRequests);

    //get requests from database
    database.ref(this.props.state.festival).child('requests').on('child_added', requestSnapshot => {
      var vals = requestSnapshot.val();
      previousRequests.push({
        artist:vals.artist,
        price:vals.price,
        scene:vals.scene,
        date:vals.date,
        time:vals.time,
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
      let vals = snap.val();
      let marker = "";
      if(vals.status != "pending"){ //not able to send requests to artist that have a pending request
          previousArtists.push({
            id: snap.key,
            name:vals.name,
            followers:vals.followers,
            popularity:vals.popularity,
            genres:vals.genres,
            reviews: vals.reviews, 
            uri: vals.uri,
            
          })
      
          
          if(vals.status === "declined"){marker = "**"}//mark artists that have declined a previous offer.
          if(vals.status === "booked"){marker = "*"}//mark artists that are already booked for a concert.

          //push artists into an array of options elements
          previousArtistsOptions.push(
            <option value={snap.key} key={snap.key}> {vals.name}{marker} </option>
          )

          this.setState({
            artistOptions: previousArtistsOptions,
            selectedArtist: previousArtistsOptions[0].key, //sets the dropdown automatically to the first element, in case you don't select before submitting
          })
        
      }
      
      //push name and key into a map
      previousArtistMap.set(snap.key, vals.name);
      

      this.setState({
        artists: previousArtists,
        artistMap: previousArtistMap,
        
      })
    
    })

      //Create Scene Select Options 
    let prevSceneOptions = this.state.sceneOptions;
    let prevSceneMap = this.state.sceneMap;
      
        //get scenes from database
        database.ref(this.props.state.festival).child('scenes').on('child_added', snap => {
            var vals = snap.val();
            
            prevSceneMap.set(snap.key, vals.name) //map to get name of scene from key
      
            prevSceneOptions.push(
              <option value={snap.key} key={snap.key}> {vals.name} ({vals.capacity}) </option>
            )
            this.setState({
              sceneOptions: prevSceneOptions,
              selectedScene: prevSceneOptions[0].key, //sets the dropdown automatically to the first element, in case you don't select before submitting
              sceneMap: prevSceneMap,
            })
        })
      
      let prevDayOptions = this.state.dayOptions;
      let prevDateMap = this.state.dateMap;
      let prevTimeMap = this.state.timeMap;
        
          //get days from database
          database.ref(this.props.state.festival).child('program').on('child_added', snap => {
              
              //Add the times to the times map to get them by key
                database.ref(this.props.state.festival).child('program').child(snap.key).child("slots").on('child_added', time => {
                      prevTimeMap.set(time.key, time.val().start + "-" + time.val().end)
                      console.log(time.val().start)
                      this.setState({
                        timeMap: prevTimeMap
                      })
                  })
              
              var vals = snap.val();

              prevDateMap.set(snap.key, vals.date) //map to get dates by key

              prevDayOptions.push(
                <option value={snap.key} key={snap.key}> {vals.date} </option>
              )
              this.setState({
                dayOptions: prevDayOptions,
                selectedDay: prevDayOptions[0].key, //sets the dropdown automatically to the first element, in case you don't select before submitting
                dateMap: prevDateMap,
              })


              

          })

          

      
      
   
  }

  /**
   * Pulls available timeslots from database
   */
  componentDidMount(){
    if (! this.state.selectedDay) {
      return
    }

    let prevTimeOptions = [];
        //get times from database
        database.ref(this.props.state.festival).child('program').child(this.state.selectedDay).child("slots").on('child_added', snap => {
            var vals = snap.val();

           
      
            prevTimeOptions.push(
              <option value={snap.key} key={snap.key}>{vals.start}-{vals.end}</option>
            )
            this.setState({
              timeOptions: prevTimeOptions,
              selectedTime: prevTimeOptions[0].key, //sets the dropdown automatically to the first element, in case you don't select before submitting
            })
        })
    

  }
  
  /**
   * Keeps state updated
   * @param {event} e 
   */
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }


  //We need a seperate function when a state change is dependent on another state change,
  //since state is not not necessarily a synchronous operation
  //see: https://stackoverflow.com/questions/41043419/reactjs-onclick-state-change-one-step-behind
  //I solved it by getting the selectedDay variable directly and not depend on the state. Took some time to figure out...!
  /**
   * Handles change in day selected
   * @param {event} e 
   */
  handleChangeDay(e) {
    this.setState({
      [e.target.name]: e.target.value
    })

    let selectedDay = e.target.value //note that this is not the state, because the state is not set so we can not depend on it when accessing the database

    let prevTimeOptions = [];
    
            //get times from database
            database.ref(this.props.state.festival).child('program').child(selectedDay).child("slots").on('child_added', snap => {
                var vals = snap.val();
                console.log(vals.start, "-", vals.end)
          
                prevTimeOptions.push(
                  <option value={snap.key} key={snap.key}>{vals.start}-{vals.end}</option>
                )

                this.setState({
                  selectedTime: prevTimeOptions[0].key, //sets the dropdown automatically to the first element, in case you don't select before submitting
                  //Cannot be set outside the callback in case a scene has no timeslot. 
                  })
               
            })
            this.setState({
              timeOptions: prevTimeOptions, //must be set outside the snap callback in case a scene has no timeslots.
            })
            
  }
  

  
  /**
   * Submits request, in other words pushing it into the database
   * @param {event} e 
   */
  handleSubmitRequest(e) {
    e.preventDefault(); //prevents page from reloading

    var data = {
      artist: this.state.selectedArtist, //key of artist in firebase
      price: this.state.currentPriceInput,
      scene: this.state.selectedScene,
      date: this.state.selectedDay,
      time: this.state.selectedTime,
      status: "pending",
    }

    //Push requesten inn i databasen
    database.ref(this.props.state.festival).child("requests").push(data)
    database.ref(this.props.state.festival).child("artists").child(this.state.selectedArtist).update({status: "pending"});
    console.log(this.state.requests);
  }

  /**
   * Sets the request in database as accepted.
   * @param {request} request 
   */
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

  /**
   * Sets the request in database as declined
   * @param {request} request 
   */
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
  
  /**
   * Removes the request from the database
   * @param {request} request 
   */
  handleDelete(request) {
    database.ref(this.props.state.festival).child("requests").child(request.key).remove();
    this.setState({
      // Fjerner request fra this.state.requests og rendrer tabellen på nytt. 
      // Dermed slipper vi å force page refresh
      requests: this.state.requests.filter(item => item !== request)
    })
  }

  /**
   * Placeholder function; not used.
   * @param {event} e 
   */
  handleCopyEmail(e) {
    e.preventDefault();
    var copyText = this.state.email;
    copyText.select();
    document.execCommand("Copy");
  }

  /**
   * Renders the Band booking page
   */
  render() {
    return (
      <div className="App">
        
        <h2>Send Booking Request</h2>
        <p>* artist already booked for a concert<br></br>
          ** artist declined a previous offer to play
        </p>

        <form>
          
          <select name="selectedArtist" onChange={this.handleChange} value={this.state.selectedArtist}>
            {this.state.artistOptions}
          </select>
          <input name="currentPriceInput" type="number" value={this.state.currentPriceInput} onChange={this.handleChange} placeholder="Price offer" />
          <select name="selectedScene" value={this.state.selectedScene} onChange={this.handleChange}>
              {this.state.sceneOptions}
          </select>
          <select name="selectedDay" value={this.state.selectedDay} onChange={this.handleChangeDay}>
              {this.state.dayOptions}
          </select>
          <select name="selectedTime" value={this.state.selectedTime} onChange={this.handleChange} >
              {this.state.timeOptions}
          </select>
          <button onClick={this.handleSubmitRequest}>Submit</button>
        </form>

        {/*Liste med requests til Bookingsjef som kan godkjennes, eller ikke godkjennes.*/}
        <div className="requestsBody">

        <h2>Active Bookings</h2>

          <table>
            <thead>
              <tr>
                  <th>Artist</th>
                  <th>Price</th>
                  <th>Scene</th>
                  <th>Date</th>
                  <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {this.state.requests.map((request) => {
                if (request.status === "pending") {
                    return(
                    <tr className="pendingRequests">
                      <td>{this.state.artistMap.get(request.artist)}</td>
                      <td>{request.price}</td>
                      <td>{this.state.sceneMap.get(request.scene)}</td>
                      <td>{this.state.dateMap.get(request.date)} 
                          {" "}
                          ({this.state.timeMap.get(request.time)})
                      </td>
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
                   <td>{request.price}</td>
                   <td>{this.state.sceneMap.get(request.scene)}</td>
                   <td>{this.state.dateMap.get(request.date)} 
                       {" "}
                       ({this.state.timeMap.get(request.time)})
                   </td>
                   <td>{request.status}</td>
                   
                 </tr>
                 )
                }
              })

              }
            </tbody>
          </table>
        

          <h2>Declined Requests</h2>
          <table>
            <thead>
              <tr>
                  <th>Artist</th>
                  <th>Price</th>
                  <th>Scene</th>
                  <th>Date</th>
                  <th>Status</th>
              </tr>
            </thead>
            <tbody className="declinedRequests">
              {this.state.requests.map((request) => {
                if (request.status === "declined") {
                    return(
                    <tr>
                      <td>{this.state.artistMap.get(request.artist)}</td>
                      <td>{request.price}</td>
                      <td>{this.state.sceneMap.get(request.scene)}</td>
                      <td>{this.state.dateMap.get(request.date)} 
                          {" "}
                          ({this.state.timeMap.get(request.time)})
                      </td>
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
