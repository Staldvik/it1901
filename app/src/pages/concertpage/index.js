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
      currentNameInput: ""
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount() {




  }

  handleChange(e) {
    this.setState({
      currentNameInput: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const concertsRef = database.child('concerts');
    const data = {
      name: this.state.currentNameInput
    }
    concertsRef.push(data);
    this.setState({
      currentNameInput: ''
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
          <input name="name" placeholder="Name" value={this.state.currentNameInput} onChange={this.handleChange}/>
          <input placeholder="Genre"/>
          <input placeholder="Price"/>
          <button onClick={this.handleSubmit}> Pushit</button>
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