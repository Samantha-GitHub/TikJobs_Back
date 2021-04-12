const {
  create,
  updateById,
  deleteById,
} = require('../../models/tbi_ofertas_trabajos_skills');

const router = require('express').Router();

// create fk_ofertas_trabajos with fk_skills
router.post('/', async (req, res) => {
  console.log(req.body);
  try {
    const result = await create(req.body.skill, req.body.job_offer);
    res.json(result);
  } catch (error) {
    res.status(422).json({ error: error.message });
  }
});

// update fk_ofertas_trabajos and fk_skills
router.put('/', async (req, res) => {
  try {
    const result = await updateById(req.body);
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
