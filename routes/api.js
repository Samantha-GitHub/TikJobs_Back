const router = require('express').Router();
// const { checkToken } = require('./middlewares');

const freelancersApiRouter = require('./api/freelancers');
const empresasApiRouter = require('./api/empresas');
const skillsApiRouter = require('./api/skills');
const ofertasApiRouter = require('./api/ofertas');
const coursesApiRouter = require('./api/courses');

router.use('/freelancers', freelancersApiRouter);
router.use('/companies', empresasApiRouter);
router.use('/skills', skillsApiRouter);
router.use('/job_offers', ofertasApiRouter);
router.use('/courses', coursesApiRouter);

module.exports = router;
