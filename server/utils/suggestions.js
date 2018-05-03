const { writeFileSync } = require('fs');

// This file contains a list of objects, each with a word and a rank attribute.
// The higher the rank the more frequent that word appears in the language (in
// this case the English language), the word is simply a string with the word.
const wordsList = require('../data/words.json');

// This file contains an object with letters as keys, and digits as values.
// This object is used to convert words into sequences of digits.
const charToDigitMap = require('../data/charToDigit.json');


// Convert a word to the corresponding digit sequence.
function wordToDigits(word) {
  return word
    .split('')
    .map(char => charToDigitMap[char])
    .join('');
}

// Generate the suggestions file based on the data/words and charToDigit files.
function generateSuggestions() {
  const digitsToWordsMap = {};

  // Add all single characters to the suggestions for the digit it
  // corresponds to.
  Object.keys(charToDigitMap).forEach((char) => {
    digitsToWordsMap[charToDigitMap[char]] = [
      { word: char, rank: -1 },
    ];
  });

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
}


module.exports = {
  wordToDigits,
  generateSuggestions,
};
