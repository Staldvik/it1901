import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(){
    super();
    this.state = {
      prosjekt: "festival"
    }
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to IT1901 {this.state.prosjekt}</h2>
        </div>
        <p className="App-intro">
          Hello World
          Hello Hello
        </p>
      </div>
    );
  }
}

export default App;
