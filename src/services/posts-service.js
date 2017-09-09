const db = require('../services/database');

async function getPosts(filter) {
    return await db.Post.findAll(filter);
}

module.exports = {
    getPosts: getPosts
};