const express = require('express');
const router = express.Router();

const postsService = require('../services/posts-service');

router.get('/', async (req, res) => {
    res.redirect(req.baseUrl + '/posts');
});

router.get('/posts', async (req, res) => {
    let posts = await postsService.getPosts();

    res.buildRender('../views/admin/posts-list/posts-list.pug', {
        posts: posts
    });
});

router.post('/posts', async (req, res) => {
    if (!req.body.postTitle) {
        res.status(400);
        res.send('No post title provided');
        return;
    }

    await postsService.createPost(
        req.body.postTitle, 'Draft');

    res.status(201);
    res.send('Post created');
});

router.get('/posts/:seoTitle', (req, res) => {
    let post = postsService.getPost(req.seoTitle);

    if (!post) {
        res.status(404);
        res.send('Post not found');
        return;
    }

    res.buildRender('../views/admin/posts-edit/posts-edit.pug', {
        post: post
    });
});

module.exports = router;