import React, { Component } from 'react';

import './style.css';
//firebase
import database from '../../database';

import ManageRequest from '../../components/managerequest/ManageRequest'

export default class ManagerSite extends Component {

  constructor(props) {
    super(props);

    let artistMap = new Map();

    this.state = {
      requests: [],
      artistMap: artistMap

    };
    
    this.database = database;
 }

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






render() {
  return (
    <div className="App">

    <div className = "managerRequestsBody">
      <h2>Concert Offers</h2>
      <p>(hver mananger skal kun se requests for de artistene han er manager for)</p>

      <table>
              <thead>
                <tr>
                    <th>Artist</th>
                    <th>Day</th>
                    <th>Price</th>
                    <th>Technical Requirements</th>
                    <th>Rider</th>
                    <th>Approve</th>
                </tr>
              </thead>
              <tbody className="managerRequests">
                {this.state.requests.map((requests) => {
                  if (requests.status == "accepted") {
                    return(<ManageRequest
                      festival={this.props.state.festival}

                      requestKey={requests.key}
                      artist={requests.artist}
                      name={this.state.artistMap.get(requests.artist)}
                      day={requests.day}
                      price={requests.price}
                      
                     />
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
