// NEW fk_skill con fk_usuario
const create = (fk_usuario, fk_skill) => {
  return new Promise((resolve, reject) => {
    db.query(
      'INSERT INTO tbi_skills_usuario (fk_usuario, fk_skill) VALUES (?,?)',
      [fk_usuario, fk_skill],
      (err, result) => {
        if (err) return reject(err);
        resolve(result);
      }
    );
  });
};

// UPDATE fk_skill con fk_ofertas_trabajos
const updateById = (fk_usuario, fk_skill, id) => {
  return new Promise((resolve, reject) => {
    db.query(
      'UPDATE tbi_skills_usuario set fk_usuario= ? AND fk_skill = ? WHERE id = ?',
      [fk_usuario, fk_skill, id],
      (err, result) => {
        if (err) return reject(err);
        resolve(result);
      }
    );
  });
};

// DELETE fk_skill con fk_ofertas_trabajos
const deleteById = (pId) => {
  return new Promise((resolve, reject) => {
    db.query(
      'DELETE from tbi_skills_usuario WHERE id = ?',
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
};
