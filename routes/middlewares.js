const jwt = require('jsonwebtoken');
const dayjs = require('dayjs');

const checkToken = (req, res, next) => {
  if (!req.headers['authorization']) {
    return res.json({ error: 'You mus includes the headers Authorization' });
  }

  const token = req.headers['authorization'];
  let data;
  try {
    data = jwt.verify(token, 'tikjobs');
  } catch (error) {
    return res.json({ error: "The token isn't correct" });
  }

  if (dayjs().unix() > data.caduca) {
    return res.json({ error: 'The token expired' });
  }

  req.empresaId = data.companyId;
  req.userId = data.userId;

  next();
};

module.exports = {
  checkToken,
};
