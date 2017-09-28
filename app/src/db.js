import Firebase from 'firebase';
import config from './config';

const firebaseApp = Firebase.initializeApp(config);
const db = firebaseApp.database().ref().child('festival');

export default db;