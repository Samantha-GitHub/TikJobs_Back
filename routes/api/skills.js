const router = require('express').Router();
const { getAll } = require('../../models/skill');


// http://localhost:3000/skills/

router.get('/', async (req, res, next) => {

    try {
        const getAllUsuarios = await getAll();
        res.json(getAllUsuarios);

    } catch (error) {

        res.json({ error: error.message })

    }

});

module.exports = router;