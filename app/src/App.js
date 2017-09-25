import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Artist from './Artist/Artist'
import Concert from './Concert/Concert'

class App extends Component {
  constructor(){
    super();
    this.state = {
      prosjekt: "[Min Festival]",
    }
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Arrangørsoftware for  {this.state.prosjekt}</h2>
        </div>
        <p className="App-intro">
          Hver div er en component
        </p>
        
        <Artist name="Kygo" age={26} info="Kyrre Gørvell-Dahll, bedre kjent under artistnavnet Kygo, er en EDM-musiker fra Fana i Bergen i Hordaland. 
        Han ble kjent gjennom nettstedene YouTube og SoundCloud, der han publiserer sin musikk som samlet har over 400 millioner treff." popularity={10} albumSales={400} earlierConcerts={["test1", "test2"]}
        />
        
        <Concert price={300} sales={150}
        />
        
      </div>
    );
  }
}

export default App;
