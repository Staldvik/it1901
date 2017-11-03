import React, { Component } from 'react';

import './style.css';
import Concert from '../../components/concert/Concert'
import template from '../../static/img/defaultArtistPic.jpg'

//firebase
import database from '../../database'

//Accordion
import {Accordion, AccordionItem} from 'react-sanfona';

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
      <div>

        <section className="jumbotron text-center">
          <div className="container">
            <h1 className="jumbotron-heading">Konserter</h1>
            <p className="lead text-muted">Her kan man filtrere konsertene etter tekniker</p>
            <p>
              <a href="#" className="btn btn-primary">Dette kan være en dropdown</a>
              <a href="#" className="btn btn-secondary">Dette kan være noe annet</a>
            </p>
          </div>
        </section>

        {/* <Accordion>
          {
            this.state.concerts.map(concert => {
              return (
                <AccordionItem title={`Concert "+concert.name}`} className="react-sanfona-item">
                  <div>
                    {`Item "+concert} content`}
                  </div>
                </AccordionItem>
              )
            })
          }

        </Accordion> */}
        




        <div id="accordion" role="tablist">
          {
            this.state.concerts.map((concert, concertNum) => {
              console.log("heading"+concertNum, concertNum)
              return(
                <div className="card" key={concert.key}>
                  <div className="card-header" role="tab" id={"heading"+concertNum}>
                    <h5 className="mb-0">
                      <a data-toggle="collapse" href={"#collapse"+concertNum} aria-expanded="false" aria-controls={"collapse"+concertNum}>
                        {concert.name}
                      </a>
                    </h5>
                  </div>
              
                  <div id={"collapse"+concertNum} className="collapse" role="tabpanel" aria-labelledby={"heading"+concertNum}>
                    <div className="card-body">
                      Hello
                    </div>
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
    );
  }
}
