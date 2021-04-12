const {
  getProfesionalExperienceByIdFreelance,
  create,
  deleteByIdToken,
  updateById,
} = require('../../models/profesional_experience');

const router = require('express').Router();
const { checkToken } = require('../middlewares');

// get all profesional experience
router.get('/:pId', async (req, res) => {
  // console.log(req.job_offerId);

  try {
    const profesionalExperience = await getProfesionalExperienceByIdFreelance(
      req.params.pId
    );
    res.json(profesionalExperience);
  } catch (error) {
    res.json({ error: error.message });
  }
});

// create new Profesional Experience

router.post('/', checkToken, async (req, res) => {
  try {
    req.body.fk_usuario = req.userId;
    const result = await create(req.body);
    res.json(result);
  } catch (error) {
    res.status(422).json({ error: error.message });
  }
});

// delete a Profesional Experience
router.delete('/:idProfesionalExperience', checkToken, async (req, res) => {
  try {
    const json = {
      id: req.params.idProfesionalExperience,
      fk_usuario: req.userId,
    };
    const result = await deleteByIdToken(json);
    res.json(result);
  } catch (error) {
    res.status(422).json({ error: error.message });
  }
});

// update a Profesional Experience
router.put('/', async (req, res) => {
  try {
    const result = await updateById(req.body);
    res.json(result);
  } catch (error) {
    res.status(422).json({ error: error.message });
  }
});

module.exports = router;
