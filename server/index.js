const express = require('express');
const api = require('./api/index');


const app = express();

// API
app.use('/api', api);

// Static files
app.use('/static', express.static('client/dist'));
app.use('/static', express.static('client/fonts'));
app.get('*', (_, res) => res.sendFile('index.html', { root: 'client' }));

// Magic
app.listen(3000, () => console.log('Magic started on port 3000!'));
