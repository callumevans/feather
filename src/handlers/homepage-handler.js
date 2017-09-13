const postsService = require('../services/posts-service');

async function get(req, res, next) {
    let posts = await postsService.getPosts();

    res.buildRender('../views/public/home/home.pug', {
        latestPosts: posts
    });

    return next();
}

module.exports = {
    get: get
};