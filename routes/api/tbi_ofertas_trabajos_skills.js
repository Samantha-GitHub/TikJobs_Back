const {
    create,
    updateById,
    deleteById,
} = require('../../models/tbi_ofertas_trabajos_skills');

const router = require('express').Router();

// Crear fk_ofertas_trabajos con fk_skills
router.post('/', async (req, res) => {
    try {
        const result = await create(req.body);
        res.json(result);
    } catch (error) {
        res.status(422).json({ error: error.message });
    }
});

// Actualizar fk_ofertas_trabajos y fk_skills
router.put('/', async (req, res) => {
    try {
        const result = await updateById(req.body);
        res.json(result);
    } catch (error) {
        res.status(422).json({ error: error.message });
    }
});

// Borrar fk_ofertas_trabajos y fk_skills
router.delete('/:id', async (req, res) => {
    try {
        const result = await deleteById(req.params.id);
        res.json(result);
    } catch (error) {
        res.status(422).json({ error: error.message });
    }
});

module.exports = router;