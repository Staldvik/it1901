import React, { Component } from 'react';
import './App.css';
import NavComponent from './components/navbar/navbar'
import CreateFestival from './components/createfestival/createfestival'
import Festival from './components/festival/Festival'
import AllFestivals from './components/allfestivals/AllFestivals'
import AdminPage from './pages/adminpage/index.js'
// Firebase
import database, {firebaseApp} from './database';

class App extends Component {

  render() {
    return (
    <div className="App">
      
    
     
     <h3>Create new festival:</h3>
     <form><CreateFestival/></form>
     
     <h3>All festivals:</h3>
     <AllFestivals/>
     


     

     
    
     
      
        

      
    </div>
    );
  }
}

export default App;
