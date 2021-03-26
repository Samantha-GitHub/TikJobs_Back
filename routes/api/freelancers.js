const {
  getAll,
  create,
  deleteById,
  updateById,
  getById,
  getByEmail,
} = require('../../models/freelancer');

const { getCoursesByIdFreelance } = require('../../models/course');

const { getEducationsByIdFreelance } = require('../../models/education');

const { getLanguagesByIdFreelance } = require('../../models/languages');

const { getSkillsByIdFreelance } = require('../../models/skill');

const {
  getProfesionalExperienceByIdFreelance,
} = require('../../models/profesional_experience');

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
        success: 'Welcome back!!',
        token: createToken(freelance),
      });
    } else {
      res.json({ error: 'Wrong email or password' });
    }
  } else {
    res.json({ error: 'Wrong email or password' });
  }
});

function createToken(pFreelance) {
  const data = {
    userId: pFreelance.id,
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
    // console.log('holaaaaaaaaaaa', freelancer);

    const course = await getCoursesByIdFreelance(req.userId);

    const education = await getEducationsByIdFreelance(req.userId);

    const language = await getLanguagesByIdFreelance(req.userId);

    const skill = await getSkillsByIdFreelance(req.userId);

    const experience = await getProfesionalExperienceByIdFreelance(req.userId);
    freelancer.courses = course;
    freelancer.education = education;
    freelancer.languages = language;
    freelancer.profesional_experience = experience;
    freelancer.skills = skill;
    res.json(freelancer);
  } catch (error) {
    console.log(error);
    res.json({ error: error.message });
  }
});

// Recupera UN unico freelancers by ID
router.get('/:idFreelancer', async (req, res) => {
  try {
    const freelancer = await getById(req.params.idFreelancer);
    // console.log('adios', freelancer);
    const course = await getCoursesByIdFreelance(req.params.idFreelancer);

    const education = await getEducationsByIdFreelance(req.params.idFreelancer);

    const language = await getLanguagesByIdFreelance(req.params.idFreelancer);

    const skill = await getSkillsByIdFreelance(req.params.idFreelancer);

    const experience = await getProfesionalExperienceByIdFreelance(
      req.params.idFreelancer
    );
    freelancer.courses = course;
    freelancer.education = education;
    freelancer.languages = language;
    freelancer.profesional_experience = experience;
    freelancer.skills = skill;
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
