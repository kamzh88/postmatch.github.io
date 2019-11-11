require("dotenv").config();

var keys = require("./keys.js");
var axios = require("axios");
var Spotify = require("node-spotify-api");

var nodeArgs = process.argv;
var spotifyID = (keys.spotify.id);
var spotifySecret = (keys.spotify.secret);
var spotify = new Spotify({
    id: spotifyID,
    secret: spotifySecret
})
var omdbApiKey = (keys.omdbapi);
var bitApiKey = (keys.bitApi)
var action = process.argv[2];
var value = nodeArgs.slice(3).join(" ");

// line 15 use to test
// var value = "lady+gaga"


var movieURL = `http://www.omdbapi.com/?y=&plot=short&t=${value}&apikey=${omdbApiKey}`;
var concertURL = `https://rest.bandsintown.com/artists/${value}?app_id=${bitApiKey}`;

var concert = "concert-this";
var SPOTIFY_THIS_SONG = "spotify-this-song";
var movie = "movie-this";
var command = "do-what-it-says";

switch (action) {
    case movie:
        movieAPI();
        break;

    case concert:
        concertAPI();
        break;

    case SPOTIFY_THIS_SONG:
        spotifyAPI();
        break;

    
    default:
        console.log("invalid input");
}

function movieAPI() {
    axios.get(movieURL).then(
        function (response) {
            console.log(`Release Year: ${response.data.Year}`);
            console.log(`The movie's rating is: ${response.data.imdbRating}`);
        }
    )
}

function concertAPI() {
    console.log(concertURL);
    axios.get(concertURL).then(
        function (concertData) {
            console.log(`Artist Name: ${concertData.data.name}`);
            console.log(`Upcoming Events: ${concertData.data.upcoming_event_count}`);
        }
    )
}

function spotifyAPI() {

    spotify.search({ type: 'track', query: value, limit: 1}, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        console.log(data.tracks.items[0].name);

        // JSON.parse(data);
        // var m = data;
        // JSON.parse(m);
        // console.log(m);
        // var obj = JSON.parse(data);        
        // console.log("spotify data: " + obj.result);

    });
}

