// HOW TO CREATE A METHOD THAT RELATES COURSE WITH FREELANCER
// ALL skills
const getAll = () => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM skills', (err, rows) => {
      if (err) {
        return reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};
// ALL skills from a freelance
const getSkillsByIdFreelance = (pId) => {
  return new Promise((resolve, reject) => {
    db.query(
      'SELECT skills.* FROM skills, usuario WHERE usuario.id = skills.fk_usuario AND usuario.id = ?',
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

// NEW skill
const create = ({ skill }) => {
  return new Promise((resolve, reject) => {
    db.query(
      'INSERT INTO skills (skill) VALUES (?)',
      [skill],
      (err, result) => {
        if (err) return reject(err);
        resolve(result);
      }
    );
  });
};

// UPDATE skill
const updateById = ({ id, skill }) => {
  return new Promise((resolve, reject) => {
    db.query(
      'UPDATE skills set skill = ?,  WHERE id = ?',
      [skill, id],
      (err, result) => {
        if (err) return reject(err);
        resolve(result);
      }
    );
  });
};

// DELETE skill
const deleteById = (pId) => {
  return new Promise((resolve, reject) => {
    db.query('DELETE from skills WHERE id = ?', [pId], (err, result) => {
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
  getSkillsByIdFreelance,
};
