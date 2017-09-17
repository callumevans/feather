const db = require('../services/database');

async function getUser(email) {
    let user = await db.connection()
        .collection('users')
        .findOne({
            email: email
        });

    return user;
}

module.exports = {
    getUser: getUser
};