const {
  create,
  updateById,
  deleteById,
  getEducationsByIdFreelance,
} = require('../../models/education');

const router = require('express').Router();

// Recupera todos los educations de un freelance y devuelve JSON
router.get('/:pId', async (req, res) => {
  // Id de education inyectado por el Middleware checkToken!
  // console.log(req.courseId);

  try {
    const education = await getEducationsByIdFreelance(req.params.pId);
    res.json(education);
  } catch (error) {
    res.json({ error: error.message });
  }
});

// Crear un nuevo Education
// Los datos para crear el Education, me llegan a través del BODY
router.post('/', async (req, res) => {
  try {
    const result = await create(req.body);
    res.json(result);
  } catch (error) {
    res.status(422).json({ error: error.message });
  }
});

// Borro un Education
router.delete('/:idEducation', async (req, res) => {
  try {
    const result = await deleteById(req.params.idEducation);
    res.json(result);
  } catch (error) {
    res.status(422).json({ error: error.message });
  }
});

// Actualizo un Education
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
