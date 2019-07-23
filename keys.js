console.log('this is loaded');

exports.spotify = {
    id: process.env.SPOTIFY_ID,
    secret: process.env.SPOTIFY_SECRET
};

exports.omdb = {
    id: process.env.omdb_key,
    key: e0cccb8a,
    url: "http://www.omdbapi.com/?i=tt3896198&" + omdb.key + "=e0cccb8a"
};