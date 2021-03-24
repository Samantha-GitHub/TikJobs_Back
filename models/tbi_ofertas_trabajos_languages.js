// NEW fk_skill con fk_languages
const create = (fk_languages, fk_ofertas_trabajos) => {
    return new Promise((resolve, reject) => {
        db.query(
            'INSERT INTO tbi_languages_ofertas_trabajos (fk_languages, fk_ofertas_trabajos) VALUES (?,?)',
            [fk_languages, fk_ofertas_trabajos],
            (err, result) => {
                if (err) return reject(err);
                resolve(result);
            }
        );
    });
};

// UPDATE fk_skill y fk_languages
const updateById = (fk_languages, fk_ofertas_trabajos, id) => {
    return new Promise((resolve, reject) => {
        db.query(
            'UPDATE tbi_languages_ofertas_trabajos set fk_languages = ? , fk_ofertas_trabajos = ?  WHERE id = ?;',
            [fk_languages, fk_ofertas_trabajos, id],
            (err, result) => {
                if (err) return reject(err);
                resolve(result);
            }
        );
    });
};

// DELETE fk_skill y fk_languages
const deleteById = (pId) => {
    return new Promise((resolve, reject) => {
        db.query('DELETE from tbi_languages_ofertas_trabajos WHERE id = ?', [pId], (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
};

module.exports = {
    create,
    updateById,
    deleteById
};