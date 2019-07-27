//App setup
require("dotenv").config();
const Axios = require("axios");
const keys = require("./keys.js");
const Spotify = require('node-spotify-api');
const moment = require("moment");
const spotify = new Spotify(keys.spotify);
process.argv[3] = process.argv[3].replace(/ /g, '%20');
const command = process.argv[2]

//Options for each command on process.argv[3]
switch (command) {
    case "spotify-this-song":
        return doSpotify()
    case "concert-this":
        return doBand()
    case "movie-this":
        return doOmdb()
    default:
        console.log("Incorrect Command")
}

//Spotify Function
function doSpotify() {
    spotify.search({
            type: 'track',
            query: process.argv[3]
        },

        function(err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            } else {
                for (let i = 0; i < data.tracks.items.length; i++) {
                    let obj = {}
                    let res = data.tracks.items[i]
                    obj.albumName = res.album.name // name of album
                    obj.artistName = res.artists[0].name // first artist
                    obj.previewURL = res.preview_url || 'Preview not Available' // url link
                    obj.songName = res.name
                    console.log('----------------------------------')
                    console.log(`Artist Name: ${obj.artistName}\nAlbum: ${obj.albumName}\nSong Name: ${obj.songName}\nPreview URL: ${obj.previewURL}`)
                    console.log('----------------------------------')
                }
            }

        });

};

function doBand() {
    let bandQueryUrl = "https://rest.bandsintown.com/artists/" + process.argv[3] + "/events?app_id=codingbootcamp";
    Axios.get(bandQueryUrl)
        .then(response => {
            for (var i = 0; i < response.data.length; i++) {
                console.log("Venue Name: ", response.data[i].venue.name)
                console.log("City: ", response.data[i].venue.city)
                console.log("State: ", response.data[i].venue.region)
                console.log("Date: ", moment(response.data[i].venue.datetime).format('MM/DD/YYYY'))
                console.log('----------------------------')
            }
        })
        .catch(err => console.log('err', err))

};

function doOmdb() {
    let movieQueryUrl = "http://www.omdbapi.com/?t=" + process.argv[3] + "&y=&plot=short&apikey=trilogy";
    Axios.get(movieQueryUrl)
        .then(response => {
            console.log('----------------------------')
            console.log("Movie Name: ", response.data.Title)
            console.log("Year Released: ", response.data.Year)
            console.log("IMDB Rating: ", response.data.Ratings[0].Value)
            console.log("Rotten Tomato Rating: ", response.data.Ratings[1].Value)
            console.log("Country Produced In: ", response.data.Country)
            console.log("Available Languages Spoken: ", response.data.Language)
            console.log("Plot: ", response.data.Plot)
            console.log("Actors: ", response.data.Actors)
            console.log('----------------------------')
        })
        .catch(err => console.log('err', err))
};