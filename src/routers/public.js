const express = require('express');
const router = express.Router();

const homepageHandler = require('../handlers/public/homepage-handler');
const loginHandler = require('../handlers/public/login-handler');
const postsHandler = require('../handlers/public/posts-handler');

router.get('/', async (req, res) => {
    return homepageHandler.get(req, res);
});

router.get('/login', async (req, res) => {
    return loginHandler.get(req, res);
});

router.post('/login', async (req, res) => {
    return loginHandler.post(req, res);
});

router.get('/posts/:seoTitle', async (req, res) => {
    return postsHandler.get(req, res);
});

module.exports = router;