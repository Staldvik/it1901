import React, {Component } from 'react'
import Scene from "../scene/Scene"
import './dag.css';

export default class Festival extends Component {

    constructor(props) {
        super(props);
        this.state = { //Kommentarer er tenkt datatype fra objektdiagrammet
            for scene in Scene: //Liste med scener.. itere over?
            this.props.name = name //String navn på festival
            this.props.total_days = totaldays//antall dager
        }
    }

    renderList(){
      //return this.props.scenes.map(scene) => {
      //  return (
      //    <li key=(scene.name) className="list-group-item"> {scene.title} </li>
      //  )
      //}
      var scenes = Object.keys(Scene).map(function(s){return Scene[s].name});
      return scenes
    }

    render() {
        return (
            <div className = "slotDiv">
              <ul className="list-group col-sm-4"
                {this.renderList()}
              </ul>
            </div>
        )
    }

    }
}
