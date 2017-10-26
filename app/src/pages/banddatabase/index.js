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
      genreOptions: [<option value="ShowAll" key="ShowALl"> Sjanger </option>],
      sceneOptions: [<option value="ShowAll" key="ShowAll"> Scene </option>],
      selectedGenre: "ShowAll",
      selectedScene: "ShowAll",

      // Search
      currentSearchInput: "",
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
    // Tar vare på current state
    var previousGenreOptions = this.state.genreOptions;
    var previousGenres = this.state.genres;
    var previousConcerts = this.state.concerts;
    var previousSceneMap = this.state.sceneMap;
    var previousScenes = this.state.scenes;
    var previousSceneOptions = this.state.sceneOptions;


    // Gå gjennom alle festivalene
    database.ref().once('value', snapshot => {
      snapshot.forEach(festivalSnapshot => {

        // Hvis festivalen != festival17 og ikke er en av de andre keysene som er kommet:
        if (! ((festivalSnapshot.key === "festival17") || (festivalSnapshot.key.slice(0,8) != "festival"))) {

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
            var index = previousScenes.push(sceneSnapshot) - 1;
            console.log("Adding " + sceneSnapshot.key + " to index " + index) 
            previousSceneMap.set(sceneSnapshot.key, index);
            previousSceneOptions.push(
              <option value={sceneSnapshot.key} key={sceneSnapshot.key}> {sceneSnapshot.val().location} - {sceneSnapshot.ref.parent.parent.key} </option> 
            )
          })

        }
      })
      this.setState({
        genreOptions: previousGenreOptions,
        genres: previousGenres,
        concerts: previousConcerts,
        scenes: previousScenes,
        sceneMap: previousSceneMap
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

        <form>
          <input type="text" placeholder="Artist Name" name="currentSearchInput" value={this.state.currentSearchInput} onChange={this.handleChange}/>
          <select name="selectedGenre" value={this.state.selectedGenre} onChange={this.handleChange}>
            {this.state.genreOptions}
          </select>
          <select name="selectedScene" value={this.state.selectedScene} onChange={this.handleChange}>
            {this.state.sceneOptions}
          </select>
        </form>

        <div>
          {
            // Går gjennom alle konsertene i this.state.concerts som concert
            this.state.concerts.map(concert => {
              var match = false;

              // Hvis valgt er Show All så "matcher" alle
              if (this.state.selectedGenre === "ShowAll") {

                if (this.state.currentSearchInput === "") {
                  match = true
                }

                else if (concert.val().name.toLowerCase().search(this.state.currentSearchInput.toLowerCase()) !== -1) {
                  match = true
                }
              }

              // Hvis ikke Show All, matcher valgt sjanger og konsertens sjanger?
              // Og matcher søket og navnet?
              else if (this.state.selectedGenre == concert.val().genre) {
                if (this.state.currentSearchInput === "") {
                  match = true
                }

                else if (concert.val().name.toLowerCase().search(this.state.currentSearchInput.toLowerCase()) !== -1) {
                  match = true
                }
              }

              if (match) {
                var sceneLocation = this.state.scenes[this.state.sceneMap.get(concert.val().scene)].val().location;
                var sceneCapacity = this.state.scenes[this.state.sceneMap.get(concert.val().scene)].val().capacity;
                return(
                <div key={concert.key}>
                  <h1> {String(concert.ref.parent.parent.key)} </h1>
                  <Concert name={concert.val().name} sales={concert.val().sales} genre={concert.val().genre} key={concert.key} 
                  sceneCapacity={sceneCapacity} sceneLocation={sceneLocation}/>
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