//require("dotenv").config();
var axios = require("axios")
var moment = require("moment");
var keys = require("./keys.js");
var fs = require("fs");

var spotify = new Spotify(keys.spotify)

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
                "Venue Name: " + bandsInfo.venue.name,
                "Venue City: " + bandsInfo.venue.city,
                "Concert Date and Time: " + bandsInfo.datetime,
            ].join("\n\n");
            
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

/*function runSpotify(){
    var URL= "https://api.spotify.com/v1/tracks/7yCPwWs66K8Ba5lFuU2bcx";
    axios
    .request(URL)
    .then(function(data) {
      console.log(data); 
    })
    ajax
        id: f91243d9864c4b95b25b944a0d851e23,
        secret:ad6cbff8bffb4a5f98828f80b8028963
      });
       
      spotify
        .search({ type: 'track', query: 'All the Small Things' })
        .then(function(response) {
          console.log(response);
        })
        .catch(function(err) {
          console.log(err);
        });
}*/