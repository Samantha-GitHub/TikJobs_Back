const {
  getProfesionalExperienceByIdFreelance,
  create,
  deleteById,
  updateById,
} = require('../../models/profesional_experience');

const router = require('express').Router();

// Recupera todos los Profesional Experiences y devuelve JSON
router.get('/:pId', async (req, res) => {
  // Id de Profesional Experience inyectado por el Middleware checkToken!
  // console.log(req.job_offerId);

  try {
    const profesionalExperience = await getProfesionalExperienceByIdFreelance(req.params.pId);
    res.json(profesionalExperience);
  } catch (error) {
    res.json({ error: error.message });
  }
});

// Crear un nuevo Profesional Experience
// Los datos para crear Profesional Experience, me llegan a través del BODY
router.post('/', async (req, res) => {
  try {
    const result = await create(req.body);
    res.json(result);
  } catch (error) {
    res.status(422).json({ error: error.message });
  }
});

// Borro un Profesional Experience
router.delete('/:idProfesionalExperience', async (req, res) => {
  try {
    const result = await deleteById(req.params.idProfesionalExperience);
    res.json(result);
  } catch (error) {
    res.status(422).json({ error: error.message });
  }
});

// Actualizo un Profesional Experience
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
