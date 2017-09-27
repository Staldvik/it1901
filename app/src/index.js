import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

// Prøver ut React-Router (V4)
import { BrowserRouter } from 'react-router-dom';
import Routes from './routes';
import './index.css';

// Firebase
import * as firebase from 'firebase';


var config = {
    apiKey: "AIzaSyDaYpDvWOMu9LYsbtewVfYinKjdF-TArvc",
    authDomain: "festival-180609.firebaseapp.com",
    databaseURL: "https://festival-180609.firebaseio.com",
    projectId: "festival-180609",
    storageBucket: "festival-180609.appspot.com",
    messagingSenderId: "587187428094"
}

firebase.initializeApp(config);

ReactDOM.render(
    <BrowserRouter>
        <Routes />
    </BrowserRouter>,
    document.getElementById('root')
);
registerServiceWorker();
