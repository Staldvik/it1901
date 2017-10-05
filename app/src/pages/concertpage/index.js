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

    database.ref('festival17').child('concerts').on('child_added', concertSnapshot => {
      var vals = concertSnapshot.val();
      previousConcerts.push({
        name: vals.name,
        genre: vals.genre,
        price: vals.price,
        day: vals.day,
        key: concertSnapshot.key
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
    const concertsRef = database.ref('festival17').child('concerts');
    const data = {
      name: this.state.currentNameInput,
      genre: this.state.currentGenreInput,
      price: this.state.currentPriceInput,
      day: this.state.currentDayInput
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