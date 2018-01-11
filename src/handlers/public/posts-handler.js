const postsService = require('../../services/posts-service');

async function get(req, res) {
    let post = await postsService.getPost(req.params.seoTitle);

    if (!post) {
        res.status(404);
        res.send(`Post not found.`);
    } else {
        res.buildRender('../../views/public/post/post.pug', {
            post: post,
            PAGE_TITLE: post.title
        });
    }
}

module.exports = {
    get: get
};