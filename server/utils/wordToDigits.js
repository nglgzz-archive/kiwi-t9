// This file contains an object with letters as keys, and digits as values.
// This object is used to convert words into sequences of digits.
const charToDigitMap = require('../data/charToDigit.json');


// Convert a word to the corresponding digit sequence.
module.exports = word =>
  word.split('')
    .map(char => charToDigitMap[char])
    .join('');
