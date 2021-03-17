const router = require('express').Router();
const { getAll } = require('../../models/empresa');

// http://localhost:3000/company/

router.get('/', async (req, res, next) => {
  try {
    const getAllEmpresas = await getAll();
    res.json(getAllEmpresas);
  } catch (error) {
    res.json({ error: error.message });
  }
});

module.exports = router;
