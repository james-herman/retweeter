
var Twit = require('twit');

// auth keys held in config
var config = require('./config')

// new Twit object
var T = new Twit(config);

// params for searching for tweets, in this case return 50 tweets with the word steelydan
var params = {
	q: 'steelydan',
	count: 50
}

// function to get tweets
function getTheTweets() {
	T.get('search/tweets', params, gotData);
}

// call function
getTheTweets();


// function called when tweets JSON is returned from Twitter

function gotData(err, data, response) {

	// used to pick random tweet of the batch of 50 tweets returned
	var randomtweet = Math.floor(Math.random() * 50);
	console.log(randomtweet);
	// create empty object to hold returned tweet id_str 
	 var toretweet = {
	 	id: '',
	}
	// variable to hold twitter user id of selected tweet for retweeting
	var tweeterid = data.statuses[randomtweet].user.id_str;

	// console.log(tweeterid);
	
	// grabbing selected tweet id and assigning it to toretweet object
	toretweet.id = data.statuses[randomtweet].id_str;

	// console.log(toretweet.id);
	
	// assign value to tweet using id_str property
	// using id_str and not id because Javascript can't deal with large integers
	// so the Twitter api passes them as strings
	
	
	
	// add if statement to filter out anime SteelyDan character bots
	// if the tweet is by either bot there is a message in the console
	// and in 20 seconds the function will run again, hopefully posting
	if (tweeterid == ('2470654214' || '122217337')) {
		console.log("oops its the wrong guy again, will try again");
		
		// logging to show info being used
		// console.log(toretweet.id);
		// console.log(data.statuses[randomtweet].user.id_str);
		// console.log(randomtweet);
	
		} else {

		// logging to show info being used  
		// console.log(toretweet.id);
		// console.log(data.statuses[randomtweet].user.id_str);
		// console.log(randomtweet);

		// retweet tweet from search above 
		// print returned data in console
		T.post('statuses/retweet/:id', toretweet, function (err, data, response) {
   		console.log(data);
	 	});
		console.log("Success, another quality Steely Dan tweet has posted!");

	}
}

// set interval to run function and retweet every 20 seconds

setInterval(getTheTweets, 20000);




