import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';

export default class NavComponent extends Component {

    render() {
        return(
            <nav>
                <div className="wideDiv">
                    <Link to='/'>Home</Link>
                    <Link to='/about'>About</Link>
                    
                </div>
            </nav>
        )
    }

}