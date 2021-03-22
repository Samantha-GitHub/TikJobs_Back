const router = require('express').Router();
// const { checkToken } = require('./middlewares');

const freelancersApiRouter = require('./api/freelancers');
const empresasApiRouter = require('./api/empresas');
const skillsApiRouter = require('./api/skills');
const ofertasApiRouter = require('./api/ofertas');
const coursesApiRouter = require('./api/courses');
const educationsApiRouter = require('./api/educations');
const profesionalExperienceApiRouter = require('./api/profesional_experience');
const languagesApiRouter = require('./api/languages');
const usersApiRouter = require('./api/users');
const tbi_ofertas_trabajos_languages_ApiRouter = require('./api/tbi_ofertas_trabajos_languages');
const tbi_ofertas_trabajos_skills_ApiRouter = require('./api/tbi_ofertas_trabajos_skills');

router.use('/freelancers', freelancersApiRouter);
router.use('/companies', empresasApiRouter);
router.use('/skills', skillsApiRouter);
router.use('/job_offers', ofertasApiRouter);
router.use('/courses', coursesApiRouter);
router.use('/educations', educationsApiRouter);
router.use('/profesional_experience', profesionalExperienceApiRouter);
router.use('/languages', languagesApiRouter);
router.use('/users', languagesApiRouter);
router.use('/tbi_ofertas_trabajos_skills', tbi_ofertas_trabajos_skills_ApiRouter);
router.use('/tbi_ofertas_trabajos_languages', tbi_ofertas_trabajos_languages_ApiRouter);


module.exports = router;
