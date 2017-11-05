import React, { Component } from 'react';

import './style.css';
import Concert from '../../components/concert/Concert'

//firebase
import database from '../../database'

export default class HomePage extends Component {
  // static propTypes = {}
  // static defaultProps = {}

  constructor() {
    super();

    this.state = {
    }
  }

  render() {
    return (
      <div>
        <h1>HomePage</h1>
        <h1>HomePage</h1>
        <h1>HomePage</h1>
        <h1>HomePage</h1>
      </div>
    );
  }
}
