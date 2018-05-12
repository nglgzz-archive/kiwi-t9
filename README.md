# Kiwi T9
This project is a fullstack assignment for [kiwi.com](https://github.com/kiwicom).
The goal of the assignment is to implement a web app that contains a number to
words predictor similar to T9. More details about the assignment requirements can
be found in the [INSTRUCTIONS.md](https://github.com/nglgzz/kiwi-t9/blob/master/INSTRUCTIONS.md)
file.

<img src="http://i.imgur.com/8Ye7YrV.jpg" width="300">

A demo can be seen at https://t9.nglgzz.com. Keep in mind that I'm using
Firebase in free tier and it's throttling all requests cause I haven't
configured a billing account.


## Features
- Get word suggestions while typing [T9-style](https://en.wikipedia.org/wiki/T9_(predictive_text)).
- Get suggestions only for existing words.
- Cycle through suggestions using the `*` button.
- Press `#` to cycle through different cases (lower, Title, UPPER).
- Insert symbols pressing the `1` button. Quick repeated presses will cycle through symbols.
- Let the world know you can use T9 (aka. Tweet what you typed).
- One command deploy to Firebase.
- Delete tapping on the `Delete` button (Yeah, it doesn't look like like a
  physical button, but we can pretend it's a 2018 reincarnation of an old
  phone rather than an exact replica, can't we?).
- Reset text pressing the `Reset` button.
- Characters counter (cause back in my day we only had 140 characters per text).


## Running the project
To run the project simply issue the following commands:

```
git clone https://github.com/nglgzz/kiwi-t9
cd kiwi-t9
npm install
npm start
```

And then connect to http://localhost:3000.


## Suggestions & Languages
Initially I was using the 5.000 most common English words as suggestions, and I
got those from https://www.wordfrequency.info.

The main problem I had with that list was that the words in it were lemmas (the
form of the word you would find in the dictionary), so building  the sentence
"I'm eating apples" would result in something like "I be eat apple".

To solve this I decided to generate myself a list of the most common words.
I turned to Twitter Stream API to get a pseudo-random sample of text written in
English. I say pseudo-random because it's not truly random, Twitter has a
character limit and people often use abbreviations to not exceed it, also,
language tends to be more colloquial on Twitter than other places on the web, so
slang and mispelled words are also common. For instance a sentence like "OMG I'm
soooo hyped for this!!!" wouldn't sound strange on Twitter.

All this is good though, because the app is simulating a texting app, and
Twitter language is not very different from texting language. Also when you hit
send, a tweet is created with the text you wrote, so it only makes sense to use
Twitter language.

Using `npm run add_language -- <lang>` you can add more languages to the
suggestions (only one language is displayed at the time, you can switch language
using `npm run make:suggestions <lang>`). The quality of the suggestions depends
on how many people use Twitter in that language, I tried to generate suggestions
in Italian, but I got way less tweets to work with. A workaround would be to
make the tweets/getTweets.js script run longer, or use a number of tweets limit,
rather than a time limit. Even then, your suggestions might be biased towards
the kind of content that gets tweeted the most.


## Folder structure
The folder structure is the following.

#### client
Frontend code.
- **actions**: Redux action creators
- **components**: React components
- **dist**: compiled static files (served as static content)
- **fonts**: custom fonts (served as static content)
- **reducers**: Redux reducers and related scripts
- **sass**: stylesheets
- **store**: Redux store and related scripts
- **utils**: anything that doesn't fit the folders above

#### public
Static files for Firebase.

#### server
Backend code.
- **api**: express routers
- **data**: data for suggestions and conversion of words to digits
- **utils**: everything that doesn't fit the folders above

#### tweets
Scripts and data for generating suggestions.
- **data**: tweets and frequencies of words by language
