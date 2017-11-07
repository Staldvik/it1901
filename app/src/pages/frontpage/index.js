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
        this.create = this.create.bind(this)
    }

    enter(festival,name){
      this.props.enter(festival,name)
    }

    create(name){
      database.ref().push( //creating the strucuture of the database.
        {name:name})
    }


  render() {
    return (
    <div className="App">
     
      <h2>Festival Organizer</h2>
      <CreateFestival create={this.create}/>
      
      <h3>Existing Festivals</h3>
      <AllFestivals enter={this.enter}/>


     </div>
     )}

}