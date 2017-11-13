import React, { Component } from 'react';

import './style.css';
//firebase
import database from '../../database';

import ManageRequest from '../../components/managerequest/ManageRequest'

/**
 * Component used to render the Manager Site
 */
export default class ManagerSite extends Component {

  constructor(props) {
    super(props);

    let artistMap = new Map();
    let sceneMap = new Map();
    let dateMap = new Map();
    let timeMap = new Map();

    this.state = {
      requests: [],
      
      artistMap: artistMap,
      sceneMap: sceneMap,
      dateMap:dateMap,
      timeMap:timeMap,


    };
    
    this.database = database;
 }

 /**
  * Pulls information from database
  */
 componentWillMount() {

  let previousArtistMap = this.state.artistMap; //map to get name of artist from key
  database.ref(this.props.state.festival).child('artists').on('child_added', snap => {

    previousArtistMap.set(snap.key, snap.val().name);

    this.setState({
      artistMap: previousArtistMap,
    })
  })

  //requests from bookingsjef
  var previousRequests = this.state.requests;
  database.ref(this.props.state.festival).child('requests').on('child_added', requestSnapshot => {
    var vals = requestSnapshot.val();
    if (vals.status === "accepted") {
      previousRequests.push({
        artist: vals.artist,
        price:vals.price,
        scene: vals.scene,
        date:vals.date,
        time:vals.time,
        status:vals.status,
        key:requestSnapshot.key,
      })
    }
    this.setState({
      requests: previousRequests,
    })
  })

  database.ref(this.props.state.festival).child('requests').on('child_removed', changedSnapshot => {
    this.setState({
      requests: this.state.requests.filter(item => item.key !== changedSnapshot.key)
    })
  })

  
  let prevDateMap = this.state.dateMap;
  let prevTimeMap = this.state.timeMap;
    
      //get days from database
      database.ref(this.props.state.festival).child('program').on('child_added', snap => {
          
          //Add the times to the times map to get them by key
            database.ref(this.props.state.festival).child('program').child(snap.key).child("slots").on('child_added', time => {
                  prevTimeMap.set(time.key, time.val().start + "-" + time.val().end)
                  this.setState({
                    timeMap: prevTimeMap
                  })
              })
          
          var vals = snap.val();

          prevDateMap.set(snap.key, vals.date) //map to get dates by key
 
          this.setState({
            dateMap: prevDateMap,
          })
      })
  
  
  let prevSceneMap = this.state.sceneMap;
  
    //get scenes from database
    database.ref(this.props.state.festival).child('scenes').on('child_added', snap => {
        var vals = snap.val();
        
        prevSceneMap.set(snap.key, vals.name +" "+ "(" + vals.capacity + ")") //map to get name of scene from key

        this.setState({
          sceneMap: prevSceneMap,
        })
    })


 }

/**
 * Keeps state synced with fields
 * @param {event} e 
 */
handleChange(e) {
  this.setState({
      [e.target.name]: e.target.value
    }
  );
}





/**
 * Renders the page
 */
render() {
  return (
    <div className="App">

    <div className = "managerRequestsBody">
      <h2>Concert Offers</h2>

      <table>
              <thead>
                <tr>
                    <th>Artist</th>
                    <th>Price</th>
                    <th>Scene (capacity)</th>
                    <th>Date</th>
                    <th>Technical Requirements</th>
                    <th>Rider</th>
                   
                </tr>
              </thead>
              <tbody className="managerRequests">
                {this.state.requests.map((requests) => {
                  return(<ManageRequest
                    festival={this.props.state.festival}

                    requestKey={requests.key}
                    artist={requests.artist}
                    scene={requests.scene}
                    name={this.state.artistMap.get(requests.artist)}
                    date={requests.date}
                    time={requests.time}
                    price={requests.price}
                    key={requests.key}

                    dateDisplay={this.state.dateMap.get(requests.date)}
                    timeDisplay={this.state.timeMap.get(requests.time)}
                    sceneDisplay={this.state.sceneMap.get(requests.scene)}
                    
                    />
                  )
                  })

                }
              </tbody>
        </table>
    </div>

    </div>
  );
}
}
