// ALL profesioanl experiences from a freelance
const getProfesionalExperienceByIdFreelance = (pId) => {
  return new Promise((resolve, reject) => {
    db.query(
      'SELECT profesional_experience.* FROM profesional_experience, usuario WHERE usuario.id = profesional_experience.fk_usuario AND usuario.id = ?',
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
const create = ({
  employer,
  job_title,
  city,
  country,
  start_date,
  end_date,
  company_link,
  description,
  fk_usuario,
}) => {
  return new Promise((resolve, reject) => {
    db.query(
      'INSERT INTO profesional_experience (employer, job_title, city,country, start_date, end_date, company_link, description,fk_usuario) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [
        employer,
        job_title,
        city,
        country,
        start_date,
        end_date,
        company_link,
        description,
        fk_usuario,
      ],
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
  employer,
  job_title,
  city,
  country,
  start_date,
  end_date,
  company_link,
  description,
  fk_usuario,
}) => {
  return new Promise((resolve, reject) => {
    db.query(
      'UPDATE profesional_experience set employer = ?, job_title = ?, city = ?, country = ?, start_date = ?, end_date = ?, company_link = ?, description= ? WHERE id = ?',
      [
        employer,
        job_title,
        city,
        country,
        start_date,
        end_date,
        company_link,
        description,
        fk_usuario,
        id,
      ],
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
    db.query(
      'DELETE from profesional_experience WHERE id = ?',
      [pId],
      (err, result) => {
        if (err) return reject(err);
        resolve(result);
      }
    );
  });
};

module.exports = {
  create,
  updateById,
  deleteById,
  getProfesionalExperienceByIdFreelance,
};
