const express = require('express');
const app = express();
const path = require('path');
const db = require('./services/database');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const authService = require('./services/auth-service');

// Renderer
const renderer = require('./services/renderer');

// Handlers
const homeHandler = require('./handlers/homepage-handler');
const postHandler = require('./handlers/post-handler');
const loginHandler = require('./handlers/login-handler');
const adminHandler = require('./handlers/admin-handler');

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

app.use(bodyParser.json());
app.use(cookieParser());

// Extend request object with user context if it exists
app.use((req, res, next) => {
    let userIdentity = null;

    if (req.cookies.token) {
        try {
            userIdentity = authService.decodeToken(req.cookies.token);
        } catch (error) {
            res.status(400);
            res.send('Error parsing token.');
            return;
        }
    }

    req.userIdentity = userIdentity;
    next();
});

// Assets
app.use(express.static(path.join(__dirname, '/public')));

// Routes
app.get('/', async (req, res) => {
    await homeHandler.get(req, res);
});

app.get('/posts/:seoTitle', async (req, res) => {
    await postHandler.get(req, res);
});

app.get('/login', async (req, res) => {
    await loginHandler.get(req, res);
});

app.post('/login', async (req, res) => {
    await loginHandler.post(req, res);
});

app.get('/admin', async (req, res) => {
   await adminHandler.get(req, res);
});

// Start server
db.connect(() => {
    app.listen(3000, function () {
        console.log('Listening on port 3000!');
    });
});