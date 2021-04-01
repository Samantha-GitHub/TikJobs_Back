/* Fichero de configuracion de BD mySQL */

const mysql = require('mysql');

// Conectamos con la BD cuando arranque la applicacion

/* const connect = () => {
  const pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    port: 3306,
    database: 'tikjob',
  });

  // gracias a  global., en cualquier parte de mi proyecto, si accedo a una variable db que acabo de crear, me va a recuperar el valor del pool

  global.db = pool;
}; */

const connect = () => {
  const pool = mysql.createPool({
    host: 'eu-cdbr-west-01.cleardb.com',
    user: 'b3498f608edc66',
    password: '1c068d17',
    port: 3306,
    database: 'heroku_5363593fcd2cc93',
  });

  // gracias a  global., en cualquier parte de mi proyecto, si accedo a una variable db que acabo de crear, me va a recuperar el valor del pool

  global.db = pool;
};

module.exports = connect;

/* Fin fichero de configuracion de BD mySQL */
