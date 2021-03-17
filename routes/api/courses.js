const {
  getAll,
  create,
  deleteById,
  updateById,
} = require('../../models/course');

const router = require('express').Router();

// Recupera todos los courses y devuelve JSON
router.get('/', async (req, res) => {
  // Id de company inyectado por el Middleware checkToken!
  // console.log(req.courseId);

  try {
    const course = await getAll();
    res.json(course);
  } catch (error) {
    res.json({ error: error.message });
  }
});

// Crear un nuevo course
// Los datos para crear el course, me llegan a través del BODY
router.post('/', async (req, res) => {
  try {
    const result = await create(req.body);
    res.json(result);
  } catch (error) {
    res.status(422).json({ error: error.message });
  }
});

// Borro un Course
router.delete('/:idCourse', async (req, res) => {
  try {
    const result = await deleteById(req.params.idCourse);
    res.json(result);
  } catch (error) {
    res.status(422).json({ error: error.message });
  }
});

// Actualizo un Course
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
