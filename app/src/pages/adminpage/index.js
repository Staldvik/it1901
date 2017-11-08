import React, { Component } from 'react';


import './style.css';


//Firebase
import database from '../../database'
//region
export default class AdminPage extends Component {
//endregion
  constructor(props) {
    super(props);
   

    this.state = {
      
      // User form
      selectedRole: "",
      selectedUser: "",
      userOptions: [],
      roleOptions: [
        <option value="admin" key="admin">admin</option>,
        <option value="servering" key="servering">servering</option>,
        <option value="band" key="band">band</option>,
        <option value="booking-responsible" key="bookingansvarlig">bookingansvarlig</option>,
        <option value="booking-manager" key="bookingsjef">bookingsjef</option>,
        <option value="tekniker" key="tekniker">tekniker</option>,
        <option value="manager" key="manager">manager</option>,
        <option value="pr-ansvarlig" key="pr-ansvarlig">pr-ansvarlig</option>
      ]
    }



    this.match = "";
    this.handleChange = this.handleChange.bind(this);
    
    this.pushRole = this.pushRole.bind(this);
  }

  componentWillMount() {
    var previousUserOptions = this.state.userOptions;


    database.ref('users').on('child_added', user => {
      console.log(user.key)
      previousUserOptions.push(
        <option value={user.key} key={user.key}>{ user.val().displayName } </option>
      )
      this.setState({userOptions: previousUserOptions})
    })
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }



 

  

  pushRole(e) {
    e.preventDefault();

    if (this.state.selectedRole === "booking-responsible" || this.state.selectedRole === "booking-manager") {
      database.ref('users').child(this.state.selectedUser).child("roles").update({
        [this.state.selectedRole]: true,
        "booking": true,
      })
    } else {
      database.ref('users').child(this.state.selectedUser).child("roles").update({
        [this.state.selectedRole]: true
      })
    }
    
  }

  




  render() {
    return (
      <div className="App">
      
       

        <form>
          <h3> Give user permission </h3>
          <select name="selectedUser" onChange={this.handleChange} value={this.state.selectedUser}>
            {this.state.userOptions}
          </select>
          <select name="selectedRole" onChange={this.handleChange} value={this.state.selectedRole}>
            {this.state.roleOptions}
          </select>
          <button onClick={this.pushRole}>Submit</button>
        </form>
      </div>
    );
  }
}
