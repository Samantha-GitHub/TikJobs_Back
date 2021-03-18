const {
  getAll,
  create,
  deleteById,
  updateById,
  getById
} = require('../../models/freelancer');

const router = require('express').Router();

// Recupera todos los freelancers y devuelve JSON
router.get('/', async (req, res) => {
  // Id de freelancer inyectado por el Middleware checkToken!
  // console.log(req.userId);

  try {
    const freelancer = await getAll();
    res.json(freelancer);
  } catch (error) {
    res.json({ error: error.message });
  }
});

// Recupera UN unico freelancers by ID
router.get('/:idFreelancer', async (req, res) => {

  try {
    const freelancer = await getById(req.params.idFreelancer);
    res.json(freelancer);
  } catch (error) {
    res.json({ error: error.message });
  }
});

// Crear un nuevo freelancer
// Los datos para crear el freelancer, me llegan a través del BODY
router.post('/', async (req, res) => {
  try {
    const result = await create(req.body);
    res.json(result);
  } catch (error) {
    res.status(422).json({ error: error.message });
  }
});

// Borro un freelancer
router.delete('/:idFreelancer', async (req, res) => {
  try {
    const result = await deleteById(req.params.idFreelancer);
    res.json(result);
  } catch (error) {
    res.status(422).json({ error: error.message });
  }
});

// Actualizo un freelancer
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
