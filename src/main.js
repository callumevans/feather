const express = require('express');
const app = express();
const path = require('path');
const db = require('./services/database');

// Renderer
const renderer = require('./services/renderer');

// Handlers
const homeHandler = require('./handlers/homepage-handler');
const postHandler = require('./handlers/post-handler');

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
app.get('/', async (req, res, next) => {
    await homeHandler.handle(req, res, next);
});

app.get('/posts/:seoTitle', async (req, res, next) => {
    await postHandler.handle(req, res, next);
});

// Start server
db.connect(() => {
    app.listen(3000, function () {
        console.log('Listening on port 3000!');
    });
});