const {
  getAll,
  create,
  deleteByIdToken,
  updateById,
  getById,
  getByCountry,
  searchData,
} = require('../../models/oferta');

const { getSkillsByIdJobsOffers } = require('../../models/skill');

const { getLanguagesByIdJobsOffers } = require('../../models/languages');

const router = require('express').Router();
const { checkToken } = require('../middlewares');

// Recupera todos los job offers y devuelve JSON
router.get('/', async (req, res) => {
  // Id de job Offer inyectado por el Middleware checkToken!
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

// Recupera job offers by COUNTRY
// router.get('/joboffer/:name', async (req, res) => {
//   try {
//     const jobOffer = await getByCountry(req.params.CountryJobOffer);
//     res.json(jobOffer);
//   } catch (error) {
//     res.json({ error: error.message });
//   }
// });

// Recupera job offers by SEARCH
router.get('/joboffer/:name', async (req, res) => {
  console.log(req.params.name);
  try {
    const jobOffer = await searchData(req.params.name);
    res.json(jobOffer);
  } catch (error) {
    res.json({ error: error.message });
  }
});

// Crear un nuevo job offer
// Los datos para crear job offer, me llegan a través del BODY
router.post('/', checkToken, async (req, res) => {
  try {
    req.body.fk_empresa = req.empresaId;
    const result = await create(req.body);
    res.json(result);
  } catch (error) {
    res.status(422).json({ error: error.message });
  }
});

// Borro un job offer
router.delete('/', checkToken, async (req, res) => {
  try {
    console.log(req.body);
    req.body.fk_empresa = req.empresaId;
    const result = await deleteByIdToken(req.body);
    res.json(result);
  } catch (error) {
    res.status(422).json({ error: error.message });
  }
});

// Actualizo un job offers\
router.put('/', async (req, res) => {
  try {
    const result = await updateById(req.body);
    res.json(result);
  } catch (error) {
    res.status(422).json({ error: error.message });
  }
});

//GET http://localhost:3000/users/userId

//POST http://localhost:3000/users

//PUT http://localhost:3000/users/userId

//DELETE http://localhost:3000/users/userId

module.exports = router;
