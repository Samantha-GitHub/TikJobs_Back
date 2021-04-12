const {
  create,
  updateById,
  deleteById,
} = require('../../models/tbi_freelancer_skills');

const router = require('express').Router();

// create fk_usuario with fk_skill
router.post('/', async (req, res) => {
  try {
    const result = await create(req.body.skill, req.body.freelance);
    res.json(result);
  } catch (error) {
    res.status(422).json({ error: error.message });
  }
});

// update fk_usuario and fk_skill
router.put('/', async (req, res) => {
  try {
    const result = await updateById(req.body.skill, req.body.freelance);
    res.json(result);
  } catch (error) {
    res.status(422).json({ error: error.message });
  }
});

// delete fk_ofertas_trabajos and fk_skills
router.delete('/:id', async (req, res) => {
  try {
    const result = await deleteById(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(422).json({ error: error.message });
  }
});

module.exports = router;
