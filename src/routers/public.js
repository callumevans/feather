const express = require('express');
const router = express.Router();

const homepageHandler = require('../handlers/homepage-handler');
const loginHandler = require('../handlers/login-handler');
const postsHandler = require('../handlers/posts-handler');

router.get('/', async (req, res) => {
    return homepageHandler.get(req, res);
});

router.get('/login', (req, res) => {
    return loginHandler.get(req, res);
});

router.post('/login', async (req, res) => {
    return loginHandler.post(req, res);
});

router.get('/posts/:seoTitle', async (req, res) => {
    return postsHandler.get(req, res);
});

module.exports = router;