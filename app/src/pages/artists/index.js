import React, { Component } from 'react';
import NavComponent from '../../components/navbar/navbar'
import './style.css';
import database from '../../database'

import ArtistList from '../../components/artistlist/ArtistList'

export default class Artists extends Component {
  // static propTypes = {}
  // static defaultProps = {}
  // state = {}

  constructor(props) {
    super(props);

    this.state = {
      artists: [],
    }

    this.handleChange = this.handleChange.bind(this);

  }

  //kjøres når siden/komponenten lastes
  componentWillMount() {
    var previousArtists = this.state.artists;


    database.ref('-KxJHWYoj6w08GVnyKwz').child('artists').on('child_added', snap => {
      var vals = snap.val();

      previousArtists.push({
        id: snap.key,
        name:vals.name,
        followers:vals.followers,
        popularity:vals.popularity,
        genres:vals.genres,
        reviews: vals.reviews,
        status: vals.status,
        uri: vals.uri,
        
      })

      this.setState({
        artists: previousArtists,
      })
    })

  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }


  
  render() {
    return (
      <div className="App">
        <NavComponent />
        
        <h1>My Artists</h1>
        
        <div className="artistTable">

          <table>
            <thead>
              <tr>
                  <th>Artist</th>
                  <th>Followers</th>
                  <th>Popularity (0-100)</th>
                  <th>Genres</th>
                  <th>Reviews</th>
                  <th>Booked</th>
                  <th>Listen</th>
                  <th>Edit</th>
              </tr>
            </thead>
            <tbody>
            {this.state.artists.map((artist) => {
              return(<ArtistList 
                name={artist.name}
                followers={artist.followers}
                popularity={artist.popularity}
                genres={artist.genres}
                reviews={artist.reviews}
                status={artist.status}
                uri={artist.uri}
                id={artist.id} //kan ikke kalle den key fordi map har en egen key.
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
