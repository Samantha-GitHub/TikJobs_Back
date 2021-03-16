const faker = require('faker');

let insert = `INSERT INTO tikjob.ofertas_trabajos (function_department,responsabilities,city,country,starting_date,hour_week) VALUES`;

for (let i = 0; i <= 50; i++) {
  insert += `(
"${faker.name.jobTitle()}",
"${faker.commerce.productDescription()}",
"${faker.address.city()}",
"${faker.address.country()}",
FROM_UNIXTIME(RAND() * (UNIX_TIMESTAMP() - UNIX_TIMESTAMP('2021-01-01')) + UNIX_TIMESTAMP('2025-01-01')),
"${faker.address.country()},
40"),
`;
}
console.log(insert);
