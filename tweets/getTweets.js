const fs = require('fs');
const Twitter = require('twitter');


// You can get your credentials here https://apps.twitter.com/
const client = Twitter({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token_key: process.env.ACCESS_TOKEN_KEY,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET,
});

// Language to get tweets in.
const FILTER_LANG = process.argv[2] || 'en';
const file = fs.createWriteStream(`${__dirname}/data/${FILTER_LANG}.list`, { flags: 'a' });

// Filter from a real time stream of tweets.
client.stream('statuses/filter', { lang: FILTER_LANG, track: 'a' }, (stream) => {
  stream.on('error', error => console.error(error));
  stream.on('data', (tweet) => {
    if (tweet.lang === FILTER_LANG) {
      file.write(tweet.text);
      console.log(tweet.text);
    }
  });

  // Stop the script after 5 minutes.
  setTimeout(() => {
    file.end();
    process.exit();
  }, 5 * 60 * 1000);
});
