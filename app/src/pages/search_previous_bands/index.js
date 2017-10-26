import React, { Component } from 'react';
import NavComponent from '../../components/navbar/navbar';
import './style.css';
import database from '../../database';


export default class SearchPreviousBand extends Component {
    constructor() {
        console.log("heiigjeje");
        super();
        this.state = {
            previousBands: [],
            newScense: []
        };

        this.onSceneChange = this.onSceneChange.bind(this);

    };    

    onSceneChange(e) {
        
        this.setState({
            scene: e.target.value,
        })

    }

    componentWillMount() { 

        var bands = []
        var scense = []

        var ref = database.ref();
        ref.on("value", snapshot => {
            console.log("hei");
            console.log(snapshot.val());

            // henter alle festivalene med nøkler, og samler de i en liste
            let festivalKeys = Object.keys(snapshot.val());
            for (let i = 0; i < festivalKeys.length; i++) {
                if (festivalKeys[i] == "festival15" || festivalKeys[i] == "festival16") {
                    console.log("festival15");
                
                    let snapshot2 = snapshot.child([festivalKeys[i]]);
                
                    //henter inn alle konsertene med nøkler, og samler de i en ny liste
                    let concertKeys = Object.keys(snapshot2.val());
                    for (let j = 0; j < concertKeys.length; j++) {
                        if (concertKeys[j] == "concerts") {
                            let snapshot3= snapshot2.child(concertKeys[j]);
                            let bandKeys = Object.keys(snapshot3.val());
                            console.log(snapshot3.val());

                            for (var n = 0; n < bandKeys.length; n++) {
                                bands.push(snapshot3.val()[bandKeys[n]]);
                            }
                            console.log(bands);

                        } else if (concertKeys[j] == "scenes") {
                            let snapshot4 = snapshot2.child(concertKeys[j]);
                            let sceneKeys = Object.keys(snapshot4.val());
                            
                            console.log(snapshot4.val());
                            for (var k = 0; k < sceneKeys.length; k++) {
                                console.log(sceneKeys[k]);
                                if (!scense.includes(sceneKeys[k])) {
                                    //scense.push(snapshot4.val()[sceneKeys[k]].location)
                                    scense.push(sceneKeys[k])
                                }
                                
                            }
                        }
                }
            }
        } console.log(scense);
        this.setState({newScense: scense, previousBands: bands, scene: scense[0]})
    })}

    




    render(){
        return(
            <div className = "App">
                <NavComponent/>

                <p>Her kan du få en oversikt over band som har spilt på tidligere festivaler.</p>

                <select onChange={this.onSceneChange}>
                    {this.state.newScense
                        .map(e => <option value={e}>{e}</option>)  
                    }
                </select>

                {this.state.previousBands
                .filter(e => this.state.scene === e.scene)
                .map(e => <p>
                    {e.name}
                </p>)}

            </div>
        )
    }
}
