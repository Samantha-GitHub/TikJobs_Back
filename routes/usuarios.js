/* var express = require('express');
var router = express.Router(); */
const router = require('express').Router();
const { getAll } = require('../models/usuario');

/* Probamos si funciona:*/

router.get('/', (req, res) => {
    res.send('PROBAMOS dentro de usuarios')
})


module.exports = router;