require("dotenv").config();
var moment = require("moment");
var fs = require("fs");
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

function run(action, value) {
    
    var concert = "concert-this";
    var SPOTIFY_THIS_SONG = "spotify-this-song";
    var movie = "movie-this";
    var COMMAND = "do-what-it-says";
    switch (action) {
        case movie:
            movieAPI(value);
            log();
            break;

        case concert:
            concertAPI(value);
            log();
            break;

        case SPOTIFY_THIS_SONG:
            spotifyAPI(value);
            log();
            break;

        case COMMAND:
            command(value);
            break;

        default:
            console.log("invalid input");
    }
}

function movieAPI() {
    if (!value) {
        var movieURL = `http://www.omdbapi.com/?y=&plot=short&t=Mr.+Nobody&apikey=${omdbApiKey}`;
        axios.get(movieURL).then(
            function (response) {
                console.log(`Title of Movie: ${response.data.Title}`);
                console.log(`Release Year: ${response.data.Year}`);
                console.log(`IMDB movie's rating is: ${response.data.imdbRating}`);
                console.log(`Rotten Tomatoes Rating: ${response.data.Ratings[1].Value}`);
                console.log(`Production country: ${response.data.Country}`);
                console.log(`Language of the movie: ${response.data.Language}`);
                console.log(`Plot: ${response.data.Plot}`);
                console.log(`Actors/Actress: ${response.data.Actors}`);
            }
        )
    } else {
        var movieURL = `http://www.omdbapi.com/?y=&plot=short&t=${value}&apikey=${omdbApiKey}`;
        axios.get(movieURL).then(
            function (response) {
                console.log(`Title of Movie: ${response.data.Title}`);
                console.log(`Release Year: ${response.data.Year}`);
                console.log(`IMDB movie's rating is: ${response.data.imdbRating}`);
                console.log(`Rotten Tomatoes Rating: ${response.data.Ratings[1].Value}`);
                console.log(`Production country: ${response.data.Country}`);
                console.log(`Language of the movie: ${response.data.Language}`);
                console.log(`Plot: ${response.data.Plot}`);
                console.log(`Actors/Actress: ${response.data.Actors}`);

            }
        )
    };
}

function concertAPI() {
    var concertURL = `https://rest.bandsintown.com/artists/${value}/events?app_id=${bitApiKey}`;
    console.log(concertURL);
    axios.get(concertURL).then(
        function (concertData) {

            for (var i = 0; i < concertData.data.length; i++) {
                console.log(`${i + 1}`);
                console.log(`Name of Artist: ${concertData.data[0].artist.name}`);
                console.log(`Venue name: ${concertData.data[i].venue.name}`);
                console.log(`Venue location: ${concertData.data[i].venue.city}, ${concertData.data[i].venue.region}`);
                console.log(moment(concertData.data[i].datetime).format('L'));
                console.log("------------------------------------")
            }
        }
    )
}

function spotifyAPI(value) {
    
    if (!value) {
        var value = "The Sign";
        
        spotify.search({ name: "Ace of Base", type: 'track', query: value}, function (err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }
            console.log(`Name of Artists: ${data.tracks.items[5].album.artists[0].name}`);
            console.log(`Name of Song: ${data.tracks.items[5].name}`);
            console.log(`Album name: ${data.tracks.items[5].album.name}`);
            console.log(`Preview song: ${data.tracks.items[5].preview_url}`);
            console.log("----------------------------------------------------")
        });
        
    } else {
        spotify.search({ type: 'track', query: value}, function (err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }
            console.log(`Name of Artists: ${data.tracks.items[0].album.artists[0].name}`);
            console.log(`Name of Song: ${data.tracks.items[0].name}`);
            console.log(`Album name: ${data.tracks.items[0].album.name}`);
            console.log(`Preview song: ${data.tracks.items[0].preview_url}`);
        });
    }
}

function command() {
    fs.readFile("random.txt", "utf8", function (error, data) {

        if (error) {
            return console.log(error);
        }

        var dataArr = data.split(",");

        action = dataArr[0];

        value = dataArr[1];

        run(action, value);

    })
}

function log() {
    fs.appendFile("log.txt", `${value},\n`, function (err) {
        if (err) {
            console.log(err);
        }
        
        else {
            console.log("Content Added!")
        }
    })
}

run(action, value);
