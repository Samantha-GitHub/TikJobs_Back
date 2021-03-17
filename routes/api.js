const router = require('express').Router();
// const { checkToken } = require('./middlewares');

const freelancersApiRouter = require('./api/freelancers');
const empresasApiRouter = require('./api/empresas');
const skillsApiRouter = require('./api/skills');
const ofertasApiRouter = require('./api/ofertas');

router.use('/freelancers', freelancersApiRouter);
router.use('/companies', empresasApiRouter);
router.use('/skills', skillsApiRouter);
router.use('/job_offers', ofertasApiRouter);

module.exports = router;
