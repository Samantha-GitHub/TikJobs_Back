const {
  getAll,
  create,
  deleteById,
  updateById,
} = require('../../models/oferta');

const router = require('express').Router();

// Recupera todos los job offers y devuelve JSON
router.get('/', async (req, res) => {
  // Id de job Offer inyectado por el Middleware checkToken!
  // console.log(req.job_offerId);

  try {
    const jobOffer = await getAll();
    res.json(jobOffer);
  } catch (error) {
    res.json({ error: error.message });
  }
});

// Crear un nuevo job offer
// Los datos para crear job offer, me llegan a través del BODY
router.post('/', async (req, res) => {
  try {
    const result = await create(req.body);
    res.json(result);
  } catch (error) {
    res.status(422).json({ error: error.message });
  }
});

// Borro un job offer
router.delete('/:idJob_offer', async (req, res) => {
  try {
    const result = await deleteById(req.params.idJob_offer);
    res.json(result);
  } catch (error) {
    res.status(422).json({ error: error.message });
  }
});

// Actualizo un job offers\
router.put('/', async (req, res) => {
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
