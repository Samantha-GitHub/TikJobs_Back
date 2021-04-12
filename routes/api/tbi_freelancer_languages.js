const {
  create,
  updateById,
  deleteById,
} = require('../../models/tbi_freelancer_languages');

const router = require('express').Router();

// create fk_usuario with fk_language
router.post('/', async (req, res) => {
  console.log(req.body);
  try {
    const result = await create(req.body.freelance, req.body.language);
    res.json(result);
  } catch (error) {
    res.status(422).json({ error: error.message });
  }
});

// update fk_usuario and fk_language
router.put('/', async (req, res) => {
  try {
    const result = await updateById(req.body.language, req.body.freelance);
    res.json(result);
  } catch (error) {
    res.status(422).json({ error: error.message });
  }
});

// delete fk_ofertas_trabajos and fk_language
router.delete('/:id', async (req, res) => {
  try {
    const result = await deleteById(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(422).json({ error: error.message });
  }
});

module.exports = router;
