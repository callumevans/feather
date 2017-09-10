const db = require('../services/database');

async function getPosts() {
    let posts = await db.connection()
        .collection('posts')
        .find()
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

module.exports = {
    getPosts: getPosts,
    getPost: getPost
};