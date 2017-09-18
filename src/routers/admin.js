const express = require('express');
const router = express.Router();

const postsService = require('../services/posts-service');

router.use((req, res, next) => {
    if (!req.userIdentity) {
        res.status(401);
        res.send('No authorisation set.')
    } else {
        next();
    }
});

router.get('/', async (req, res) => {
    res.redirect(req.baseUrl + '/posts');
});

router.get('/posts', async (req, res) => {
    let posts = await postsService.getPosts();

    res.buildRender('../views/admin/posts-list/posts-list.pug', {
        posts: posts
    });
});

router.get('/posts/:seoTitle', (req, res) => {
    res.send('Editing ');
});

module.exports = router;