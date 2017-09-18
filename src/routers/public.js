const express = require('express');
const router = express.Router();

const postsService = require('../services/posts-service');
const authService = require('../services/auth-service');
const userService = require('../services/user-service');

router.get('/', async (req, res) => {
    let posts = await postsService.getPosts();

    res.buildRender('../views/public/home/home.pug', {
        latestPosts: posts
    });
});

router.get('/login', (req, res) => {
    res.buildRender('../views/admin/login/login.pug');
});

router.post('/login', async (req, res) => {
    if (!req.body.email || !req.body.password)
        return badLogin(res);

    let user = await userService.getUser(req.body.email);

    if (!user) {
        return badLogin(res);
    }

    let isValidPassword = await authService.verifyPassword(
        req.body.password, user.password);

    if (!isValidPassword) {
        return badLogin(res);
    }

    // Password is verified at this point so we can safely generate a token
    let token = authService.generateToken({
        'email': req.body.email
    });

    res.send(token);
});

router.get('/posts/:seoTitle', async (req, res) => {
    let post = await postsService.getPost(req.params.seoTitle);

    if (!post) {
        res.status(404);
        res.send(`Post not found.`);
    } else {
        res.buildRender('../views/public/post/post.pug', {
            post: post,
            PAGE_TITLE: post.title
        });
    }
});

function badLogin(res) {
    res.status(400);
    res.send('Error logging in with provided credentials.');
}

module.exports = router;