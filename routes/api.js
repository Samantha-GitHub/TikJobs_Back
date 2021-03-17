const router = require('express').Router();
// const { checkToken } = require('./middlewares');

const freelancersApiRouter = require('./api/freelancers');
const empresasApiRouter = require('./api/empresas');
const skillsApiRouter = require('./api/skills');
const ofertasApiRouter = require('./api/ofertas');
const coursesApiRouter = require('./api/courses');
const educationsApiRouter = require('./api/educations');
const profesionalExperienceApiRouter = require('./api/profesional_experience');

router.use('/freelancers', freelancersApiRouter);
router.use('/companies', empresasApiRouter);
router.use('/skills', skillsApiRouter);
router.use('/job_offers', ofertasApiRouter);
router.use('/courses', coursesApiRouter);
router.use('/educations', educationsApiRouter);
router.use('/profesional_experience', profesionalExperienceApiRouter);

module.exports = router;
