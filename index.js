
var Twit = require('twit');
//auth keys held in config
var config = require('./config')
// new Twit object
var T = new Twit(config);

//params for searching for tweets, in this case return 2 tweets with the word steelydan
var params = {
	q: 'steelydan',
	count: 2
}

//function to get tweets

function getTheTweets() {
	T.get('search/tweets', params, gotData);
}
// call function
getTheTweets();


// function called when tweets object is returned from Twitter

function gotData(err, data, response) {
	// create empty object to hold returned tweet id_str 
	 var toretweet = {
	 	id: '',
	}
	// assign value to tweet using id_str property
	// using id_str and not id because Javascript can't deal with large integers
	// so the Twitter api passes them as strings
	toretweet.id = data.statuses[0].id_str;

	// console.log(data.statuses[0].text);

	// retweet first tweet from search above 
	// print returned data in console
	T.post('statuses/retweet/:id', toretweet, function (err, data, response) {
  		console.log(data);
	});
}

// set interval to run function and retweet every 60 seconds

setInterval(getTheTweets, 60000);




