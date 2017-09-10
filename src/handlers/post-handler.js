const postsService = require('../services/posts-service');

async function handle(req, res, next) {
    let post = await postsService.getPost(req.params.seoTitle);

    if (!post) {
        res.status(404);
        res.send(`Post not found.`);
    } else {
        res.buildRender('../views/post/post.pug', {
            post: post,
            PAGE_TITLE: post.title
        });
    }

    next();
}

module.exports = {
    handle: handle
};