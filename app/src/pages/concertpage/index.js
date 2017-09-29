import React, { Component } from 'react';
import NavComponent from '../../components/navbar/navbar'
import './style.css';
import Concert from '../../components/concert/Concert'

//firebase
import database from '../../database'

export default class ConcertPage extends Component {
  // static propTypes = {}
  // static defaultProps = {}

  constructor() {
    super();

    this.state = {
      concerts: [],
      currentNameInput: "",
      currentGenreInput: "",
      currentPriceInput: 0,
      currentDayInput: "day1",

    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.database = database;
  }

  componentWillMount() {
    var previousConcerts = this.state.concerts;    

    database.ref().child('festival').on('child_added', daySnapshot => {
      console.log(daySnapshot.key);
      daySnapshot.child('concerts').forEach(concertSnapshot => {
        console.log(concertSnapshot.val().name);
        var vals = concertSnapshot.val();
        previousConcerts.push({
          name: vals.name,
          genre: vals.genre,
          price: vals.price,
          day: concertSnapshot.ref.parent.parent.key,
          key: concertSnapshot.key
        })
      })
      this.setState({
        concerts: previousConcerts,
        currentNameInput: "",
        currentGenreInput: "",
        currentPriceInput: 0,
        currentDayInput: "day1",
      })
    })

  }



  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const concertsRef = database.ref().child('festival').child(this.state.currentDayInput).child('concerts');
    const data = {
      name: this.state.currentNameInput,
      genre: this.state.currentGenreInput,
      price: this.state.currentPriceInput
    }

    if ((data.name.length < 1) || (data.genre.length < 3)) {
      alert("HELLO, NEED MORE INFO");
    } else {
      concertsRef.push(data);
      this.setState({
        currentNameInput: '',
        currentGenreInput: '',
        currentPriceInput: 0,
        currentDayInput: 0
      })
    }    
  }

  render() {
    return (
      <div className="App">
        <NavComponent />
        <h1>
          Concerts
        </h1>
        <form>
          <input type="text" name="currentNameInput" placeholder="Name" value={this.state.currentNameInput} onChange={this.handleChange}/>
          <input type="text" name="currentGenreInput" placeholder="Genre" value={this.state.currentGenreInput} onChange={this.handleChange}/>
          <input type="number" name="currentPriceInput" placeholder="Price" value={this.state.currentPriceInput} onChange={this.handleChange}/>
          <select name="currentDayInput" onChange={this.handleChange}>
            <option value="day1">Dag 1</option>
            <option value="day2">Dag 2</option>
            <option value="day3">Dag 3</option>
            <option value="day4">Dag 4</option>
            <option value="day5">Dag 5</option>
            <option value="day6">Dag 6</option>
            <option value="day7">Dag 7</option>
          </select>
          <button onClick={this.handleSubmit}> Pushit</button>
        </form>
        <p> This is just to test showing all concerts stored in database </p>
        <div className="concertsBody"> 
          {
            // Går gjennom alle konsertene den finner i concerts-arrayet og returnerer en ny Concert-component fra hver av disse.
            this.state.concerts.map((concert) => {
              return (
                <Concert name={concert.name} price={concert.price} sales={concert.sales} genre={concert.genre} key={concert.key} day={concert.day}/>
              )
            })
          }
        </div>
      </div>
    );
  }
}