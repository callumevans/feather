const db = require('../services/database');

async function getAllPosts(filter) {
    return await db.Post.findAll(filter);
}

module.exports = {
    getAllPosts: getAllPosts
};