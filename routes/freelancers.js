const router = require('express').Router();
const { getAll } = require('../models/freelancer');

// http://localhost:3000/freelancer/

// all freelancers
router.get('/', async (req, res, next) => {
  try {
    const getAllUsuarios = await getAll();
    res.json(getAllUsuarios);
  } catch (error) {
    res.json({ error: error.message });
  }
});

// freelancer info needed
// http://localhost:3000/freelancer/new

router.get('/new', (req, res) => {
  // Renderizar una vista (form.pug) que reprensente cada uno de los campos necesarios para crear un freelancer
  res.render('freelancer/form');
});

// /clientes/create
// http://localhost:3000/freelancer/create
router.post('/create', async (req, res) => {
  console.log(req.body);
  const result = await create(req.body);
  console.log(result);
  res.redirect('/new');
});

// /clientes/edit/7
router.get('/edit/:idCliente', async (req, res) => {
  const cliente = await getById(req.params.idCliente);
  res.render('clientes/formularioEdit', { cliente });
});

//GET http://localhost:3000/users/userId

//POST http://localhost:3000/users

//PUT http://localhost:3000/users/userId

//DELETE http://localhost:3000/users/userId

module.exports = router;
