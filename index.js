
var Twit = require('twit');

// auth keys held in config
var config = require('./config')

// new Twit object
var T = new Twit(config);

// params for searching for tweets, in this case return 150 tweets with the hashtagged #steelydan
var params = {
	q: '%23steelydan',
	result_type: 'recent',
	count: 150
}

// function to get tweets
function getTheTweets() {
	T.get('search/tweets', params, gotData);
}

// call function
getTheTweets();


// function called when tweets JSON is returned from Twitter

function gotData(err, data, response) {

	// picking random tweet of the first 75 tweets returned
	// although params query brings back 150 tweets, they're aren't always
	// 100 complete tweets to due twitter filtering out retweets and
	// incomplete data. It seems like at least 50% of the tweets are
	// always good, so just picking from the first 50 returned
	// The problem before was that originally when the random number
	// was close to the max result (like 94 of 100) it would be undefined
	// and the bot would stop working

	var randomtweet = Math.floor(Math.random() * 75);
	
	// create empty object to hold returned tweet id_str 
	 var toretweet = {
	 	id: '',
	}
	// variable to hold twitter user id of selected tweet for retweeting
	// need user id to filter out other bots in if statement below
	var tweeterid = data.statuses[randomtweet].user.id_str;
	
	// grabbing selected tweet id and assigning it to toretweet object
	// assign value to tweet using id_str property
	// using id_str and not id because Javascript can't deal with large integers
	// so the Twitter api passes them as strings
	toretweet.id = data.statuses[randomtweet].id_str;

	// loop to test presence of data
	// for (var i = 0; i <=50; i++) {
	// 	console.log(i + ' tweet ' + data.statuses[i].user.id_str);
	// }
	
	
	// add if statement to filter out anime SteelyDan character bots
	// if the tweet is by either bot there is a message in the console
	// and in 20 seconds the function will run again, hopefully posting
	
	// if (tweeterid == ('2470654214' || '122217337'|| '122219416' || '4066860798' || '4782149654' || '43627436')) {
	// 	console.log("oops its the wrong guy again, will try again");
		
	
	// 	} else {

	// 	// retweet tweet from search above 
	// 	// print returned data in console
	// 	T.post('statuses/retweet/:id', toretweet, function (err, data, response) {
   	// 	console.log(data);
	//  	});
	// 	console.log("Success, another quality Steely Dan tweet has posted!");

	// }

	// Changing to switch/case method to block selected accounts from being retweeted

	switch(tweeterid) {
		case '2470654214':
			console.log("oops its the wrong guy again, will try again");
			break;
		case '122217337':
			console.log("oops its the wrong guy again, will try again");
			break;
		case '122219416':
			console.log("oops its the wrong guy again, will try again");
			break;
		case '4066860798':
			console.log("oops its the wrong guy again, will try again");
			break;
		case '4782149654':
			console.log("oops its the wrong guy again, will try again");
			break;
		case '43627436':
			console.log("oops its the wrong guy again, will try again");
			break;
		default:
			T.post('statuses/retweet/:id', toretweet, function (err, data, response) {
				console.log(data);
			   	});
			 	console.log("Success, another quality Steely Dan tweet has posted!")
	}
}

// set interval to run function and retweet every 20 seconds

setInterval(getTheTweets, 20000);




