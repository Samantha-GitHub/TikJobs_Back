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
};
