// ALL COURSES from a freelance
const getCoursesByIdFreelance = (pId) => {
  return new Promise((resolve, reject) => {
    db.query(
      'SELECT courses.* FROM courses, usuario WHERE usuario.id = courses.fk_usuario AND usuario.id = ?',
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

// NEW COURSE
const create = ({
  course_title,
  institution,
  city,
  country,
  course_link,
  start_date,
  end_date,
}) => {
  return new Promise((resolve, reject) => {
    db.query(
      'INSERT INTO courses (course_title,institution,city,country,course_link,start_date,end_date) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [
        course_title,
        institution,
        city,
        country,
        course_link,
        start_date,
        end_date,
      ],
      (err, result) => {
        if (err) return reject(err);
        resolve(result);
      }
    );
  });
};

// UPDATE COURSE
const updateById = ({
  id,
  course_title,
  institution,
  city,
  country,
  course_link,
  start_date,
  end_date,
}) => {
  return new Promise((resolve, reject) => {
    db.query(
      'UPDATE courses set course_title = ?, institution = ?, city = ?, country = ?, course_link = ?, start_date = ?, end_date = ?  WHERE id = ?',
      [
        course_title,
        institution,
        city,
        country,
        course_link,
        start_date,
        end_date,
        id,
      ],
      (err, result) => {
        if (err) return reject(err);
        resolve(result);
      }
    );
  });
};

// DELETE COURSE
const deleteById = (pId) => {
  return new Promise((resolve, reject) => {
    db.query('DELETE from courses WHERE id = ?', [pId], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

module.exports = {
  create,
  updateById,
  deleteById,
  getCoursesByIdFreelance,
};
