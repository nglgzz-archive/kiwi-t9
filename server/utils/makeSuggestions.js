const { writeFileSync } = require('fs');
const wordToDigits = require('./wordToDigits');


const LANGUAGE = process.argv[2] || 'en';
// This file contains a list of objects, each with a word and a frequency
// attribute. The higher the frequency the more frequent that word appears in
// the language (in this case English), the word is simply a string containing
// the word.
// eslint-disable-next-line import/no-dynamic-require
const wordsList = require(`${__dirname}/../../tweets/data/${LANGUAGE}.frequencies.json`);


// Generate the suggestions file based on the data/words and charToDigit files.
const digitsToWordsMap = {};

// Convert each word to a digits sequence and add it to the list of
// suggestions for that sequence.
wordsList.forEach((word) => {
  const digits = wordToDigits(word.word.toLowerCase());

  if (typeof digitsToWordsMap[digits] === 'object') {
    digitsToWordsMap[digits].push(word);
  } else {
    digitsToWordsMap[digits] = [word];
  }
});

writeFileSync(
  `${__dirname}/../data/digitsToWords.json`,
  JSON.stringify(digitsToWordsMap, null, 2),
);
