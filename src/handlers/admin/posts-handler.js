const postsService = require('../../services/posts-service');

async function getMany(req, res) {
    let posts = await postsService.getPosts();

    res.buildRender('../views/admin/posts-list/posts-list.pug', {
        posts: posts
    });
}

async function getOne(req, res) {
    let post = postsService.getPost(req.seoTitle);

    if (!post) {
        res.status(404);
        res.send('Post not found');
        return;
    }

    res.buildRender('../views/admin/posts-edit/posts-edit.pug', {
        post: post
    });
}

async function post(req, res) {
    if (!req.body.postTitle) {
        res.status(400);
        res.send('No post title provided');
        return;
    }

    await postsService.createPost(
        req.body.postTitle, 'Draft');

    res.status(201);
    res.send('Post created');
}

module.exports = {
    getMany: getMany,
    getOne: getOne,
    post: post
};