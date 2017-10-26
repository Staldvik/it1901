import React, { Component } from 'react';
import NavComponent from '../../components/navbar/navbar';
import './style.css';
import ArtistPR from '../../components/artist_pr/ArtistPR';
//firebase
import database from '../../database';


export default class PrSite extends Component {

  constructor(props) {
    super(props);
    this.state = {
      artists: []

    };
    //this.handleChange = this.handleChange.bind(this);
    //this.handleSubmit = this.handleSubmit.bind(this);
    this.database = database;
 }

 componentWillMount() {
   var previousArtists = this.state.artists;

   database.ref('festival17').child('artists').on('child_added', artistSnapshot => {
     var val = artistSnapshot.val();
     previousArtists.push({
       name: val.name,
       contact_info: val.contact_info,
       sales_number: val.sales_number,
     })
     this.setState({
       artists: previousArtists,
     })
   })



   //console.log(this.state.artists)
}

/*
handleChange(e) {
  this.setState({
    //artist_name: event.target.artist_name,
    //tech_spec: event.target.tech_spec,
    //rider: event.target.rider
      [e.target.name]: e.target.value
    }
  );
}
*/
/*handleSubmit(event) {
  console.log("hei")
  event.preventDefault();
  const concertsRef = database.ref('festival17').child('concerts');
  const data = {
    tech_spec : this.state.tech_spec,
    rider : this.state.rider
  }

  concertsRef.child(this.state.artist_name).update(data);

  var previousArtistName = this.state.artist_name;

  this.setState({
    artist_name : previousArtistName,
    tech_spec : '',
    rider : ''
    })
  }
*/

render() {
  console.log(this.state.artists)
  return (
    <div className="App">
    <NavComponent />
    <h1>Artist Info</h1>
    <div className="artistBody">
    {
      this.state.artists.map((artist) => {
        console.log(artist)
        return(
          <ArtistPR name={artist.name} contact_info={artist.contact_info} sales_number={artist.sales_number}/>
        )
      })
    }
    </div>
    </div>
  )
}
}
