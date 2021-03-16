// CREO QUE EN DB DEBERIA SER SOLO UNA SKILL Y POR FK SE LE OTORGA A FREELANCER O JOB OFFER

const faker = require('faker');

let insert = `INSERT INTO tikjob.skills (skill) VALUES`;

for (let i = 0; i <= 50; i++) {
  insert += `
(
"${faker.name.jobArea()}"
),
`;
}
console.log(insert);
