const functions = require('firebase-functions');

const SpotifyWebApi = require('spotify-web-api-node');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
var clientId = '88641e06b03f46d886b98db9c58e9935',
clientSecret = '8b9aa7488fb2456a98d4168dd4b5c2c4';
// Create the api object with the credentials
var spotifyApi = new SpotifyWebApi({
    clientId : clientId,
    clientSecret : clientSecret
});


exports.helloWorld = functions.https.onRequest((request, response) => {
    response.send("Hello from Firebase!");
});

exports.spotifyToken = functions.https.onRequest((request, response) => {
    // Retrieve an access token.
    spotifyApi.clientCredentialsGrant()
        .then(function(data) {
            console.log('The access token expires in ' + data.body['expires_in']);
            console.log('The access token is ' + data.body['access_token']);

    // Save the access token so that it's used in future calls
    spotifyApi.setAccessToken(data.body['access_token']);
    }, function(err) {
        console.log('Something went wrong when retrieving an access token', err);
    });
    console.log(spotifyApi.getAccessToken());
    response.send("spotifyApi.getAccessToken()");
})


const express = require('express');
const cors = require('cors')({origin: "*"});
const app = express();

app.use(cors);
app.get('/', (req, res) => {
  res.json({Hello: "JSON"});
});

exports.app = functions.https.onRequest(app);