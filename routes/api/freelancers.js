const {
  getAll,
  create,
  deleteById,
  updateById,
  getById,
  getByEmail,
} = require('../../models/freelancer');

const router = require('express').Router();
const bcrypt = require('bcryptjs');
const dayjs = require('dayjs');
const jwt = require('jsonwebtoken');
const { checkToken } = require('../middlewares');

/* TOKEN Y MIDDLEWARE */

// Body -> email, password
router.post('/login', async (req, res) => {
  // Compruebo si el email está en la BDc
  const freelance = await getByEmail(req.body.email);
  if (freelance) {
    // Compruebo si las password coinciden
    const iguales = bcrypt.compareSync(req.body.password, freelance.password);
    if (iguales) {
      res.json({
        success: 'Login correcto!!',
        token: createToken(freelance),
      });
    } else {
      res.json({ error: 'Error en email y/o password' });
    }
  } else {
    res.json({ error: 'Error en email y/o password' });
  }
});

function createToken(pFreelance) {
  const data = {
    freelanceId: pFreelance.id,
    caduca: dayjs().add(10, 'hours').unix(),
  };

  return jwt.sign(data, 'tikjobs');
}
/* END TOKEN Y MIDDLEWARE */

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

// Recupera UNA unica empresa by ID para pintando por TOKEN
router.get('/profile', checkToken, async (req, res) => {
  try {
    const freelancer = await getById(req.userId);
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

// Recupera UN unico freelancers by ID para editar
router.get('/edit', async (req, res) => {
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
  // console.log(req.body);
  try {
    req.body.password = bcrypt.hashSync(req.body.password, 10);
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
router.put('/update', checkToken, async (req, res) => {
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
