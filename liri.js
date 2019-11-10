require("dotenv").config();

var keys = require("./keys.js");
var axios = require("axios");

// var spotify = new spotify(keys.spotify);
var omdbapi = (keys.omdbapi);
console.log(omdbapi)
// var concert = "concert-this";

// var spotify = "spotify-this-song";

// var movie = "movie-this";

// var command = "do-what-it-says";

// axios.get(omdbapi).then(
//     function(response) {
//         console.log("The movie's rating is: " + response.data.imdbRating);
//     }
// )