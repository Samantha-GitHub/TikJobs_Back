const {
  create,
  updateById,
  deleteByIdToken,
  getCoursesByIdFreelance,
} = require('../../models/course');

const router = require('express').Router();
const { checkToken } = require('../middlewares');

// Recupera todos los courses de un freelance y devuelve JSON
router.get('/:pId', async (req, res) => {
  // Id de company inyectado por el Middleware checkToken!
  // console.log(req.courseId);

  try {
    const course = await getCoursesByIdFreelance(req.params.pId);
    res.json(course);
  } catch (error) {
    res.json({ error: error.message });
  }
});

// Crear un nuevo course
// Los datos para crear el course, me llegan a través del BODY
router.post('/', checkToken, async (req, res) => {
  try {
    req.body.fk_usuario = req.userId;
    const result = await create(req.body);
    res.json(result);
  } catch (error) {
    res.status(422).json({ error: error.message });
  }
});

// Borro un Course
router.delete('/:idCourse', checkToken, async (req, res) => {
  try {
    const json = {
      id: req.params.idCourse,
      fk_usuario: req.userId,
    };
    console.log(json);
    const result = await deleteByIdToken(json);
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


module.exports = router;
