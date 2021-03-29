// NEW fk_languages con fk_usuario
const create = (fk_usuario, fk_languages) => {
  return new Promise((resolve, reject) => {
    db.query(
      'INSERT INTO tbi_languages_usuario (fk_usuario, fk_languages) VALUES (?,?)',
      [fk_usuario, fk_languages],
      (err, result) => {
        if (err) return reject(err);
        resolve(result);
      }
    );
  });
};

// UPDATE fk_languages con fk_usuario
const updateById = (fk_usuario, fk_languages, id) => {
  return new Promise((resolve, reject) => {
    db.query(
      'UPDATE tbi_languages_usuario set fk_usuario= ? AND fk_languages = ? WHERE id = ?',
      [fk_usuario, fk_languages, id],
      (err, result) => {
        if (err) return reject(err);
        resolve(result);
      }
    );
  });
};

// DELETE fk_languages con fk_usuario
const deleteById = (id) => {
  return new Promise((resolve, reject) => {
    db.query(
      'DELETE from tbi_languages_usuario WHERE id = ?',
      [id],
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
