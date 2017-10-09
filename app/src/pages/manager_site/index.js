import React, { Component } from 'react';
import NavComponent from '../../components/navbar/navbar';
import './style.css';
//firebase
import database from '../../database';


export default class ManagerSite extends Component {

  constructor(props) {
    super(props);
    this.state = {
      concerts: [],
      artist_name: '',
      tech_spec: '',
      rider: ''

    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.database = database;
 }

 componentWillMount() {
   var previousConcerts = this.state.concerts;
   database.ref('festival17').child('concerts').on('child_added', concertSnapshot => {
     var vals = concertSnapshot.val();
     previousConcerts.push({
       name : vals.name,
       key : concertSnapshot.key

       //tech_spec : vals.tech_spec,
       //rider : vals.rider
     })
  this.setState({
    concerts: previousConcerts,
    artist_name: '',
    tech_spec: '',
    rider: ''
  })
})
}


handleChange(e) {
  this.setState({
    //artist_name: event.target.artist_name,
    //tech_spec: event.target.tech_spec,
    //rider: event.target.rider
      [e.target.name]: e.target.value
    }
  );
}

handleSubmit(event) {
  console.log("hei")
  event.preventDefault();
  const concertsRef = database.ref('festival17').child('concerts');
  const data = {
    tech_spec : this.state.tech_spec,
    rider : this.state.rider
  }
  for (var i = 0; i < this.state.concerts.length; i++){
    console.log("heisann hoppsann")
    if (this.state.artist_name.toLowerCase() === this.state.concerts[i].name.toLowerCase()){
      console.log("den kjøres");
      concertsRef.child(this.state.concerts[i].key).update(data);
    }
}

  this.setState({
    artist_name : '',
    tech_spec : '',
    rider : ''
    })
  }


render() {
  return (
    <div className="App">
    <NavComponent />
    <div className="form-style">
    <form>
      <label>
        Artist:
        <input name="artist_name" type="text" value={this.state.artist_name} onChange={this.handleChange} />
      </label>
      <label>
        Technical Specifications:
        <input name="tech_spec" type="text" value={this.state.tech_spec} onChange={this.handleChange} />
      </label>
      <label>
        Rider:
        <input name="rider" type="text" value={this.state.rider} onChange={this.handleChange} />
      </label>
      <button onClick={this.handleSubmit}> Submit </button>
    </form>
    </div>
    </div>
  );
}
}
