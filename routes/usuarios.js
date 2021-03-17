/* var express = require('express');
var router = express.Router(); */
const router = require('express').Router();
const { getAll } = require('../models/usuario');

/* Probamos si funciona:*/

/* router.get('/', (req, res) => {
    res.send('PROBAMOS dentro de usuarios')
}) */

// http://localhost:3000/users/

router.get('/', async (req, res, next) => {

    try {
        const getAllUsuarios = await getAll();
        res.json(getAllUsuarios);

    } catch (error) {

        res.json({ error: error.message })

    }

});

module.exports = router;