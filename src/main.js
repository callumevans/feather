const express = require('express');
const app = express();
const path = require('path');

// Renderer
const renderer = require('./services/renderer');

// Handlers
const homeHandler = require('./handlers/homepage-handler');

// Moment JS in app locals
app.locals.moment = require('moment');

// View engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Extend response object with buildRender() function
app.use((req, res, next) => {
    res.buildRender = (view, variables) =>
       renderer.build(res, view, variables);

    next();
});

// Assets
app.use(express.static(path.join(__dirname, '/public')));

// Routes
app.use('/', async (req, res, next) => {
    await homeHandler.handle(req, res, next);
});

// Start server
app.listen(3000, function () {
    console.log('Listening on port 3000!');
});