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

   constructor(props) {
        super(props);
        this.state = {
            selectedFestival:""
        }
        this.enter = this.enter.bind(this)
    }

    enter(festival){
        console.log("entered", festival);

        this.setState({
          selectedFestival: festival,
        })
    }


  render() {
    return (
    <div className="App">
     
     <h3>Create new festival:</h3>
     <form><CreateFestival/></form>
     
     <h3>All festivals:</h3>
     <AllFestivals enter={this.enter}/>
     


     

     
    
     
      
        

      
    </div>
    );
  }
}

export default App;
