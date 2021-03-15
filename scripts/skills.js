// CREO QUE EN DB DEBERIA SER SOLO UNA SKILL Y POR FK SE LE OTORGA A FREELANCER O JOB OFFER

const faker = require('faker');

for (let i = 0; i <= 50; i++) {
  const insert = `INSERT INTO tikjob.usuario
(
skill,

)
VALUES
(
'${faker.name.jobTitle()}'
);
`;
}
