const faker = require('faker');

let insert = `INSERT INTO tikjob.education (degree,school,city,country,start_date,end_date) VALUES`;

for (let i = 0; i <= 50; i++) {
  insert += `
(
"Graduate Certificate",
"${faker.name.findName()}",
"${faker.address.city()}",
"${faker.address.country()}",
FROM_UNIXTIME(RAND() * (UNIX_TIMESTAMP() - UNIX_TIMESTAMP('2021-01-01')) + UNIX_TIMESTAMP('2025-01-01')),
FROM_UNIXTIME(RAND() * (UNIX_TIMESTAMP() - UNIX_TIMESTAMP('2021-02-01')) + UNIX_TIMESTAMP('2025-02-01'))
),
`;
}
console.log(insert);
