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

    /* getAll()
        .then((rows) => {

            res.json(rows)
        })
        .catch((err) => { console.log(err); }); */

    /*     try {
            const rows = await getAll();
            res.render('clientes/lista', {
    
                arrClientes: rows
    
            });
    
        } catch (err) {
    
            console.log(err);
    
        } */


    try {
        const getAllUsuarios = await getAll();
        /* res.json(getAllUsuarios); */
        console.log(getAllUsuarios);
    } catch (error) {

        /* res.json({ error: error.message }) */
        console.log(error);

    }

});

module.exports = router;