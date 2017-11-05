import React, { Component } from 'react';

import './style.css';
import ProgramDays from '../../components/programdays/ProgramDays'

//firebase
import database from '../../database'

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
    return (
      <div id="frontPage">
        <h1>Program</h1>
        
        <table>
          <thead>
                <tr>
                  {this.state.days.map((day) => {
                        return(<ProgramDays date={day.date}/>)
                      })
                  } 
                </tr>
          </thead>
          
          <tbody>
                  {this.state.days.map((day) => {
                        return(<tr> 
                          <td>
                          </td>
                          <td>
                          </td>
                          <td>
                          </td>
                          <td>
                          </td>
                          <td>
                          </td>
                          </tr> )
                      })
                  } 
                
               
            

          </tbody>
                    
        </table>
        
      </div>
    );
  }
}
