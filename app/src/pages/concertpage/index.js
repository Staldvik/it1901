import React, { Component } from 'react';

import './style.css';
import Concert from '../../components/concert/Concert'

//firebase
import database from '../../database'

export default class ConcertPage extends Component {
  // static propTypes = {}
  // static defaultProps = {}

  constructor() {
    super();

    this.state = {
      concerts: [],
      opts: [<option value="showAll" key="showAll"> show all </option>],
      selectedTech: "showAll",
    }

    this.handleChange = this.handleChange.bind(this);

  }

  componentWillMount() {
    var previousConcerts = this.state.concerts;
    var previousOpts = this.state.opts;
    var previousSelectedTech = this.state.selectedTech;

    database.ref(this.props.state.festival).child('concerts').orderByChild('day').on('child_added', concertSnapshot => {
      var vals = concertSnapshot.val();
      var prevTechnicianNames = [];
      concertSnapshot.child('technicians').forEach((technician) => {
        prevTechnicianNames.push("ID " + technician.key + ": " + technician.val().name)
      })
      previousConcerts.push({
        name: vals.name,
        genre: vals.genre,
        price: vals.price,
        day: vals.day,
        key: concertSnapshot.key,
        technicians: vals.technicians,
        technicianNames: prevTechnicianNames,
        technicalInfo: vals.technicalInfo,
      })
    })

    database.ref(this.props.state.festival).child('technicians').orderByChild('ID').on('child_added', technicianSnapshot => {
      previousOpts.push(
        <option key={technicianSnapshot.key} value={technicianSnapshot.key}> {"ID "+technicianSnapshot.key+": " + technicianSnapshot.val().name} </option>
      )
      this.setState({
        concerts: previousConcerts,
        opts: previousOpts,
        selectedTech: previousSelectedTech,
      })
    })
  }


  handleChange(e) {
    var previousConcerts = this.state.concerts;
    var previousOpts = this.state.opts;

    this.setState({
      concerts: previousConcerts,
      opts: previousOpts,
      selectedTech: e.target.value,
    })
    console.log("Selected tech set to: " + e.target.value)
  }

  render() {
    return (
      <main role="main">

      <section class="jumbotron text-center">
        <div class="container">
          <h1 class="jumbotron-heading">Album example</h1>
          <p class="lead text-muted">Something short and leading about the collection below—its contents, the creator, etc. Make it short and sweet, but not too short so folks don't simply skip over it entirely.</p>
          <p>
            <a href="#" class="btn btn-primary">Main call to action</a>
            <a href="#" class="btn btn-secondary">Secondary action</a>
          </p>
        </div>
      </section>

      <div class="album text-muted">
        <div class="container">

          <div class="row">
            <div class="card">
              <img data-src="holder.js/100px280?theme=thumb" alt="Card image cap"/>
              <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
            </div>
            <div class="card">
              <img data-src="holder.js/100px280?theme=thumb" alt="Card image cap"/>
              <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
            </div>
            <div class="card">
              <img data-src="holder.js/100px280?theme=thumb" alt="Card image cap"/>
              <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
            </div>

            <div class="card">
              <img data-src="holder.js/100px280?theme=thumb" alt="Card image cap"/>
              <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
            </div>
            <div class="card">
              <img data-src="holder.js/100px280?theme=thumb" alt="Card image cap"/>
              <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
            </div>
            <div class="card">
              <img data-src="holder.js/100px280?theme=thumb" alt="Card image cap"/>
              <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
            </div>

            <div class="card">
              <img data-src="holder.js/100px280?theme=thumb" alt="Card image cap"/>
              <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
            </div>
            <div class="card">
              <img data-src="holder.js/100px280?theme=thumb" alt="Card image cap"/>
              <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
            </div>
            <div class="card">
              <img data-src="holder.js/100px280?theme=thumb" alt="Card image cap"/>
              <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
            </div>
          </div>

        </div>
      </div>

    </main>
    );
  }
}
