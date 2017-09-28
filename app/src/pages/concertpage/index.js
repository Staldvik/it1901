import React, { Component } from 'react';
import NavComponent from '../../components/navbar/navbar'
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
      concerts: []
    }

    const concertRef = db.child('concerts');
  }

  componentWillMount() {
    db.on('child_added', snap => {
      this.state.concerts.push({
        name: snap.val().name,
        price: snap.val().price,
        sales: snap.val().sales
      })
    })
  }

  gotData(data) {

  }

  pushData(name, genre, price) {
    var data = {
      name: name,
      genre: genre,
      price: price
    }
    db.child('concerts').push(data);
  }

  render() {
    return (
      <div className="App">
        <NavComponent />
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