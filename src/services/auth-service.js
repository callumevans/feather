const bcrypt = require('bcrypt');
const jwt = require('jwt-simple');

const saltRounds = 13;
const tokenLifetime = 3600;
const jwtSecret = 'SECRET';

async function verifyPassword(password, hash) {
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, hash, (err, result) => {
           if (err) reject(err);
           else resolve(result);
        });
    });
}

function createHash(password) {
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, saltRounds, (err, hash) => {
            if (err) reject(err);
            else resolve(hash);
        });
    });
}

function generateToken(claims) {
    claims.exp = Math.round((new Date()).getTime() / 1000) + tokenLifetime;
    return jwt.encode(claims, jwtSecret);
}

function decodeToken(token) {
    return jwt.decode(token, jwtSecret);
}

module.exports = {
    verifyPassword: verifyPassword,
    createHash: createHash,
    generateToken: generateToken,
    decodeToken: decodeToken
};