const express = require('express');
const app = express();
const path = require('path');

// Routers
const home = require('./routers/home');

// Services
const renderer = require('./services/renderer');

// View engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Extend response object with buildRender() function
app.use(function (req, res, next) {
   res.buildRender = (view, variables) =>
       renderer.build(res, view, variables);

   next();
});

// Assets
app.use(express.static(path.join(__dirname, '/public')));

// Routers
app.use('/', home);

// Start server
app.listen(3000, function () {
    console.log('Listening on port 3000!');
});