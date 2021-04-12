const {
  getAll,
  create,
  deleteByIdToken,
  updateById,
  getById,
  searchData,
  deleteAll,
} = require('../../models/oferta');

const {
  searchFreelance,
  searchFreelanceEducation,
} = require('../../models/freelancer');

const { getSkillsByIdJobsOffers } = require('../../models/skill');

const { getLanguagesByIdJobsOffers } = require('../../models/languages');

const router = require('express').Router();
const { checkToken } = require('../middlewares');

// get all job offers
router.get('/', async (req, res) => {
  // console.log(req.job_offerId);

  try {
    const jobOffer = await getAll();
    res.json(jobOffer);
  } catch (error) {
    res.json({ error: error.message });
  }
});

// Recupera UN unico job offer by ID
router.get('/:idJobOffer', async (req, res) => {
  try {
    const jobOffer = await getById(req.params.idJobOffer);
    const skills = await getSkillsByIdJobsOffers(req.params.idJobOffer);
    const languages = await getLanguagesByIdJobsOffers(req.params.idJobOffer);
    jobOffer.skills = skills;
    jobOffer.languages = languages;
    res.json(jobOffer);
  } catch (error) {
    res.json({ error: error.message });
  }
});

// get job offers by SEARCH
router.get('/joboffer/:name', async (req, res) => {
  try {
    const jobOffer = await searchData(req.params.name);
    res.json(jobOffer);
  } catch (error) {
    res.json({ error: error.message });
  }
});

// create new job offer
router.post('/', checkToken, async (req, res) => {
  try {
    req.body.fk_empresa = req.empresaId;
    const result = await create(req.body);
    res.json(result);
  } catch (error) {
    res.status(422).json({ error: error.message });
  }
});

// delete a job offer
router.delete('/:jobOfferId', checkToken, async (req, res) => {
  try {
    const json = {
      id: req.params.jobOfferId,
      fk_empresa: req.empresaId,
    };
    const result = await deleteByIdToken(json);
    res.json(result);
  } catch (error) {
    res.status(422).json({ error: error.message });
  }
});

// update a job offers\
router.put('/', async (req, res) => {
  try {
    const result = await updateById(req.body);
    res.json(result);
  } catch (error) {
    res.status(422).json({ error: error.message });
  }
});

module.exports = router;
