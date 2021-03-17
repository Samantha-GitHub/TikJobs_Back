const router = require('express').Router();
const { getAll } = require('../models/freelancer');


//GET http://localhost:3000/users/

router.get('/', async (req, res, next) => {

    try {
        const getAllUsuarios = await getAll();
        res.json(getAllUsuarios);

    } catch (error) {

        res.json({ error: error.message })

    }

});

//GET http://localhost:3000/users/userId

//POST http://localhost:3000/users

//PUT http://localhost:3000/users/userId

//DELETE http://localhost:3000/users/userId




module.exports = router;




