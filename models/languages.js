// ALL languages
const getAll = () => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM languages', (err, rows) => {
      if (err) {
        return reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};
// ALL languages from a freelance
const getLanguagesByIdFreelance = (pId) => {
  return new Promise((resolve, reject) => {
    db.query(
      'SELECT languages.* FROM languages, usuario WHERE usuario.id = languages.fk_usuario AND usuario.id = ?',
      [pId],
      (err, rows) => {
        if (err) {
          return reject(err);
        } else {
          resolve(rows);
        }
      }
    );
  });
};

// ALL languages from a job offer
const getLanguagesByIdJobsOffers = (pId) => {
  return new Promise((resolve, reject) => {
    db.query(
      'SELECT languages.* FROM languages, ofertas_trabajos WHERE ofertas_trabajos.id = languages.fk_ofertas_trabajos AND ofertas_trabajos.id = ?',
      [pId],
      (err, rows) => {
        if (err) {
          return reject(err);
        } else {
          resolve(rows);
        }
      }
    );
  });
};

// NEW skill
const create = ({ skill }) => {
  return new Promise((resolve, reject) => {
    db.query(
      'INSERT INTO languages (skill) VALUES (?)',
      [languages],
      (err, result) => {
        if (err) return reject(err);
        resolve(result);
      }
    );
  });
};

// UPDATE skill
const updateById = ({ id, skill }) => {
  return new Promise((resolve, reject) => {
    db.query(
      'UPDATE languages set languages = ?,  WHERE id = ?',
      [languages, id],
      (err, result) => {
        if (err) return reject(err);
        resolve(result);
      }
    );
  });
};

// DELETE skill
const deleteById = (pId) => {
  return new Promise((resolve, reject) => {
    db.query('DELETE from languages WHERE id = ?', [pId], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

module.exports = {
  getAll,
  create,
  updateById,
  deleteById,
  getLanguagesByIdFreelance,
  getLanguagesByIdJobsOffers,
};
