import React, { Component } from 'react';
import NavComponent from '../../components/navbar/navbar'
import Concert from '../../components/concert/Concert'

import './style.css';

import database from '../../database';

export default class BandDatabase extends Component {

  constructor() {
    super();

    var sceneMap = new Map();
    this.state = {
      concerts: [],
      scenes: [],
      genres: [],
      sceneMap: sceneMap,
      genreOptions: [<option value="ShowAll" key="ShowALl"> Show All </option>],
      selectedGenre: "ShowAll",
    }


    this.handleChange = this.handleChange.bind(this);
  }


  handleChange(e) {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    })
    
  }

  componentWillMount() {
    var previousGenreOptions = this.state.genreOptions;
    var previousGenres = this.state.genres;
    var previousConcerts = this.state.concerts;
    var previousSceneMap = this.state.sceneMap;
    var previousScenes = this.state.scenes;

    // Gå gjennom alle festivalene
    database.ref().on('value', snapshot => {
      snapshot.forEach(festivalSnapshot => {

        // Hvis festivalen != festival17:
        if (festivalSnapshot.key != "festival17") {

          // For hver konsert
          festivalSnapshot.child('concerts').forEach(concertSnapshot => {

            // Tar vare på alle konsertene man finner
            previousConcerts.push(concertSnapshot);

            // Tar vare på alle sjangre man finner
            var genre = concertSnapshot.val().genre
            if (!previousGenres.includes(genre)) {
              previousGenreOptions.push(
                <option value={genre} key={concertSnapshot.key}> {genre} </option>
              )
              previousGenres.push(genre)
            }
          })

          // For hver scene
          festivalSnapshot.child('scenes').forEach(sceneSnapshot => {
            var index = previousScenes.push(sceneSnapshot);
            previousSceneMap.set(sceneSnapshot.key, index);
          })

        }

        // Hvis festivalen == festival17: skip
        else {
          console.log("Skipping festival17")
        }
      })
      this.setState({
        genreOptions: previousGenreOptions,
        genres: previousGenres,
        concerts: previousConcerts,
      })
    })
  }

  render() {
    return (
      <div className="App">
        <NavComponent />
        <h1>
          Band Database
        </h1>
        <p> Her kan man sjekke alle tidligere konserter innen en sjanger </p>

        <select name="selectedGenre" value={this.state.selectedGenre} onChange={this.handleChange}>
          {this.state.genreOptions}
        </select>

        <div>
          {
            // Går gjennom alle konsertene i this.state.concerts som concert
            this.state.concerts.map(concert => {
              var match = false;

              // Hvis valgt er Show All så "matcher" alle
              if (this.state.selectedGenre == "ShowAll") {
                match = true;
              }

              // Hvis ikke Show All, matcher valgt sjanger og konsertens sjanger?
              else if (this.state.selectedGenre == concert.val().genre) {
                match = true;
              }

              if (match) {
                return(
                <div key={concert.key}>
                  <h1> {String(concert.ref.parent.parent.key)} </h1>
                  <Concert name={concert.val().name} sales={concert.val().sales} capacity={this.state.} sceneName={} genre={concert.val().genre} key={concert.key}/>
                </div>
              )
              }
              
            })
          }
        </div>
      </div>
    );
  }
}