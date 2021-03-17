// ALL profesioanl experiences from a freelance
const getProfesionalExperienceByIdFreelance = (pId) => {
  return new Promise((resolve, reject) => {
    db.query(
      'SELECT profesional_experience.* FROM profesional_experience, usuario WHERE usuario.id = education.fk_usuario AND usuario.id = ?',
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

// NEW profesional_experience
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

// UPDATE profesional_experience
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

// DELETE profesional_experience
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
  getProfesionalExperienceByIdFreelance,
};
