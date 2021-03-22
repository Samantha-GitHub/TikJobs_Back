// NEW fk_skill con fk_ofertas_trabajos
const create = ({ fk_skills, fk_ofertas_trabajos }) => {
    return new Promise((resolve, reject) => {
        db.query(
            'INSERT INTO tbi_skills_ofertas_trabajos (fk_skills, fk_ofertas_trabajos) VALUES (?,?)',
            [fk_skills, fk_ofertas_trabajos],
            (err, result) => {
                if (err) return reject(err);
                resolve(result);
            }
        );
    });
};

// UPDATE fk_skill con fk_ofertas_trabajos
const updateById = ({ fk_skills, fk_ofertas_trabajos, id }) => {
    return new Promise((resolve, reject) => {
        db.query(
            'UPDATE tbi_skills_ofertas_trabajos set fk_skills = ? AND fk_ofertas_trabajos= ?  WHERE id = ?',
            [fk_skills, fk_ofertas_trabajos, id],
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
        db.query('DELETE from tbi_skills_ofertas_trabajos WHERE id = ?', [pId], (err, result) => {
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