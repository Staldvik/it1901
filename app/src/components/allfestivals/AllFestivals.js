import React, {Component } from 'react'
import './allfestivals.css';

import database from '../../database' //firebase

import Festival from '../../components/festival/Festival'

export default class AllFestivals extends Component {

    constructor(props) {
        super(props);
        this.state = {
            festivals: [],
            selectedFestival:""
        }

        this.enter = this.enter.bind(this)
    }

    enter(festival,name){
        this.props.enter(festival,name)
    }


    componentWillMount(){
        let previousFestivals = this.state.festivals;

        database.ref().on('child_added', snap => {
            if (snap.val().name){ //only render the festivals, do this by checking if it has name object in database
                previousFestivals.push({
                    id: snap.key,
                    name: snap.val().name,
                })
            }

            this.setState({
                festivals: previousFestivals,
            })
        })
    }


    render() {
        return (
            <div id="festivalButtons">
               {this.state.festivals.map((festival) => {
                    return(<Festival enter={this.enter} festival={festival.id} name={festival.name}/>)
                })}
             </div>
        )
    }


}