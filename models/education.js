// ALL educationS from a freelance
const getEducationsByIdFreelance = (pId) => {
  return new Promise((resolve, reject) => {
    db.query(
      'SELECT education.* FROM education, usuario WHERE usuario.id = education.fk_usuario AND usuario.id = ?',
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

// NEW education
const create = ({ degree, school, city, country, start_date, end_date }) => {
  return new Promise((resolve, reject) => {
    db.query(
      'INSERT INTO educations (degree,school,city,country,start_date,end_date) VALUES (?, ?, ?, ?, ?, ?)',
      [degree, school, city, country, start_date, end_date],
      (err, result) => {
        if (err) return reject(err);
        resolve(result);
      }
    );
  });
};

// UPDATE education
const updateById = ({
  id,
  degree,
  school,
  city,
  country,
  start_date,
  end_date,
}) => {
  return new Promise((resolve, reject) => {
    db.query(
      'UPDATE education set degree = ?, school = ?, city = ?, country = ?, start_date = ?, end_date = ?,  WHERE id = ?',
      [degree, school, city, country, start_date, end_date, id],
      (err, result) => {
        if (err) return reject(err);
        resolve(result);
      }
    );
  });
};

// DELETE education
const deleteById = (pId) => {
  return new Promise((resolve, reject) => {
    db.query('DELETE from education WHERE id = ?', [pId], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

module.exports = {
  create,
  updateById,
  deleteById,
  getEducationsByIdFreelance,
};
