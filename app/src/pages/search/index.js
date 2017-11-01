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
    }

    this.handleChange = this.handleChange.bind(this);
    this.loadInfo = this.loadInfo.bind(this);
    
    
    this.spotifyApi = new SpotifyWebApi({
      redirectUri : 'http://localhost:3000/callback'
    });

    /* this.lastfmApi = new LastfmWebApi({
      'api_key' : '4a8a0fe142d2a436d9a80d3e460ec1eb',
      'secret' : '66c6a14111b6faf09afe1df9e78df5bc'
    }); */

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
    this.loadInfo();
  }
  
  fetchToken() {
    var myHeaders = new Headers();
    var myInit = { method: 'GET',
                   headers: myHeaders,
                   mode: 'cors',
                   cache: 'default' };
    var myRequest = new Request('https://us-central1-festival-180609.cloudfunctions.net/spotifyToken/', myInit);
    fetch(myRequest).then(response => {
      response.json().then(file => {
        console.log("Token is", file["token"]);
        this.spotifyApi.setAccessToken(file["token"]);
      })
    })
  }


  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    },
    () => {
      if (this.state.currentSearchInput.length > 1) {
        this.spotifyApi.searchArtists(this.state.currentSearchInput)
        .then(data => {
          var artistsToShow = []
          data.body.artists.items.map(artist => {
            if (artist.popularity > 5 && artist.followers.total > 1000) {
              artist.summary = "NO INFO"
              artistsToShow.push(artist)
            }
          })
          return artistsToShow;
        }, err => {
          console.error(err)
        })
        .then(artistsToShow => {
          artistsToShow.map(artist => {
            var summary = ""
            this.lastfm.getArtistInfo({
              artist: artist.name,
              lang: 'nob',
              callback: function(err, result) { 
                if (err) {console.log(err)}
                else {
                summary = result.artistInfo.bio.summary;
                artist.summary = summary;
                }
              }
            })
          })
          return artistsToShow
        })
        .then(artistsToShow => {
          this.setState({artists:artistsToShow});
        })
      } else {
        this.setState({artists:[]})
      }
    })
  }

  loadInfo() {
    var artistBioSum = "";
    var artistPic = "";
    this.lastfm.getArtistInfo({
      artist: "Astrid S",
      callback: function(result) {
          artistBioSum = result.artistInfo.bio.summary
          artistPic = result.artistInfo.image[0]['#']
          console.log(artistBioSum, artistPic)
      }
    })
  }

  render(){
    return(
      <div className="App">
        

        <h1> Let's search </h1>

        <form>
          <input type="text" placeholder="Artist Name" name="currentSearchInput" value={this.state.currentSearchInput} onChange={this.handleChange}/>
        </form>

        <div className="Artists">
          <table>
            <thead>
              <tr>
                  <th>Artist</th>
                  <th>Followers</th>
                  <th>Popularity (0-100)</th>
                  <th>Genres</th>
                  <th>Spotify</th>
                  <th>Add</th>
              </tr>
            </thead>
            {
              this.state.artists.map(artist => {
                return (
                  <Artist festival={this.props.state.festival} name={artist.name} popularity={artist.popularity} followers={artist.followers.total} genres={artist.genres} uri={artist.uri}/>
                )
              })
            }
          </table>
        </div>

      </div>
    )
  }
}
