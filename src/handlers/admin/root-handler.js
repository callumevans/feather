async function get(req, res) {
    res.redirect(req.baseUrl + '/posts');
}

module.exports = {
    get: get
};