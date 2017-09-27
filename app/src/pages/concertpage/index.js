import React, { Component } from 'react';
import NavComponent from '../../components/navbar/navbar'
import logo from '../../uka.png'
import './style.css';
import * as firebase from 'firebase';
import Concert from '../../components/concert/Concert'

export default class ConcertPage extends Component {
  // static propTypes = {}
  // static defaultProps = {}
  // state = {}
  constructor() {
    super();
    this.state = {
      concerts: [
        {id: 1, price: 100, sales: 10, genre: "rock", },
        {id: 1, price: 100, sales: 10, genre: "rock", }
      ]
    }
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
        <p> This is just to test showing all concerts stored in database </p>
        <div className="concertsBody"> {
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