require("dotenv").config();
var axios = require("axios")
var moment = require("moment");
var keys = require("./keys.js");
var fs = require("fs");
var Spotify = require("node-spotify-api");

var spotify = new Spotify(keys.spotify);

//do if statements to match what you're trying to take in 

var search = process.argv[2];
var term = process.argv.slice(3).join(" ");

if (search === "concert-this") {
    runBands();
}

if (search === "spotify-this-song") {
    runSpotify();
}

if (search === "movie-this") {
    runOMDB();
}

if(search==="do-what-it-says"){
    randomize();
}

/// creating ze functions 

function runBands() {

    var URL = "https://rest.bandsintown.com/artists/" + term + "/events?app_id=codingbootcamp";
    axios
        .get(URL)
        .then(function (response) {
            var bandsInfo = response.data;
            //console.log(bandsInfo);
            var concertInfo = [
                "Venue Name: " + bandsInfo[0].venue.name,
                "Venue City: " + bandsInfo[0].venue.city,
                "Concert Date and Time: " + bandsInfo[0].datetime,
            ].join("\n\n");
            console.log(concertInfo);
            
        })
}

function randomize(){
    fs.readFile("random.txt", "utf8", function(error, data) {
        if (error) {
          return console.log(error);
        }
             console.log(data);
        var dataArr = data.split(",");
        console.log(dataArr);
        if(dataArr==="concert-this"){
            runBands();
        }
      });
}

// OMDB 
 function runOMDB() {
  //findMovie takes in name of movie and searches the OMDB API
 // this.findMovie = function () {
      var URL = "http://www.omdbapi.com/?t=" + term + "&y=&plot=short&apikey=trilogy";
      //run the request with axios module on a URL with a JSON
      axios.get(URL).then(function (response) {
          //place response.data into a variable jsonData
          var jsonData = response.data;
          //movieData = the string containing the movie data we will print to console
          var movieData = [
              "Title:" + jsonData.Title,
              "Year of release:" + jsonData.Year,
              "IMDB rating: " + jsonData.imdbRating,
              "Rotten Tomatoes rating: " + jsonData.Ratings[1].Source,
              "Country where produced: " + jsonData.Country,
              "Language: " + jsonData.Language,
              "Plot: " + jsonData.Plot,
              "Cast: " + jsonData.Actors
          ].join("\n\n");
          //print movieData to console
          console.log(movieData)
      }
      );
  }
//}

function runSpotify(){
  spotify.search({ type: 'track', query: term }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
    else {
      //console.log(data.tracks.items[0].name);
      var spotData = [
      "Artist: " + data.tracks.items[0].album.artists[0].name,
      "Song Name: " + data.tracks.items[0].name,
      "Album:  " + data.tracks.items[0].album.name,
  ].join("\n\n");
  console.log(spotData);
  //console.log(JSON.stringify(data, null, 2)); 
}
  });
  
}