import React, { Component } from 'react';

import './style.css';
import template from '../../static/img/defaultArtistPic.jpg'

//firebase
import database from '../../database'

export default class ConcertPage extends Component {
  
  constructor() {
    super();

    this.state = {
      concerts: [],
      opts: [],
      selectedTech: "showAll",
      selectedTechName: "All Technicians",
    }

    this.handleChange = this.handleChange.bind(this);

  }

  componentWillMount() {
    var previousConcerts = this.state.concerts;
    var previousOpts = this.state.opts;
    var previousSelectedTech = this.state.selectedTech;
    
    // Spagetti-kode
    // TODO: Rydd opp så ting skjer i rekkefølge
    database.ref(this.props.state.festival).child('concerts').orderByChild('day').on('child_added', concertSnapshot => {
      database.ref(this.props.state.festival).child("scenes").orderByKey().equalTo(concertSnapshot.val().scene).once("value", foundScenes => {
        
        //.equalTo returnerer en samling av dataSnapshots, enkleste måten er å kjøre child på den
        // og keyen til childen vi er ute etter er keyen som ligger i concertSnapshotet
        var sceneName = foundScenes.child(concertSnapshot.val().scene).val().name;

        var vals = concertSnapshot.val();
        var prevTechnicianNames = [];
        concertSnapshot.child('technicians').forEach((technician) => {
          prevTechnicianNames.push(technician.val().name)
        })
        previousConcerts.push({
          name: vals.name,
          genres: vals.genres,
          price: vals.price,
          day: vals.day,
          key: concertSnapshot.key,
          technicians: vals.technicians,
          technicianNames: prevTechnicianNames,
          technicalInfo: vals.requirements,
          pic: vals.pic,
          rider: vals.rider,
          sceneName: sceneName,
        })
      this.setState({
        concerts: previousConcerts,
        selectedTech: previousSelectedTech,
        technicianNames: prevTechnicianNames,
      })
    })

    database.ref(this.props.state.festival).child('technicians').orderByChild('ID').on('child_added', technicianSnapshot => {
      previousOpts.push(
        <option id="dropdownItem" onClick={this.handleChange} key={technicianSnapshot.key} value={technicianSnapshot.key+":"+technicianSnapshot.val().name}> {technicianSnapshot.val().name} </option>
      )
      this.setState({        
        opts: previousOpts,
      })
    })
  })
}

  handleChange(e) {
    this.setState({
      selectedTech: e.target.value.split(":")[0],
      selectedTechName: e.target.value.split(":")[1],
    })
    console.log("Selected tech set to: " + e.target.value)
  }

  render() {
    return (
      <div className="container">

        <section className="jumbotron text-center">
          <div className="container">
            <h1 className="jumbotron-heading">Concerts</h1>
            <p className="lead text-muted">Filter concerts by technician here</p>
            <div className="dropdown">
            <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              {this.state.selectedTechName}
            </button>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <option id="dropdownItem" onClick={this.handleChange} value={"showAll:All Technicians"} key={"showAll"}> All Technicians </option>
              {this.state.opts}
            </div>
            </div>
          </div>
        </section>    




        <div id="accordion" role="tablist">
          {
            this.state.concerts.map((concert, concertNum) => {
              let match = false;
              
              // Sjekk om alle skal vises
              if (this.state.selectedTech === "showAll") {
                match = true;
              }

              // Hvis ikke, sjekk om konserten har noen teknikere på seg
              else if (concert.technicians !== undefined) {
                if (concert.technicians[this.state.selectedTech] !== undefined) {
                  match = true;
                }

              }

              if (match) {
                return (
                <div className="card" key={concert.key}>
                  <div className="card-header" role="tab" id={"heading"+concertNum}>
                    <h5 className="mb-0">
                      <a data-toggle="collapse" href={"#collapse"+concertNum} aria-expanded="false" aria-controls={"collapse"+concertNum}>
                        {concert.name}
                      </a>
                    </h5>
                  </div>
              
                  <div id={"collapse"+concertNum} className="collapse" role="tabpanel" aria-labelledby={"heading"+concertNum}>
                    <div className="card-body">
                      <h6>{concert.day}</h6>
                      <img src={concert.pic ? concert.pic : template} className="rounded float-left" alt="Bilde av artist"/>
                      <div className="float-center">
                        <h2> Info </h2>
                        <h6> Genres: {concert.genres} </h6>
                        <h6> Scene: {concert.sceneName} </h6>
                        <h6> Technical Requirements : {concert.technicalInfo ? concert.technicalInfo : "None"} </h6>
                        <h6> Rider: {concert.rider ? concert.rider : "None"} </h6>
                      </div>
                      <ul className="list-group list-group-flush float-right">
                        <h6> Technicians on this concert </h6>
                        {
                          concert.technicianNames.map(tech => {
                            console.log("Tech", tech)
                            return (
                              <li className="list-group-item"> {tech} </li>
                            )
                          })
                        }
                      </ul>
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
