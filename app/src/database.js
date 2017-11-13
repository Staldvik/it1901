import firebase from 'firebase';

/**
 * Config variable for firebase
 */
var config = {
    apiKey: "AIzaSyDaYpDvWOMu9LYsbtewVfYinKjdF-TArvc",
    authDomain: "festival-180609.firebaseapp.com",
    databaseURL: "https://festival-180609.firebaseio.com",
    projectId: "festival-180609",
    storageBucket: "festival-180609.appspot.com",
    messagingSenderId: "587187428094"
}

/**
 * Reference to firebaseApp, used for Auth and database in this app
 */
const firebaseApp = firebase.initializeApp(config);
/**
 * Reference to firebase database.
 */
const database = firebaseApp.database();

export default database;
export {firebaseApp};
