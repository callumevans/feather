const db = require('../services/database');

async function getPosts() {
    let posts = await db.connection()
        .collection('posts')
        .find()
        .sort({
            publishedOn: 1
        })
        .toArray();

    return posts;
}

async function getPost(seoTitle) {
    let post = await db.connection()
        .collection('posts')
        .findOne({
            seoTitle: seoTitle
        });

    return post;
}

async function createPost(title, state) {
    await db.connection()
        .collection('posts')
        .insert({
            title: title,
            state: state
        });
}

module.exports = {
    getPosts: getPosts,
    getPost: getPost,
    createPost: createPost
};