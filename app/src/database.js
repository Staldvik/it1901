import firebase from 'firebase';

var config = {
    apiKey: "AIzaSyDaYpDvWOMu9LYsbtewVfYinKjdF-TArvc",
    authDomain: "festival-180609.firebaseapp.com",
    databaseURL: "https://festival-180609.firebaseio.com",
    projectId: "festival-180609",
    storageBucket: "festival-180609.appspot.com",
    messagingSenderId: "587187428094"
}

const firebaseApp = firebase.initializeApp(config);
const database = firebaseApp.database().ref().child('festival');

export default database;
