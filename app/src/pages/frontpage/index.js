import React, { Component } from 'react';
import './frontpage.css';

import Festival from '../../components/festival/Festival'
import AllFestivals from '../../components/allfestivals/AllFestivals'
import CreateFestival from '../../components/createfestival/CreateFestival'

import database from '../../database'

/**
 * Component used to render the Front Page
 */
export default class FrontPage extends Component {

   constructor(props) {
        super(props);
        this.state = {
            selectedFestival:""
        }
        this.enter = this.enter.bind(this)
        this.create = this.create.bind(this)
    }

    /**
     * Passes the festival key and name to the enter function one layer up
     * @param {firebase.database.Reference.key} festival 
     * @param {String} name 
     */
    enter(festival,name){
      this.props.enter(festival,name)
    }

    /**
     * Creates a new festival in the database
     * @param {String} name 
     */
    create(name){
      database.ref().push( //creating the strucuture of the database.
        {name:name})
    }

  
  /**
   * Renders the page
   */
  render() {
    return (
    <div className="App">
     
    
      <CreateFestival create={this.create}/>
      
      <AllFestivals enter={this.enter}/>


     </div>
     )}

}