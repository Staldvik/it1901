// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

const functions = require('firebase-functions');
const SpotifyWebApi = require('spotify-web-api-node');
const express = require('express');
const cors = require('cors')({origin: "*"});


// Gotten from spotify
var clientId = '88641e06b03f46d886b98db9c58e9935',
clientSecret = '8b9aa7488fb2456a98d4168dd4b5c2c4';
// Create the api object with the credentials
var spotifyApi = new SpotifyWebApi({
    clientId : clientId,
    clientSecret : clientSecret
});

const app = express();

app.use(cors);
app.get('', (req, res) => {
    // Retrieve an access token.
    spotifyApi.clientCredentialsGrant()
    .then(data => {
        // Send token as JSON
        res.json({token: data.body['access_token']});

    // If error log it.
    }, err => {
        console.log('Something went wrong when retrieving an access token', err);
    });
});

exports.spotifyToken = functions.https.onRequest(app);


