const router = require('express').Router();
const { getAll } = require('../../models/freelancer');

// Recupera todos los clientes y devuelve JSON
router.get('/', async (req, res) => {
  // Id de usuario inyectado por el Middleware checkToken!
  // console.log(req.userId);

  try {
    const freelancer = await getAll();
    res.json(freelancer);
  } catch (error) {
    res.json({ error: error.message });
  }
});

// Crear un nuevo cliente
// Los datos para crear el cliente, me llegan a través del BODY
router.post('/', async (req, res) => {
  try {
    const result = await create(req.body);
    res.json(result);
  } catch (error) {
    res.status(422).json({ error: error.message });
  }
});

// http://localhost:3000/freelancer/create

// /freelancer/create
router.post('/create', async (req, res) => {
  console.log(req.body);
  const result = await create(req.body);
  console.log(result);
  res.redirect('/freelancer');
});

// http://localhost:3000/freelancer/edit/:idFreelancer

// /clientes/edit/7
router.get('/edit/:idFreelancer', async (req, res) => {
  const cliente = await getById(req.params.idFreelancer);
  res.render('clientes/formularioEdit', { freelancer });
});

//GET http://localhost:3000/users/userId

//POST http://localhost:3000/users

//PUT http://localhost:3000/users/userId

//DELETE http://localhost:3000/users/userId

module.exports = router;
