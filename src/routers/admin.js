const express = require('express');
const router = express.Router();

const rootHandler = require('../handlers/admin/root-handler');
const postsHandler = require('../handlers/admin/posts-handler');

router.get('/', async (req, res) => {
    return rootHandler.get(req, res);
});

router.get('/posts', async (req, res) => {
    return postsHandler.getMany(req, res);
});

router.post('/posts', async (req, res) => {
    return postsHandler.post(req, res);
});

router.get('/posts/:seoTitle', async (req, res) => {
    return postsHandler.getMany(req, res);
});

module.exports = router;