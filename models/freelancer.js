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

// UPDATE FREELANCER
const updateById = ({
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
};
