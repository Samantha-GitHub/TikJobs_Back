const router = require('express').Router();
const { create, getByEmail } = require('../../models/freelancer');
const bcrypt = require('bcryptjs');
const dayjs = require('dayjs');
const jwt = require('jsonwebtoken');

// Recibir a través del body los datos del nuevo usuario
// Con esos datos creamos un nuevo usuario en la BD
router.post('/registro', async (req, res) => {
  // Antes de crear el usuario, encriptar la password
  req.body.password = bcrypt.hashSync(req.body.password, 10);

  const result = await create(req.body);
  res.json(result);
});

// Body -> email, password
router.post('/login', async (req, res) => {
  // Compruebo si el email está en la BD
  const usuario = await getByEmail(req.body.email);
  if (usuario) {
    // Compruebo si las password coinciden
    const iguales = bcrypt.compareSync(req.body.password, usuario.password);
    if (iguales) {
      res.json({
        success: 'Login correcto!!',
        token: createToken(usuario),
      });
    } else {
      res.json({ error: 'Error en email y/o password2' });
    }
  } else {
    res.json({ error: 'Error en email y/o password1' });
  }
});

function createToken(pUser) {
  const data = {
    userId: pUser.id,
    caduca: dayjs().add(10, 'hours').unix(),
  };

  return jwt.sign(data, 'tikjobs');
}

module.exports = router;
