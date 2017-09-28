import React, { Component } from 'react';
import './App.css';
import Artist from './components/artist/Artist'
import Concert from './components/concert/Concert'
import Technician from './components/technician/Technician'
import Scene from './components/scene/Scene'

// Prøver å lage navbar
import NavComponent from './components/navbar/navbar';

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
        <NavComponent />
        <p className="App-intro">
          Hver div er en component
        </p>

        <Artist name="Kygo" age={26} info="Kyrre Gørvell-Dahll, bedre kjent under artistnavnet Kygo, er en EDM-musiker fra Fana i Bergen i Hordaland.
        Han ble kjent gjennom nettstedene YouTube og SoundCloud, der han publiserer sin musikk som samlet har over 400 millioner treff." popularity={10} albumSales={400} cost={50000} earlierConcerts={["test1", "test2"]}
        />

        <Concert price={300} sales={150} genre="Rock" />

        <Technician name="Tekniker1" concerts={["test1", "test2", "test3"]} />

        <Scene name="Dødens Dal" capacity={1000} cost={7500} />

      </div>
    );
  }
}

export default App;
