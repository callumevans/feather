const postsService = require('../services/posts-service');

async function handle(req, res, next) {
    let posts = await postsService.getPosts();

    res.buildRender('../views/home/home.pug', {
        latestPosts: posts
    });

    next();
}

module.exports = {
    handle: handle
};