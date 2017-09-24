import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Artist from './Artist/Artist'

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
        <Artist name="Kygo" age={26} info="Kyrre Gørvell-Dahll, bedre kjent under artistnavnet Kygo, er en EDM-musiker fra Fana i Bergen i Hordaland. 
        Han ble kjent gjennom nettstedene YouTube og SoundCloud, der han publiserer sin musikk som samlet har over 400 millioner treff." popularity={10} albumSales={400} earlierConcerts={["test1", "test2"]}
        />
      </div>
    );
  }
}

export default App;
