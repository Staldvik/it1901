import React, { Component } from 'react';
import NavComponent from '../../components/navbar/navbar'
import './style.css';
import database from '../../database';
import Concert from '../../components/concert/Concert';
import Technician from '../../components/technician/Technician'

export default class PreviousBands extends Component {
  // static propTypes = {}
  // static defaultProps = {}
  // state = {}






   /*  return database.ref('festival').once('value').then(festivalSnapshot => {
      return festivalSnapshot.forEach(daySnapshot => {
        return daySnapshot.child('concerts').forEach(concertSnapshot => {
          if (concertSnapshot.val()[query] == value) {
            this.matches.push(concertSnapshot);
            console.log(this.matches);
          }
        })
      })
    }) */
    render(){
      return(
        <div className="app">
          <NavComponent/>

          <h1> TeknikerTest </h1>
        </div>
      )
    }
}
