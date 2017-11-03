//LASTFM KEY
/* 
Application name:	Festival App
API key:	4a8a0fe142d2a436d9a80d3e460ec1eb
Shared secret:	66c6a14111b6faf09afe1df9e78df5bc
Registered to	aasmusta 
*/





import React, { Component } from 'react';

import './style.css';
import database from '../../database';
import Artist from '../../components/artist/Artist';

import * as SpotifyWebApi from 'spotify-web-api-node';
/* import * as LastfmWebApi from 'lastfmapi'; */
import * as Lastfm from 'simple-lastfm';


export default class Search extends Component {
  constructor() {
    super();
    this.state = {
      currentSearchInput: "",
      artists: [],
      hasToken: false,
    }

    this.handleChange = this.handleChange.bind(this);
    
    
    this.spotifyApi = new SpotifyWebApi({
      redirectUri : 'http://localhost:3000/callback'
    });

    this.lastfm = new Lastfm({
      api_key: '4a8a0fe142d2a436d9a80d3e460ec1eb',
      api_secret: '66c6a14111b6faf09afe1df9e78df5bc',
      username: 'xxx',
      password: 'xxx',
      authToken: 'xxx' // Optional, you can use this instead of password, where authToken = md5(username + md5(password))
    });
  }

  componentWillMount() {
    this.fetchToken();
  }
  
  fetchToken() {
    var myHeaders = new Headers();
    var myInit = { method: 'GET',
                   headers: myHeaders,
                   mode: 'cors',
                   cache: 'default' };
    var myRequest = new Request('https://us-central1-festival-180609.cloudfunctions.net/spotifyToken/', myInit);
    fetch(myRequest).then(response => {
      response.json()
      .then(file => {
        console.log("Token is", file["token"]);
        this.spotifyApi.setAccessToken(file["token"]);
        this.setState({hasToken: true});
      })
      .catch(error => {
        console.log("An error occured fetching token", error)
      })
    })
  }


  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    },
    () => {
      if (this.state.currentSearchInput.length > 1 && this.state.hasToken) {
        this.spotifyApi.searchArtists(this.state.currentSearchInput)
        .then(data => {
          var artistsToShow = []
          data.body.artists.items.map(artist => {
            if (artist.popularity > 5 && artist.followers.total > 1000) {
              artistsToShow.push(artist)
            }
          })
          return artistsToShow;
        }, err => {
          console.error(err)
        })
        .then(artistsToShow => {
          this.setState({artists:artistsToShow});
        })
      } else {
        this.setState({artists:[]})
      }
    })
  }

  render(){
    
    return(
      <div className="App">
        

        <h1> Søk etter artist her </h1>

        <form>
          <input type="text" placeholder="Artist Name" name="currentSearchInput" value={this.state.currentSearchInput} onChange={this.handleChange}/>
        </form>

        <div className="Artists">
          <table>
            <thead>
              <tr>
                  <th>Artist</th>
                  <th>Følgere</th>
                  <th>Popularitet (0-100)</th>
                  <th>Sjangre</th>
                  <th>Spotify</th>
                  <th>Legg til</th>
              </tr>
            </thead>
            {
              this.state.artists.map(artist => {
                var url = ""

                try {
                  if (artist.images[0].url) {
                    url = artist.images[0].url
                  }
                 } catch (TypeError) {
                  console.log("Can't read property url of undefined")
                }
                
                return (
                  <Artist festival={this.props.state.festival} name={artist.name} popularity={artist.popularity} followers={artist.followers.total} genres={artist.genres} uri={artist.uri}
                  pic={url} key={artist.uri}/>
                )
              })
            }
          </table>
        </div>

      </div>
    )
  }
}
