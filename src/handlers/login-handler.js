const authService = require('../services/auth-service');
const userService = require('../services/user-service');

function get(req, res) {
    res.buildRender('../views/admin/login/login.pug');
}

async function post(req, res) {
    if (!req.body.email || !req.body.password)
        return badLogin(res);

    let user = await userService.getUser(req.body.email);

    if (!user) {
        return badLogin(res);
    }

    let isValidPassword = await authService.verifyPassword(
        req.body.password, user.password);

    if (!isValidPassword) {
        return badLogin(res);
    }

    // Password is verified at this point so we can safely generate a token
    let token = authService.generateToken({
        'email': req.body.email
    });

    res.send(token);
}

function badLogin(res) {
    res.status(400);
    res.send('Error logging in with provided credentials.');
}

module.exports = {
    get: get,
    post: post
};