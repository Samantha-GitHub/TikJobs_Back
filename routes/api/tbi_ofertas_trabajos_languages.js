const {
  create,
  updateById,
  deleteById,
} = require('../../models/tbi_ofertas_trabajos_languages');

const router = require('express').Router();

// create fk_ofertas_trabajos with fk_languages
router.post('/', async (req, res) => {
  try {
    const result = await create(req.body.language, req.body.job_offer);
    res.json(result);
  } catch (error) {
    res.status(422).json({ error: error.message });
  }
});

// update fk_ofertas_trabajos and fk_languages
router.put('/', async (req, res) => {
  try {
    const result = await updateById(req.body);
    res.json(result);
  } catch (error) {
    res.status(422).json({ error: error.message });
  }
});

// delete fk_ofertas_trabajos y fk_languages
router.delete('/:id', async (req, res) => {
  try {
    const result = await deleteById(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(422).json({ error: error.message });
  }
});

module.exports = router;
