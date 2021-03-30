const {
  getAll,
  create,
  deleteById,
  updateById,
  getById,
  getByEmail,
  searchFreelanceEducation,
} = require('../../models/freelancer');

const { getCoursesByIdFreelance } = require('../../models/course');

const { getEducationsByIdFreelance } = require('../../models/education');

const { getLanguagesByIdFreelance } = require('../../models/languages');

const { getSkillsByIdFreelance } = require('../../models/skill');

const {
  getProfesionalExperienceByIdFreelance,
} = require('../../models/profesional_experience');

// PASSWORD AND TOKEN
const router = require('express').Router();
const bcrypt = require('bcryptjs');
const dayjs = require('dayjs');
const jwt = require('jsonwebtoken');
const { checkToken } = require('../middlewares');

// MULTER IMAGE HANDLER
const multer = require('multer');
const upload = multer({ dest: 'public/images' });
const fs = require('fs');

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

// Recupera UNA unica freelance by ID para pintando por TOKEN
router.get('/profile', checkToken, async (req, res) => {
  try {
    const freelancer = await getById(req.userId);
    // console.log('holaaaaaaaaaaa', freelancer);

    const course = await getCoursesByIdFreelance(req.userId);

    const education = await getEducationsByIdFreelance(req.userId);

    const language = await getLanguagesByIdFreelance(req.userId);
    console.log('soy language', language);
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

// Recupera freelance by SEARCH
router.get('/search/:name', async (req, res) => {
  /*  console.log(req.params.name); */
  try {
    const freelancer = await searchFreelanceEducation(req.params.name);
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
/* 
// Crear un nuevo freelancer CON MULTER
// Los datos para crear el freelancer, me llegan a través del BODY
router.post('/', upload.single('image'), async (req, res) => {
  // console.log(req.body);
  // Antes de guardar el producto en la base de datos, modificamos la imagen para situarla donde nos interesa
  const extension = '.' + req.file.mimetype.split('/')[1];

  // Obtengo el nombre de la nueva imagen
  const newName = req.file.filename + extension;
  // Obtengo la ruta donde estará, adjuntándole la extensión
  const newPath = req.file.path + extension;
  // Muevo la imagen para que resiba la extensión
  fs.renameSync(req.file.path, newPath);

  // Modifico el BODY para poder incluir el nombre de la imagen en la BD
  req.body.image = newName;
  try {
    req.body.password = bcrypt.hashSync(req.body.password, 10);

    const result = await create(req.body);
    res.json(result);
  } catch (error) {
    res.status(422).json({ error: error.message });
  }
}); */

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
router.delete('/', checkToken, async (req, res) => {
  try {
    req.body.id = req.userId;
    const freelancer = await deleteById(req.body);
    res.json(freelancer);
  } catch (error) {
    res.status(422).json({ error: error.message });
  }
});

/* // Actualizo un freelancer
router.put('/', checkToken, async (req, res) => {
  try {
    req.body.id = req.userId;
    const result = await updateById(req.body);
    res.json(result);
  } catch (error) {
    res.status(422).json({ error: error.message });
  }
}); */

// Actualizo un freelancer WITH MULTER
router.put('/', upload.single('image'), checkToken, async (req, res) => {
  // Antes de guardar el producto en la base de datos, modificamos la imagen para situarla donde nos interesa
  const extension = '.' + req.file.mimetype.split('/')[1];

  // Obtengo el nombre de la nueva imagen
  const newName = req.file.filename + extension;
  // Obtengo la ruta donde estará, adjuntándole la extensión
  const newPath = req.file.path + extension;
  // Muevo la imagen para que resiba la extensión
  fs.renameSync(req.file.path, newPath);

  // Modifico el BODY para poder incluir el nombre de la imagen en la BD
  req.body.image = newName;
  try {
    req.body.id = req.userId;
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
