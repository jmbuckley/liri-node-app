// Necessary Requirements
require('dotenv').config();
let [node , location , method, ...uQuery] = process.argv
let fs = require('fs')
let keys = require('./keys.js')
let twitter = require('twitter')
let spotify = require('node-spotify-api')
let omdb = require('omdb')
let request = require('request')
let chalk = require('chalk')
let chalkAnimate = require('chalk-animation')
const rainbow = chalkAnimate.rainbow
const blue = chalk.blue
const yellow = chalk.yellow
// Bring in the keys!
let tClient = new twitter(keys.twitter)
let sClient = new spotify(keys.spotify)
// This function.. well.. it shows tweets.
const showTweets = () => {
    tClient.get('statuses/user_timeline' , function(error, tweets, response){
        console.log(blue("Here's some of your latest tweets!"))
        for (i in tweets) {
            console.log(yellow(tweets[i].text))
        }
    })
}

const spotifySong = (songName) => {
    sClient
        .search({type: 'track' , query : uQuery , limit: 1} , function(error, data) {
            if (error) throw error
            let songInfo = data.tracks.items
            for ( i in songInfo) {
                console.log(blue("So you want to know about " + yellow(songInfo[i].name) + "? \n" +
                                "Performed by " + yellow(songInfo[i].artists[0].name) + "? \n" +
                                "On the album " + yellow(songInfo[i].album.name) + " , \n" +
                                "released on/in " + yellow(songInfo[i].album.release_date) + ". \n" +
                                "Here's a link to listen: " + yellow(songInfo[i].external_urls.spotify)))
                }
             })
        }

const omdbLookUp = (movieName) => {
    request('http://www.omdbapi.com/?t=' + uQuery + '&y=&plot=&short&apikey=trilogy&r=json', function (error, response, body) {
        if (error) throw error
        let movieInfo = JSON.parse(body)
        console.log(blue("So you want to know about " + yellow(movieInfo.Title) + "? \n"
                    + yellow(movieInfo.Title) + " which was released in " + yellow(movieInfo.Year) + ". \n"
                    + "IMDb gave it " + yellow(movieInfo.Ratings[0].Value) + ", \n"
                    + "while Rotten Tomatoes gave it " + yellow(movieInfo.Ratings[1].Value) + ". \n"
                    + yellow(movieInfo.Title) + " is available in " + yellow(movieInfo.Language) + ", \n"
                    +  yellow(movieInfo.Title) + " went to DVD format on " + yellow(movieInfo.DVD) + ". \n"))
            })
        }

const random = () => {
    
}

switch (method) {
    case 'tweets' :
        showTweets()
        break
    case 'spotify' :
        spotifySong()
        break
    case 'omdb' :
        omdbLookUp()
        break
    case 'random' :
        random()
        break
}