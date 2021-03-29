// ALL FREELANCERS
const getAll = () => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM usuario', (err, rows) => {
      if (err) {
        return reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

// GET FREELANCERS BY ID
const getById = (pId) => {
  return new Promise((resolve, reject) => {
    db.query(
      'SELECT * FROM usuario WHERE usuario.id = ?',
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

// SEARCH BY FREELANCE
let searchFreelance = (name) => {
  return new Promise((resolve, reject) => {
    const searchFreelance = `SELECT * FROM usuario WHERE firstname LIKE '%${name}%' OR lastname LIKE '%${name}%' OR email LIKE '%${name}% OR country LIKE '%${name}% OR city LIKE '%${name}% OR job_title LIKE '%${name}%' `;
    //searchValues = [search,search,search,search]

    db.query(searchFreelance, function (errQuery, resQuery) {
      if (errQuery) {
        return reject(errQuery);
      } else {
        resolve(resQuery);
      }
    });
  });
};

// SEARCH EDUCATION DE FREELANCERS
let searchFreelanceEducation = (name) => {
  return new Promise((resolve, reject) => {
    const searchFreelanceEducation = `SELECT usuario.* FROM usuario JOIN education ON usuario.id= fk_usuario AND school LIKE '%${name}%' OR degree LIKE '%${name}%' `;
    db.query(searchFreelanceEducation, function (errQuery, resQuery) {
      if (errQuery) {
        return reject(errQuery);
      } else {
        resolve(resQuery);
      }
    });
  });
};

// NEW FREELANCE
const create = ({
  firstname,
  lastname,
  email,
  phone,
  gender,
  country,
  city,
  zipcode,
  streetName,
  website,
  image,
  video,
  job_title,
  profile,
  password,
  username,
}) => {
  return new Promise((resolve, reject) => {
    db.query(
      'INSERT INTO usuario (firstname,lastname,email,phone,gender,country,city,zipcode,streetName,website,image,video,job_title,profile, password, username) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [
        firstname,
        lastname,
        email,
        phone,
        gender,
        country,
        city,
        zipcode,
        streetName,
        website,
        image,
        video,
        job_title,
        profile,
        password,
        username,
      ],
      (err, result) => {
        if (err) return reject(err);
        resolve(result);
      }
    );
  });
};

// get by email
const getByEmail = (email) => {
  return new Promise((resolve, reject) => {
    //db.query('QUERY', [], (err, result) => { });

    db.query('select * from usuario WHERE email = ?', [email], (err, rows) => {
      if (err) return reject(err);
      if (rows.length === 0) return resolve(null);
      resolve(rows[0]);
    });
  });
};

// UPDATE FREELANCER
const updateById = ({
  id,
  firstname,
  lastname,
  email,
  phone,
  gender,
  country,
  city,
  zipcode,
  streetName,
  website,
  image,
  video,
  job_title,
  profile,
  password,
  username,
}) => {
  return new Promise((resolve, reject) => {
    db.query(
      'UPDATE usuario set firstname = ?, lastname = ?, email = ?, phone = ?, gender = ?, country = ?, city = ?, zipcode = ?, streetName = ?, website = ?, image = ?, video = ?, job_title = ?, profile = ?, password = ? , username = ?  WHERE id = ?',
      [
        firstname,
        lastname,
        email,
        phone,
        gender,
        country,
        city,
        zipcode,
        streetName,
        website,
        image,
        video,
        job_title,
        profile,
        password,
        username,
        id,
      ],
      (err, result) => {
        if (err) return reject(err);
        resolve(result);
      }
    );
  });
};

// DELETE FREELANCER
const deleteById = (pId) => {
  return new Promise((resolve, reject) => {
    db.query('DELETE from usuario WHERE id = ?', [pId], (err, result) => {
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
  getByEmail,
  searchFreelance,
  searchFreelanceEducation,
};
