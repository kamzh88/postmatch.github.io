
console.log('this is loaded');

exports.spotify = {
    id: process.env.SPOTIFY_ID,
    secret: process.env.SPOTIFY_SECRET
};

exports.omdbapi = process.env.OMDBAPI_ID;

exports.bitApi = process.env.BITAPI_ID;