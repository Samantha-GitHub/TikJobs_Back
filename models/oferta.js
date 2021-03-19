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
      'SELECT * FROM ofertas_trabajos WHERE ofertas_trabajos.id = ?',
      [pId],
      (err, rows) => {
        if (err) {
          return reject(err);
        } else {
          resolve(rows[0]);
        }
      }
    );
  });
};

// ALL JobOffers from a company
const getJobOfferByIdCompany = (pId) => {
  return new Promise((resolve, reject) => {
    db.query(
      'SELECT ofertas_trabajos.* FROM ofertas_trabajos, empresa WHERE empresa.id = ofertas_trabajos.fk_empresa AND empresa.id = ?',
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

// NEW JOB OFFER
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

// UPDATE JOB OFFER
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

// DELETE JOB OFFER
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
  getJobOfferByIdCompany,
};
