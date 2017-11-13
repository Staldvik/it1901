import React, {Component } from 'react'
import './allfestivals.css';

import database from '../../database' //firebase

import Festival from '../../components/festival/Festival'

/**
 * Component used to load all festivals from database
 */
export default class AllFestivals extends Component {

    /**
     * Initializes state
     */
    constructor(props) {
        super(props);
        this.state = {
            festivals: [],
            selectedFestival:""
        }

        this.enter = this.enter.bind(this)
    }

    /**
     * 
     * @param {firebase.database.Reference.key} festival 
     * @param {String} name 
     */
    enter(festival,name){
        this.props.enter(festival,name)
    }

    /**
     * Standard React function, runs before component renders.
     * Using componentDidMount() instead is recommended.
     */
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

    /**
     * Renders list of festivals found in database
     */
    render() {
        return (
            <div id="festivalButtons">
               {this.state.festivals.map((festival) => {
                    return(<Festival enter={this.enter} festival={festival.id} name={festival.name} key={festival.id}/>)
                })}
             </div>
        )
    }


}