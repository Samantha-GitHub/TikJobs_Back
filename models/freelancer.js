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
}) => {
  return new Promise((resolve, reject) => {
    db.query(
      'INSERT INTO tikjob.usuario (firstname,lastname,email,phone,gender,country,city,zipcode,streetName,website,image,video,job_title,profile) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
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
      ],
      (err, result) => {
        if (err) return reject(err);
        resolve(result);
      }
    );
  });
};

// CREATE FREELANCER USER
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
}) => {
  return new Promise((resolve, reject) => {
    db.query(
      'UPDATE usuario set firstname = ?, lastname = ?, email = ?, phone = ?, gender = ?, country = ?, city = ?, zipcode = ?, streetName = ?, website = ?, image = ?, video = ?, job_title = ?, image = ?, profile = ?,  WHERE id = ?',
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
};
