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
      currentDateInput: 0
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.database = database;
  }

  componentWillMount() {
    const previousConcerts = this.state.concerts;

    this.database.child('concerts').on('child_added', snap => {
      if (snap.val().childtest) {
        console.log(snap.val().childtest.ticketsales)
      }
      previousConcerts.push({
        id: snap.key,
        name: snap.val().name,
        price: snap.val().price,
        genre: snap.val().genre
      })

      this.setState({
        concerts: previousConcerts
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
    const concertsRef = database.child(this.state.currentDateInput).child('concerts');
    const data = {
      name: this.state.currentNameInput,
      genre: this.state.currentGenreInput,
      price: this.state.currentPriceInput

    }
    concertsRef.push(data);
    this.setState({
      currentNameInput: '',
      currentGenreInput: '',
      currentPriceInput: 0
    })
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
          <input type="date" name="currentDateInput" placeholder="20/07/2017" valye={this.state.currentDayInput} onChange={this.handleChange}/>
          <button onClick={this.handleSubmit}> Pushit</button>
        </form>
        <p> This is just to test showing all concerts stored in database </p>
        <div className="concertsBody"> {
          // Går gjennom alle konsertene den finner i concerts-arrayet og returnerer en ny Concert-component fra hver av disse.
          this.state.concerts.map((concert) => {
            return (
              <Concert name={concert.name} price={concert.price} sales={concert.sales} genre={concert.genre} key={concert.id} />
            )
          })
        }</div>
      </div>
    );
  }
}