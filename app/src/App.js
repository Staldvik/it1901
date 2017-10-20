import React, { Component } from 'react';
import './App.css';
import Artist from './components/artist/Artist'
import Concert from './components/concert/Concert'
import Technician from './components/technician/Technician'
import Scene from './components/scene/Scene'

// Prøver å lage navbar
import NavComponent from './components/navbar/navbar';

// Firebase
import database, {firebaseApp} from './database';

class App extends Component {

  render() {
    return (
    <div className="App">
      <nav>
        <NavComponent />
      </nav>
        

      
      </div>
    );
  }
}

export default App;
