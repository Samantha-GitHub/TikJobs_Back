// ALL JOBS
const getAll = () => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM ofertas_trabajos', (err, rows) => {
      if (err) {
        return reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

// GET Job Offer BY ID
const getById = (pId) => {
  return new Promise((resolve, reject) => {
    db.query(
      'SELECT * FROM ofertas_trabajos WHERE usuario.id = ?',
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

// NEW COMPANY
const create = ({
  function_department,
  responsabilities,
  city,
  country,
  starting_date,
  hour_week,
}) => {
  return new Promise((resolve, reject) => {
    db.query(
      'INSERT INTO ofertas_trabajos (function_department,responsabilities,city,country,starting_date,hour_week) VALUES (?, ?, ?, ?, ?, ?)',
      [
        function_department,
        responsabilities,
        city,
        country,
        starting_date,
        hour_week,
      ],
      (err, result) => {
        if (err) return reject(err);
        resolve(result);
      }
    );
  });
};

// UPDATE COMPANY
const updateById = ({
  id,
  function_department,
  responsabilities,
  city,
  country,
  starting_date,
  hour_week,
}) => {
  return new Promise((resolve, reject) => {
    db.query(
      'UPDATE ofertas_trabajos set function_department = ?, responsabilities = ?, city = ?, country = ?, starting_date = ?, hour_week = ?,  WHERE id = ?',
      [
        function_department,
        responsabilities,
        city,
        country,
        starting_date,
        hour_week,
        id,
      ],
      (err, result) => {
        if (err) return reject(err);
        resolve(result);
      }
    );
  });
};

// DELETE COMPANIES
const deleteById = (pId) => {
  return new Promise((resolve, reject) => {
    db.query(
      'DELETE from ofertas_trabajos WHERE id = ?',
      [pId],
      (err, result) => {
        if (err) return reject(err);
        resolve(result);
      }
    );
  });
};

module.exports = {
  getAll,
  create,
  updateById,
  deleteById,
  getById,
};
