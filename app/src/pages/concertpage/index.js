import React, { Component } from 'react';
import NavComponent from '../../components/navbar/navbar'
import logo from '../../uka.png'
import './style.css';
import Concert from '../../components/concert/Concert'

//firebase
import db from '../../db'

export default class ConcertPage extends Component {
  // static propTypes = {}
  // static defaultProps = {}

  constructor() {
    super();

    this.state = {
      concerts: [
        {}
      ]
    }

    var ref = db.ref();
  }

  gotData(data) {

  }

  pushData(name, genre, price) {
    var data = {
      name: name,
      genre: genre,
      price: price
    }
    this.ref.push(data);
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Arrangørsoftware for </h2>
          <NavComponent />
        </div>
        <h1>
          Concerts
        </h1>
        <form>
          <input placeholder="Name"/>
          <input placeholder="Genre"/>
          <input placeholder="Price"/>
          <button onClick={this.pushData}>Pushit</button>
        </form>
        <p> This is just to test showing all concerts stored in database </p>
        <div className="concertsBody"> {
          // Går gjennom alle konsertene den finner i concerts-arrayet og returnerer en ny Concert-component fra hver av disse.
          this.state.concerts.map((concert) => {
            return (
              <Concert price={concert.price} sales={concert.sales} key={concert.id} />
            )
          })
        }</div>
      </div>
    );
  }
}