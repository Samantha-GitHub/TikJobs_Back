const {
  create,
  updateById,
  deleteByIdToken,
  getEducationsByIdFreelance,
} = require('../../models/education');

const router = require('express').Router();
const { checkToken } = require('../middlewares');

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

// create education
// get data from body to create
router.post('/', checkToken, async (req, res) => {
  try {
    req.body.fk_usuario = req.userId;
    const result = await create(req.body);
    res.json(result);
  } catch (error) {
    res.status(422).json({ error: error.message });
  }
});

// DELETE a Education
router.delete('/:idEducation', checkToken, async (req, res) => {
  try {
    const json = {
      id: req.params.idEducation,
      fk_usuario: req.userId,
    };
    const result = await deleteByIdToken(json);
    res.json(result);
  } catch (error) {
    res.status(422).json({ error: error.message });
  }
});

// UPDATE a Education
router.put('/', async (req, res) => {
  try {
    const result = await updateById(req.body);
    res.json(result);
  } catch (error) {
    res.status(422).json({ error: error.message });
  }
});

module.exports = router;
