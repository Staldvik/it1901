import React, { Component } from 'react';

import './style.css';
import ProgramDays from '../../components/programdays/ProgramDays'
import ProgramSlots from '../../components/programslots/ProgramSlots'

//firebase
import database from '../../database'

// React Router
import {Redirect} from 'react-router-dom';

export default class HomePage extends Component {
  // static propTypes = {}
  // static defaultProps = {}

  constructor(props) {
    super(props);

   
    this.state = {
      days: [],
    }
  }

  componentWillMount() {
    var prevDays = this.state.days;
    
        database.ref(this.props.state.festival).child('program').on('child_added', snap => {
          var vals = snap.val();
    
          prevDays.push({
            id: snap.key,
            date:vals.date,
          })
    
          this.setState({
            days: prevDays,
          })
        })

    


  }

  render() {

    if (this.state.days.length === 0) {
      return (
        <div id="frontPage">
          <h1>Program</h1>
      
          <p> Theres nothing to see here yet! </p>
          <p> Head over to Setup to configure this festival.</p>
        </div>
      )
    }


    return (
      <div id="frontPage">
  
        
        <table className="programTable">
          <thead>
                <tr>
                  {this.state.days.map((day) => {
                        return(<ProgramDays date={day.date}/>)
                      })
                  } 
                </tr>
          </thead>
          
          <tbody>
            <tr>
                  {this.state.days.map((day) => {
                        return(<td id="programRow"> 
                          <ProgramSlots festival={this.props.state.festival} date={day.id}/>
                          </td>  )
                      })
                  } 
            </tr>


          </tbody>
                    
        </table>
        
      </div>
    );
  }
}
