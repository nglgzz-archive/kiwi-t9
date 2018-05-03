const express = require('express');
const { logger, APIError } = require('../utils/errors');
const digitsToWordsMap = require('../data/digitsToWords');


const router = express.Router();

// Return a list of word suggestions based on a sequence of numbers.
router.get('/suggestions', (req, res) => {
  const { q } = req.query;

  if (q.match(/\D/)) {
    throw new APIError(400, 'The query string must contain numbers only');
  }

  res.send({
    predictions: digitsToWordsMap[q] || [],
  });
});

// Handle any error inside the endpoints.
// eslint-disable-next-line no-unused-vars
router.use((err, req, res, next) => logger(err, res));


module.exports = router;
