const functions = require('firebase-functions');
const express = require('express');
const api = require('./api/index');


const app = express();

// API
app.use('/api', api);

// When running on Firebase static files are not needed as they are hosted by
// Firebase itself.
if (!process.env.FIREBASE_CONFIG) {
  // Static files
  app.use('/static', express.static('client/dist'));
  app.use('/static', express.static('client/fonts'));
  app.get('*', (_, res) => res.sendFile('index.html', { root: 'client' }));

  // Magic
  app.listen(3000, () => console.log('Magic started on port 3000!'));
}


// Used to deploy on Firebase.
exports.app = functions.https.onRequest(app);
