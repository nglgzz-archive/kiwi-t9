const request = require('supertest');
const express = require('express');
const api = require('../api/index');


const app = express();
app.use(api);

describe('GET  /suggestions', () => {
  it('returns suggestions in the right format', (done) => {
    request(app)
      .get('/suggestions?q=5825')
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual({
          digits: '5825',
          suggestions: expect.any(Array),
        });

        // Check that all suggestions have a word of 4 characters, and a
        // frequency associated to them.
        response.body.suggestions.forEach((suggestion) => {
          expect(suggestion).toEqual({
            word: expect.stringMatching(/['\w]{4}/),
            frequency: expect.any(Number),
          });
        });
        done();
      });
  });

  it('returns status 400 when inserting non digits characters', (done) => {
    request(app)
      .get('/suggestions?q=luck')
      .expect(400)
      .then((response) => {
        expect(response.body).toEqual({
          error: expect.stringContaining('numbers only'),
        });
        done();
      });
  });
});
