const router = require('express').Router();
const { getAll } = require('../../models/oferta');

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

module.exports = router;
