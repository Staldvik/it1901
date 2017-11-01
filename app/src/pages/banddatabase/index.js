import React, { Component } from 'react';

import Concert from '../../components/concert/Concert'

import './style.css';

import database from '../../database';

import defaultArtistPic from '../../static/img/defaultArtistPic.jpg';

// Material
import {
  GridList, GridTile,
  IconButton,

} 
from 'material-ui';

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
    const styles = {
      root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
      },
      gridList: {
        width: '50%',
        height: 'auto',
        overflowY: 'auto',
      },
    };
    return (
      <div className="App">
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


        

        <div style={styles.root}>
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
                var vals = concert.val();
                return(
                  // Nå returnerer den en gridlist for hver match, ikkje bra!
                  // TODO: Fikse dette, evt hele matche-prosessen
                  // TODO: Scene påvirker ikke match
                  <GridList
                  cols={2}
                  cellHeight={200}
                  padding={1}
                  style={styles.gridList}
                  >
                    <GridTile
                      key={concert.key}
                      title={vals.name}
                      actionPosition="left"
                      titlePosition="top"
                      titleBackground="linear-gradient(to bottom, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
                      cols={2}
                      rows={1}
                    >
                    <img src={vals.pic ? vals.pic : defaultArtistPic} />
                    </GridTile>
                  </GridList>
                )
              }
            })
          }
        </div>
      </div>
    );
  }
}