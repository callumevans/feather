async function get(req, res) {
    res.buildRender('../views/admin/posts-list/posts-list.pug');
}

module.exports = {
    get: get
};