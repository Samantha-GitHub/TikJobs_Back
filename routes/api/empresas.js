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
  // Compruebo si el email está en la BD
  const company = await getByEmail(req.body.email);
  /*   console.log(company); */
  if (company) {
    // Compruebo si las password coinciden
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

    /* 
        para  poder poner la caducidad a 15mins despues de la fecha de peticion hemos instalado la libreria dayjs con  npm install dayjs . 
        unix es la unidad de mesura del tiempo
    */

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
    /*  const skills = await getSkillsByIdJobsOffers(req.empresaId);
     const languages = await getLanguagesByIdJobsOffers(req.empresaId);
     jobOffer.skills = skills;
     jobOffer.languages = languages; */
    res.json(company);
    /* console.log('req.empresaId', req.empresaId);
    console.log(company); */
  } catch (error) {
    /* console.log(error); */
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

// Recupera El detalle de la empresa por oferta trabajo
/* router.getCompanyDetailByJobOffer('/:idJobOffer', async (req, res) => {
  try {
    const jobOffer = await getById(req.params.idJobOffer);
    res.json(jobOffer);
  } catch (error) {
    res.json({ error: error.message });
  }
}); */

// Recupera todos los JOB OFFER de un company y devuelve JSON
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

/* // Crear un nuevo company
// Los datos para crear el company, me llegan a través del BODY
router.post('/', async (req, res) => {
  try {
    req.body.password = bcrypt.hashSync(req.body.password, 10);
    const result = await create(req.body);
    res.json(result);
  } catch (error) {
    res.status(422).json({ error: error.message });
  }
}); */

// Crear un nuevo company WITH MULTER
// Los datos para crear el company, me llegan a través del BODY
router.post('/', upload.single('image'), async (req, res) => {
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

// // Actualizo una company
// router.put('/', checkToken, async (req, res) => {
//   /*  console.log(req.body); */
//   try {
//     // WE CANT UPDATE AN ALREADY HASHED PASSWORD. GOTTTA CREATE A NEW ONE
//     // req.body.password = bcrypt.hashSync(req.body.password, 10);
//     req.body.id = req.empresaId;
//     const result = await updateById(req.body);
//     res.json(result);
//   } catch (error) {
//     res.status(422).json({ error: error.message });
//     console.log(error);
//   }
// });

// Actualizo una company
router.put('/', upload.single('image'), checkToken, async (req, res) => {
  /*  console.log(req.body); */
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
    // WE CANT UPDATE AN ALREADY HASHED PASSWORD. GOTTTA CREATE A NEW ONE
    // req.body.password = bcrypt.hashSync(req.body.password, 10);
    req.body.id = req.empresaId;
    const result = await updateById(req.body);
    res.json(result);
  } catch (error) {
    res.status(422).json({ error: error.message });
    console.log(error);
  }
});


module.exports = router;
