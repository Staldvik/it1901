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


 }


render() {
  return (
    <div className="App">
    <NavComponent />
    <h1>Artist Info</h1>
    <div className="artistBody">
    {
      this.state.artists.map((artist) => {
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
