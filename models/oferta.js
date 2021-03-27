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

// GET Job Offer BY ID
const getByIdOffer = (pId) => {
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

// GET Job Offer BY COUNTRY
const getByCountry = (pName) => {
  return new Promise((resolve, reject) => {
    db.query(
      'SELECT * FROM ofertas_trabajos WHERE ofertas_trabajos.country = ?',
      [pName],
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

// GET SEARCH LIKE
let searchData = (name) => {
  return new Promise((resolve, reject) => {
    const searchJob = `SELECT * FROM ofertas_trabajos WHERE country LIKE '%${name}%' OR city LIKE '%${name}%' OR function_department LIKE '%${name}%' `;
    //searchValues = [search,search,search,search]

    db.query(searchJob, function (errQuery, resQuery) {
      if (errQuery) {
        return reject(errQuery);
      } else {
        resolve(resQuery);
      }
    });
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
  fk_empresa,
}) => {
  return new Promise((resolve, reject) => {
    db.query(
      'INSERT INTO ofertas_trabajos (function_department,responsabilities,city,country,starting_date,hour_week, fk_empresa) VALUES (?, ?, ?, ?, ?, ?,?)',
      [
        function_department,
        responsabilities,
        city,
        country,
        starting_date,
        hour_week,
        fk_empresa,
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
      'UPDATE ofertas_trabajos set function_department = ?, responsabilities = ?, city = ?, country = ?, starting_date = ?, hour_week = ?  WHERE id = ? ',
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

// DELETE ONE JOB OFFER
const deleteByIdToken = ({ id, fk_empresa }) => {
  return new Promise((resolve, reject) => {
    db.query(
      'DELETE from ofertas_trabajos WHERE id = ? AND fk_empresa = ?',
      [id, fk_empresa],
      (err, result) => {
        if (err) return reject(err);
        resolve(result);
      }
    );
  });
};

// DELETE ALL JOBS OFFERS
const deleteAll = ({ fk_empresa }) => {
  return new Promise((resolve, reject) => {
    db.query(
      'DELETE from ofertas_trabajos WHERE AND fk_empresa = ?',
      [fk_empresa],
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
  deleteByIdToken,
  getById,
  getByCountry,
  searchData,
  getByIdOffer,
  deleteAll,
};
