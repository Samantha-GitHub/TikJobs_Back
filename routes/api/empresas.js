const {
  getAll,
  create,
  deleteById,
  updateById,
  getById,
  getJobOfferByIdCompany,
  getByEmail,

  /* getCompanyDetailByJobOffer */
} = require('../../models/empresa');

const { getByIdOffer } = require('../../models/oferta');

const { getSkillsByIdJobsOffers } = require('../../models/skill');

const { getLanguagesByIdJobsOffers } = require('../../models/languages');

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
  const company = await getByEmail(req.body.email);
  /*   console.log(company); */
  if (company) {
    const iguales = bcrypt.compareSync(req.body.password, company.password);
    if (iguales) {
      res.json({
        success: 'Welcome back!!',
        token: createToken(company),
      });
    } else {
      res.json({ error: 'Wrong email or password' });
    }
  } else {
    res.json({ error: 'Wrong email or password' });
  }
});

function createToken(pCompany) {
  const data = {
    companyId: pCompany.id,

    caduca: dayjs().add(10, 'hours').unix(),
  };
  console.log(data);
  return jwt.sign(data, 'tikjobs');
}

/* END TOKEN Y MIDDLEWARE */

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

// Recupera UNA unica empresa by ID para pintando por TOKEN
router.get('/profile', checkToken, async (req, res) => {
  try {
    const company = await getById(req.empresaId);
    const jobOffer = await getJobOfferByIdCompany(req.empresaId);
    company.jobOffer = jobOffer;

    res.json(company);

    // console.log(company);
  } catch (error) {
    res.json({ error: error.message });
  }
});

// Recupera UNA unica empresa by ID
router.get('/:idCompany', async (req, res) => {
  /*  console.log(req.params); */

  try {
    const company = await getById(req.params.idCompany);
    res.json(company);
  } catch (error) {
    res.json({ error: error.message });
  }
});

router.get('/:idCompany', async (req, res) => {
  // Id de company inyectado por el Middleware checkToken!
  // console.log(req.courseId);

  try {
    const jobOffer = await getJobOfferByIdCompany(req.params.idCompany);
    res.json(jobOffer);
  } catch (error) {
    res.json({ error: error.message });
  }
});

// create company WITH MULTER

router.post('/', upload.single('image'), async (req, res) => {
  const extension = '.' + req.file.mimetype.split('/')[1];

  const newName = req.file.filename + extension;

  const newPath = req.file.path + extension;

  fs.renameSync(req.file.path, newPath);

  // including name of new picture to the DB
  req.body.image = newName;
  try {
    req.body.password = bcrypt.hashSync(req.body.password, 10);
    const result = await create(req.body);
    res.json(result);
  } catch (error) {
    res.status(422).json({ error: error.message });
  }
});

// Borro un company
router.delete('/', checkToken, async (req, res) => {
  try {
    const result = await deleteById(req.empresaId);
    res.json(result);
  } catch (error) {
    res.status(422).json({ error: error.message });
  }
});

// Actualizo una company using multer
router.put('/', upload.single('image'), checkToken, async (req, res) => {
  /*  console.log(req.body); */

  const extension = '.' + req.file.mimetype.split('/')[1];

  const newName = req.file.filename + extension;

  const newPath = req.file.path + extension;

  fs.renameSync(req.file.path, newPath);

  req.body.image = newName;
  try {
    req.body.id = req.empresaId;
    const result = await updateById(req.body);
    res.json(result);
  } catch (error) {
    res.status(422).json({ error: error.message });
    console.log(error);
  }
});

module.exports = router;
