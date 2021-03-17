const {
  getAll,
  create,
  deleteById,
  updateById,
} = require('../../models/skill');

const router = require('express').Router();

// Recupera todos los skills y devuelve JSON
router.get('/', async (req, res) => {
  // Id de skill inyectado por el Middleware checkToken!
  // console.log(req.job_skillId);

  try {
    const skills = await getAll();
    res.json(skills);
  } catch (error) {
    res.json({ error: error.message });
  }
});

// Crear un nuevo skill
// Los datos para crear skill, me llegan a través del BODY
router.post('/', async (req, res) => {
  try {
    const result = await create(req.body);
    res.json(result);
  } catch (error) {
    res.status(422).json({ error: error.message });
  }
});

// Borro un skill
router.delete('/:idSkill', async (req, res) => {
  try {
    const result = await deleteById(req.params.idSkill);
    res.json(result);
  } catch (error) {
    res.status(422).json({ error: error.message });
  }
});

// Actualizo un skills\
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
