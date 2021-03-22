// ALL COMPANIES
const getAll = () => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM empresa', (err, rows) => {
      if (err) {
        return reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

// GET Company BY ID
const getById = (pId) => {
  return new Promise((resolve, reject) => {
    db.query(
      'SELECT * FROM empresa WHERE usuario.id = ?',
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

// GET Detalle del a Empresa que ha publicado una oferta
/* const getCompanyDetailByJobOffer = (pId) => {
  return new Promise((resolve, reject) => {
    db.query(
      'SELECT empresa.* FROM empresa, ofertas_trabajos WHERE empresa.id = ofertas_trabajos.fk_empresa AND ofertas_trabajos.id = ?',
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
}; */

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

// NEW COMPANY
const create = ({
  name_company,
  phone,
  vat,
  street,
  city,
  zip_code,
  country,
  website,
  image,
  email,
  employees_number,
  year_founded,
}) => {
  return new Promise((resolve, reject) => {
    db.query(
      'INSERT INTO empresa (name_company,phone,vat,street,city,zip_code,country,website,image,email,employees_number,year_founded) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [
        name_company,
        phone,
        vat,
        street,
        city,
        zip_code,
        country,
        website,
        image,
        email,
        employees_number,
        year_founded,
      ],
      (err, result) => {
        if (err) return reject(err);
        resolve(result);
      }
    );
  });
};

// CREATE Company USER
const createUser = ({ username, email, password }) => {
  return new Promise((resolve, reject) => {
    db.query(
      'insert into usuarios (username, email, password, fecha_registro) values (?, ?, ?, ?, ?)',
      [username, email, password, new Date()],
      (err, result) => {
        if (err) return reject(err);
        resolve(result);
      }
    );
  });
};

// search by email
const getByEmail = (email) => {
  return new Promise((resolve, reject) => {
    //db.query('QUERY', [], (err, result) => { });

    db.query('select * from usuarios where email = ?', [email], (err, rows) => {
      if (err) return reject(err);
      if (rows.length === 0) return resolve(null);
      resolve(rows[0]);
    });
  });
};

// UPDATE COMPANY
const updateById = ({
  id,
  name_company,
  phone,
  vat,
  street,
  city,
  zip_code,
  country,
  website,
  image,
  email,
  employees_number,
  year_founded,
}) => {
  return new Promise((resolve, reject) => {
    db.query(
      'UPDATE empresa set name_company = ?, phone = ?, vat = ?, street = ?, city = ?, zip_code = ?, country = ?, website = ?, image = ?, email = ?, employees_number = ?, year_founded = ?,  WHERE id = ?',
      [
        name_company,
        phone,
        vat,
        street,
        city,
        zip_code,
        country,
        website,
        image,
        email,
        employees_number,
        year_founded,
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
    db.query('DELETE from empresa WHERE id = ?', [pId], (err, result) => {
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
  getById,
  getJobOfferByIdCompany,
  /* getCompanyDetailByJobOffer */
};
