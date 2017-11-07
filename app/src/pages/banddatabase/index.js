import React, { Component } from 'react';

import Concert from '../../components/concert/Concert'

import './style.css';

import database from '../../database';

import defaultArtistPic from '../../static/img/defaultArtistPic.jpg';



export default class BandDatabase extends Component {

  constructor() {
    super();

    this.state = {
      concerts: [],
      scenes: [],
      genres: [],
      genreOptions: [],
      selectedGenre: "All Genres",

      // Search
      currentSearchInput: "",
    }


    this.handleChange = this.handleChange.bind(this);
  }


  handleChange(e) {
    e.preventDefault();
    this.setState({
      selectedGenre: e.target.value,
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

        // TODO: Hvis festival, altså pushet inn og ikke custom key. Denne kan brukes når vi sletter hele databasen før release.
        //if (festivalSnapshot.key.startsWith("-")) {

        if (festivalSnapshot.key !== "users" && festivalSnapshot.key !== "cloudFunctions") {
          // For hver konsert
          festivalSnapshot.child('concerts').forEach(concertSnapshot => {

            // Tar vare på alle konsertene man finner
            previousConcerts.push(concertSnapshot);

            // Tar vare på alle sjangre man finner
            var genre = concertSnapshot.val().genre
            if (!previousGenres.includes(genre)) {
              previousGenreOptions.push(
                <option value={genre} onClick={this.handleChange} key={concertSnapshot.key}> {genre} </option>
              )
              previousGenres.push(genre)
            }
          })
        }
      })
    })
    .then(() => {
      this.setState({
        genreOptions: previousGenreOptions,
        genres: previousGenres,
        concerts: previousConcerts,
      })
    })
  }

  render() {
    return (

      <div className="container">

        <section className="jumbotron text-center">
          <div className="container">
            <h1 className="jumbotron-heading">Concert Database</h1>
            <p className="lead text-muted">These are all the concerts found in our database</p>
            <p>
              <a href="#" class="btn btn-primary">Main call to action</a>
            </p>
            <div className="dropdown">
            <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              {this.state.selectedGenre}
            </button>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <option id="dropdownItem" onClick={this.handleChange} value={"All Genres"}  key="ShowAll"> All Genres </option>
              {this.state.genreOptions}
            </div>
            </div>
          </div>
        </section>

        

        <div id="accordion" role="tablist">
        {
          this.state.concerts.map((concert, concertNum) => {
            let match = false;

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
                return (
                <div className="card" key={concert.key}>
                  <div className="card-header" role="tab" id={"heading"+concertNum}>
                    <h5 className="mb-0">
                      <a data-toggle="collapse" href={"#collapse"+concertNum} aria-expanded="false" aria-controls={"collapse"+concertNum}>
                        {concert.val().name}
                      </a>
                    </h5>
                  </div>
              
                  <div id={"collapse"+concertNum} className="collapse" role="tabpanel" aria-labelledby={"heading"+concertNum}>
                    <div className="card-body">
                      <h6>{concert.val().day}</h6>
                      <img src={concert.val().pic ? concert.val().pic : defaultArtistPic} className="rounded float-left" alt="Bilde av artist"/>
                      <div className="float-center">
                        <h2> Info </h2>
                        <h6> Genre: {concert.val().genre} </h6>
                        <h6> SceneID(TEMP): {concert.val().scene} </h6>
                        <h6> Technical Requirements : {concert.val().technicalInfo ? concert.val().technicalInfo : "None"} </h6>
                        <h6> Rider: {concert.val().rider ? concert.val().rider : "None"} </h6>
                      </div>
                    </div>
                  </div>
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
