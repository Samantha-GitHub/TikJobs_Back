const {
  getAll,
  create,
  updateById,
  deleteById,
  getSkillsByIdFreelance,
  getSkillsByIdJobsOffers,
} = require('../../models/skill');

const router = require('express').Router();
const { checkToken } = require('../middlewares');

// get all skills
router.get('/', async (req, res) => {
  // console.log(req.job_skillId);

  try {
    const skills = await getAll();
    res.json(skills);
  } catch (error) {
    res.json({ error: error.message });
  }
});

// get all skills from a freelancer
router.get('/:pId', async (req, res) => {
  // console.log(req.job_skillId);

  try {
    const skills = await getSkillsByIdFreelance(req.params.pId);
    res.json(skills);
  } catch (error) {
    res.json({ error: error.message });
  }
});

// get all skills by id job offer
router.get('/:pId', async (req, res) => {
  // console.log(req.job_skillId);

  try {
    const skills = await getSkillsByIdJobsOffers(req.params.pId);
    res.json(skills);
  } catch (error) {
    res.json({ error: error.message });
  }
});

// create a new skill

router.post('/', async (req, res) => {
  try {
    const result = await create(req.body);
    res.json(result);
  } catch (error) {
    res.status(422).json({ error: error.message });
  }
});

// delete a skill
router.delete('/:idSkill', async (req, res) => {
  try {
    const result = await deleteById(req.params.idSkill);
    res.json(result);
  } catch (error) {
    res.status(422).json({ error: error.message });
  }
});

// update a skills\
router.put('/', async (req, res) => {
  try {
    const result = await updateById(req.body);
    res.json(result);
  } catch (error) {
    res.status(422).json({ error: error.message });
  }
});

module.exports = router;
