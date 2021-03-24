const router = require('express').Router();
const { checkToken } = require('./middlewares');

const freelancersApiRouter = require('./api/freelancers');
const empresasApiRouter = require('./api/empresas');

const skillsApiRouter = require('./api/skills');
const ofertasApiRouter = require('./api/ofertas');
const coursesApiRouter = require('./api/courses');
const educationsApiRouter = require('./api/educations');
const profesionalExperienceApiRouter = require('./api/profesional_experience');
const languagesApiRouter = require('./api/languages');

const tbi_ofertas_trabajos_languages_ApiRouter = require('./api/tbi_ofertas_trabajos_languages');
const tbi_ofertas_trabajos_skills_ApiRouter = require('./api/tbi_ofertas_trabajos_skills');
const tbi_freelance_skills_Router = require('./api/tbi_freelancer_skills');
const tbi_freelance_languages_Router = require('./api/tbi_freelancer_languages');

router.use('/freelancers', freelancersApiRouter);
router.use('/companies', empresasApiRouter);
router.use('/skills', skillsApiRouter);
router.use('/job_offers', ofertasApiRouter);
router.use('/courses', coursesApiRouter);
router.use('/educations', educationsApiRouter);
router.use('/profesional_experience', profesionalExperienceApiRouter);
router.use('/languages', languagesApiRouter);
router.use('/users', languagesApiRouter);
router.use(
  '/tbi_ofertas_trabajos_skills',
  tbi_ofertas_trabajos_skills_ApiRouter
);
router.use(
  '/tbi_ofertas_trabajos_languages',
  tbi_ofertas_trabajos_languages_ApiRouter
);
router.use('/tbi_freelance_skills', tbi_freelance_skills_Router);
router.use('/tbi_freelance_languages', tbi_freelance_languages_Router);

module.exports = router;
