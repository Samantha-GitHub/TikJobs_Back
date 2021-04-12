const {
  create,
  updateById,
  deleteByIdToken,
  getCoursesByIdFreelance,
} = require('../../models/course');

const router = require('express').Router();
const { checkToken } = require('../middlewares');

// get all courses from a freelance
router.get('/:pId', async (req, res) => {
  try {
    const course = await getCoursesByIdFreelance(req.params.pId);
    res.json(course);
  } catch (error) {
    res.json({ error: error.message });
  }
});

// create new course
// create a course using body
router.post('/', checkToken, async (req, res) => {
  try {
    req.body.fk_usuario = req.userId;
    const result = await create(req.body);
    res.json(result);
  } catch (error) {
    res.status(422).json({ error: error.message });
  }
});

// delete a Course
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

// update  Course
router.put('/', async (req, res) => {
  try {
    const result = await updateById(req.body);
    res.json(result);
  } catch (error) {
    res.status(422).json({ error: error.message });
  }
});

module.exports = router;
