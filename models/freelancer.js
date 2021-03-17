const getAll = () => {

    return new Promise((resolve, reject) => {

        db.query('SELECT * FROM usuario', (err, rows) => {
            if (err) {
                return reject(err)
            } else {
                resolve(rows)
            }
        });
    });
}

module.exports = {
    getAll
};