const express = require('express');
const app = express();

const path = require('path');

const home = require('./routers/home');

// View engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Assets
app.use(express.static(path.join(__dirname, '/public')));

// Routers
app.use('/', home);

// Start server
app.listen(3000, function () {
    console.log('Listening on port 3000!');
});