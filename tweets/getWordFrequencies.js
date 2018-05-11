const fs = require('fs');


const LANGUAGE = process.argv[2] || 'en';
const file = fs.createReadStream(`${__dirname}/data/${LANGUAGE}.list`);
const frequencies = {};

file.on('data', (chunk) => {
  // Break the chunk in words, and filter out mentions, hashtags, links,
  // empty strings, and words containing other non word characters.
  const words = chunk.toString().split(/ |\n/).filter((word) => {
    if (!word || word.match(/[^\w']|\d/)) {
      return false;
    }

    try {
      // eslint-disable-next-line no-new
      new URL(word);
      return false;
    } catch (err) {
      return true;
    }
  });

  // Count the frequency of each word.
  words.forEach((word) => {
    if (frequencies[word]) {
      frequencies[word] += 1;
    } else {
      frequencies[word] = 1;
    }
  });
});

file.on('end', () => {
  // Write frequencies in the form of array, and order words from the most
  // frequent to least frequent.
  const data = [];
  Object.keys(frequencies).forEach(word => data.push({ word, frequency: frequencies[word] }));
  data.sort((a, b) => b.frequency - a.frequency);

  fs.writeFileSync(`${__dirname}/data/${LANGUAGE}.frequencies.json`, JSON.stringify(data, null, 2));
});
