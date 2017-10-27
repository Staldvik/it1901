import React, { Component } from 'react';
import './frontpage.css';

import Festival from '../../components/festival/Festival'
import AllFestivals from '../../components/allfestivals/AllFestivals'
import CreateFestival from '../../components/createfestival/CreateFestival'

import database from '../../database'

export default class FrontPage extends Component {

   constructor(props) {
        super(props);
        this.state = {
            selectedFestival:""
        }
        this.enter = this.enter.bind(this)
    }

    enter(festival,name){
      this.props.enter(festival,name)
    }


  render() {
    return (
    <div className="App">
     
      <h3>Create new festival:</h3>
      <form><CreateFestival/></form>
      
      <h3>All festivals:</h3>
      <AllFestivals enter={this.enter}/>
     </div>
     )}

}