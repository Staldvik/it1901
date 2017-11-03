import React, { Component } from 'react';

import Concert from '../../components/concert/Concert'

import './style.css';

import database from '../../database';

import defaultArtistPic from '../../static/img/defaultArtistPic.jpg';



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


    // Gå gjennom hele databasen
    database.ref().once('value', snapshot => {
      snapshot.forEach(festivalSnapshot => {

        // Hvis festival
        if (festivalSnapshot.key !== "users") {

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
    })
    .then(() => {
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
        <h1>
          Konsertdatabase
        </h1>
        <p> Her kan man sjekke alle konserter som ligger i vår database </p>

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
                try {
                var sceneLocation = this.state.scenes[this.state.sceneMap.get(concert.val().scene)].val().location;
                var sceneCapacity = this.state.scenes[this.state.sceneMap.get(concert.val().scene)].val().capacity;
                } catch (err) {
                  console.log("this.state.scenes gives undefined") 
                  var sceneLocation = "Ikke Oppgitt"
                  var sceneCapacity = "Ikke Oppgitt"
                }
                var vals = concert.val();
                return(
                  // TODO: Scene påvirker ikke match
                  // TODO: Kanskje gjøre om på hele matche-prosessen 

                    <div key={concert.key}>
                      <Concert name={vals.name} genre={vals.genre} />
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