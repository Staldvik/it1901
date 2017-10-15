import React, { Component } from 'react';
import NavComponent from '../../components/navbar/navbar'
import './style.css';
import database from '../../database'

export default class BandBooking extends Component {
  // static propTypes = {}
  // static defaultProps = {}
  // state = {}

  constructor(props) {
    super(props);

    this.state = {
      //
      currentArtistNameInput: "",
      currentPriceInput: "",
      currentConcertDayInput: "day1",
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmitRequest = this.handleSubmitRequest.bind(this);
  }

  //kjøres når siden/komponenten lastes
  // componentWillMount() {
  //   var previousArtistName = "",
  //   var previousArtistPriceInput: "",
  //   var previousConcertDayInput: "",
  //
  //   database.ref('festival17').once('value', festivalSnapshot => {
  //
  //     this.setState({
  //       ArtistName = previousArtistName,
  //     })
  //
  //   })
  //
  // }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmitRequest(e) {
    e.preventDefault(); //prevents page from reloading
    console.log(this.state.currentArtistNameInput);

    var data = {
      artist: this.state.currentArtistNameInput,
      price: this.state.currentPriceInput,
      day: this.state.currentConcertDayInput,
    }

    database.ref("festival17").child("requests").push(data)

  }

  render() {
    return (
      <div className="App">
        <NavComponent />
        <h1>
          Band Booking
        </h1>
        {/*Sendes videre til bookingsjef for godkjenning.*/}
        <form>
        <h2> Her kan du sende tilbud til manager for et band om de vil spille. </h2>
        <input name="currentArtistNameInput" value={this.state.currentArtistNameInput} onChange={this.handleChange} placeholder="artist"/>
        <input name="currentPriceInput" type="number" value={this.state.currentPriceInput} onChange={this.handleChange} placeholder="price" />
        <select name="currentConcertDayInput" id="day" value={this.state.currentConcertDayInput} onChange={this.handleChange}>
          <option value="day1">Dag 1</option>
          <option value="day2">Dag 2</option>
          <option value="day3">Dag 3</option>
          <option value="day4">Dag 4</option>
          <option value="day5">Dag 5</option>
          <option value="day6">Dag 6</option>
          <option value="day7">Dag 7</option>
        </select>
        <button onClick={this.handleSubmitRequest}>Send forespørsel</button>
        </form>

      </div>
    );
    }
}
