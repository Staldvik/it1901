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

    this.handleSearch = this.handleSearch.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSearch(e) {
    e.preventDefault();
    this.setState({
      currentSearchInput: e.target.value
    })

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

        if (festivalSnapshot.key.startsWith("-")) {
          // For hver konsert
          festivalSnapshot.child('concerts').forEach(concertSnapshot => {
            var concertVals = concertSnapshot.val();
            
            // Hent Scene etter key
            festivalSnapshot.ref.child("scenes").child(concertSnapshot.val().scene).once("value", foundScene => {
              if (foundScene.exists()) {
                var sceneName = foundScene.val().name;
                var sceneCapacity = foundScene.val().capacity;
                var genre = concertSnapshot.val().genres.split(",")[0]
  
                concertVals["sceneName"] = sceneName;
                concertVals["sceneCapacity"] = sceneCapacity;
                concertVals["genre"] = genre;
              }
              
              concertVals["festivalName"] = festivalSnapshot.val().name;
              // Tar vare på alle sjangre man finner
              if (!previousGenres.includes(genre)) {
                previousGenreOptions.push(
                  <option id="dropdownItem" value={genre} onClick={this.handleChange} key={concertSnapshot.key}> {genre} </option>
                )
                previousGenres.push(genre)
              }
            })
            .then(() => {
              festivalSnapshot.ref.child("program").child(concertSnapshot.val().date).once("value", programSnap => {
                programSnap.ref.child("slots").child(concertSnapshot.val().time).once("value", slotSnap => {
                  if (slotSnap.exists()) {
                    concertVals["startTime"] = slotSnap.val().start
                    concertVals["endTime"] = slotSnap.val().end
                    concertVals["dateVal"] = programSnap.val().date
                  }
                })
              
              })
            })

            previousConcerts.push(concertVals);
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
            <p className="lead text-muted">all concerts from all festivals</p>
            <p>
              <input type="text" class="form-control" value={this.state.currentSearchInput} onChange={this.handleSearch} placeholder="Search for Artist..." aria-label="Search for..."/>
            </p>
            <div id="concertDatabaseDrop" className="dropdown">
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
              if (this.state.selectedGenre === "All Genres") {

                if (this.state.currentSearchInput === "") {
                  match = true
                }

                else if (concert.name.toLowerCase().search(this.state.currentSearchInput.toLowerCase()) !== -1) {
                  match = true
                }
              }

              // Hvis ikke Show All, matcher valgt sjanger og konsertens sjanger?
              // Og matcher søket og navnet?
              else if (this.state.selectedGenre == concert.genre) {
                if (this.state.currentSearchInput === "") {
                  match = true
                }

                else if (concert.name.toLowerCase().search(this.state.currentSearchInput.toLowerCase()) !== -1) {
                  match = true
                }
              }

              if (match) {
                return (
                <div className="card" key={concert.key}>
                  <div className="card-header" role="tab" id={"heading"+concertNum}>
                    <h5 className="mb-0">
                      <a data-toggle="collapse" href={"#collapse"+concertNum} aria-expanded="false" aria-controls={"collapse"+concertNum}>
                        <span>
                          <p> {concert.festivalName} - {concert.dateVal} </p>
                          <p> {concert.name} </p>
                          <p>  </p>  
                        </span>
                        
                      </a>
                    </h5>
                  </div>
              
                  <div id={"collapse"+concertNum} className="collapse" role="tabpanel" aria-labelledby={"heading"+concertNum}>
                    <div className="card-body">
                      <h6>{concert.day}</h6>
                      <img src={concert.pic ? concert.pic : defaultArtistPic} className="rounded float-left" alt="Bilde av artist"/>
                      <div className="float-center">
                        <br></br>
                        <h6> Genres: {concert.genres} </h6>
                        <h6> Scene: {concert.sceneName} </h6>
                        <h6> Scene Capacity: {concert.sceneCapacity} </h6>
                        <h6> Technical Requirements : {concert.requirements ? concert.requirements : "None"} </h6>
                        <h6> Rider: {concert.rider ? concert.rider : "None"} </h6>
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
