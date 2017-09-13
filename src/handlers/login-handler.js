const authService = require('../services/auth-service');
const userService = require('../services/user-service');

async function get(req, res, next) {
    res.buildRender('../views/admin/login/login.pug');
    return next();
}

async function post(req, res, next) {
    let user = await userService.getUser(req.body.email);

    if (!user) {
        return badLogin(res, next);
    }

    let isValidPassword = await authService.verifyPassword(
        req.body.password, user.password);

    if (!isValidPassword) {
        return badLogin(res, next);
    }

    // Password is verified at this point so we can safely generate a token
    let token = authService.generateToken({
        "email": req.body.email
    });

    res.json(token);
}

function badLogin(res, next) {
    res.status(404);
    res.send('User not found.');
    return next();
}

module.exports = {
    get: get,
    post: post
};