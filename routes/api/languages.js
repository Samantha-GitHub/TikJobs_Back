const {
  getAll,
  create,
  updateById,
  deleteById,
  getLanguagesByIdFreelance,
  getLanguagesByIdJobsOffers,
} = require('../../models/languages');

const router = require('express').Router();

// get all languages
router.get('/', async (req, res) => {
  // console.log(req.job_skillId);

  try {
    const languages = await getAll();
    res.json(languages);
  } catch (error) {
    res.json({ error: error.message });
  }
});

// All languages from a freelance
router.get('/:pId', async (req, res) => {
  // console.log(req.job_skillId);

  try {
    const languages = await getLanguagesByIdFreelance(req.params.pId);
    res.json(languages);
  } catch (error) {
    res.json({ error: error.message });
  }
});

// get all languages from a joboffer
router.get('/:pId', async (req, res) => {
  // console.log(req.job_skillId);

  try {
    const languages = await getLanguagesByIdJobsOffers(req.params.pId);
    res.json(languages);
  } catch (error) {
    res.json({ error: error.message });
  }
});

// create new language

router.post('/', async (req, res) => {
  try {
    const result = await create(req.body);
    res.json(result);
  } catch (error) {
    res.status(422).json({ error: error.message });
  }
});

// delete a languages
router.delete('/:idLanguages', async (req, res) => {
  try {
    const result = await deleteById(req.params.idLanguages);
    res.json(result);
  } catch (error) {
    res.status(422).json({ error: error.message });
  }
});

// update a language
router.put('/', async (req, res) => {
  try {
    const result = await updateById(req.body);
    res.json(result);
  } catch (error) {
    res.status(422).json({ error: error.message });
  }
});

module.exports = router;
