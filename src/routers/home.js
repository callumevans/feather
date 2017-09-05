const express = require('express');
const router = express.Router();
const renderer = require('../services/render-builder');

router.get('/', (req, res) => {
   res.render(
       '../views/home.pug',
       renderer.buildVariables({
           title: 'Home',
           message: 'Hello world!'
       }));
});

module.exports = router;