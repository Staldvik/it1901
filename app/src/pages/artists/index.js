import React, { Component } from 'react';

import './style.css';
import database from '../../database'

import ArtistList from '../../components/artistlist/ArtistList'

/**
 * Component used to render the Artists page
 */
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

  /**
   * Here used to pull all artists in current festival from database
   */
  componentWillMount() {
    var previousArtists = this.state.artists;


    database.ref(this.props.state.festival).child('artists').on('child_added', snap => {
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

  /**
   * Keeps state updated
   * @param {event} e 
   */
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }


  /**
   * Renders a page with all the artists found in current festival.
   */
  render() {
    return (
      <div className="App">
        
        
        <h2>My Artists</h2>
        
        <div className="artistTable">

          <table>
            <thead>
              <tr>
                  <th>Artist</th>
                  <th>Followers</th>
                  <th>Popularity (0-100)</th>
                  <th>Genres</th>
                  <th>Booked</th>
                  <th>Listen</th>
              </tr>
            </thead>
            <tbody>
            {this.state.artists.map((artist) => {
              return(<ArtistList
                festival={this.props.state.festival}
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
