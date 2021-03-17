const {
  getAll,
  create,
  deleteById,
  updateById,
} = require('../../models/empresa');

const router = require('express').Router();

// Recupera todos los companies y devuelve JSON
router.get('/', async (req, res) => {
  // Id de company inyectado por el Middleware checkToken!
  // console.log(req.compnayId);

  try {
    const company = await getAll();
    res.json(company);
  } catch (error) {
    res.json({ error: error.message });
  }
});

// Crear un nuevo company
// Los datos para crear el company, me llegan a través del BODY
router.post('/', async (req, res) => {
  try {
    const result = await create(req.body);
    res.json(result);
  } catch (error) {
    res.status(422).json({ error: error.message });
  }
});

// Borro un company
router.delete('/:idCompany', async (req, res) => {
  try {
    const result = await deleteById(req.params.idCompany);
    res.json(result);
  } catch (error) {
    res.status(422).json({ error: error.message });
  }
});

// Actualizo un company
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