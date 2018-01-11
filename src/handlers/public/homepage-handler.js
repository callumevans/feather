const postsService = require('../../services/posts-service');

async function get(req, res) {
    let posts = await postsService.getPosts();

    res.buildRender('../views/public/home/home.pug', {
        latestPosts: posts
    });
}

module.exports = {
    get: get
};