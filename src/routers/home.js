const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.buildRender('../views/home/home.pug', {
            title: 'Home',
            message: 'Hello world!'
        });
});

module.exports = router;