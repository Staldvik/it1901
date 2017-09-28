import React, {Component } from 'react'
import Scene from "../scene/Scene"
import './dag.css';

//firebase
import database from '../../database'

export default class Festival extends Component {

    constructor(props) {
        super(props);
        this.state = { //Kommentarer er tenkt datatype fra objektdiagrammet
            scenes = []
            this.state.name = name
            this.state.total_days = total_days
        }
        this.database = database;
    }

    componentWillMount(){
      const previousScenes = this.state.scenes;

      this.database.child('scenes').on('child_added', snap => {
        previousScenes.push({
          id: snap.key,
          name: snap.val().name,
        })

        this.setState({
          scenes: previousScenes
        })
      })

    }

    render() {
        return (
        //    <div className = "slotDiv">
        //      <ul className="list-group col-sm-4"
        //        {this.renderList()}
        //      </ul>
        // </div>
        <div className="scenesBody"> {
          // Går gjennom alle konsertene den finner i concerts-arrayet og returnerer en ny Concert-component fra hver av disse.
          this.state.scenes.map((scene) => {
            return (
              <Scene name={scene.name} capacity={scene.capacity} cost={scene.cost} />
            )
          })
        }</div>
        )
    }

    }
}
