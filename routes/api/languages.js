const {
  getAll,
  create,
  updateById,
  deleteById,
  getLanguagesByIdFreelance,
  getLanguagesByIdJobsOffers,
} = require('../../models/languages');

const router = require('express').Router();

// Recupera todos los languages y devuelve JSON
router.get('/', async (req, res) => {
  // Id de skill inyectado por el Middleware checkToken!
  // console.log(req.job_skillId);

  try {
    const languages = await getAll();
    res.json(languages);
  } catch (error) {
    res.json({ error: error.message });
  }
});

// Recupera todos los languages de un freelance y devuelve JSON
router.get('/', async (req, res) => {
  // Id de skill inyectado por el Middleware checkToken!
  // console.log(req.job_skillId);

  try {
    const languages = await getLanguagesByIdFreelance();
    res.json(languages);
  } catch (error) {
    res.json({ error: error.message });
  }
});

// Recupera todos los languages de ub job offer y devuelve JSON
router.get('/', async (req, res) => {
  // Id de skill inyectado por el Middleware checkToken!
  // console.log(req.job_skillId);

  try {
    const languages = await getLanguagesByIdJobsOffers();
    res.json(languages);
  } catch (error) {
    res.json({ error: error.message });
  }
});

// Crear un nuevo languages
// Los datos para crear languages, me llegan a través del BODY
router.post('/', async (req, res) => {
  try {
    const result = await create(req.body);
    res.json(result);
  } catch (error) {
    res.status(422).json({ error: error.message });
  }
});

// Borro un languages
router.delete('/:idLanguages', async (req, res) => {
  try {
    const result = await deleteById(req.params.idLanguages);
    res.json(result);
  } catch (error) {
    res.status(422).json({ error: error.message });
  }
});

// Actualizo un languages
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
