const faker = require('faker');

let insert = `INSERT INTO tikjob.ofertas_trabajos (function_department,responsabilities,city,starting_date,hour_week,country) VALUES`;

for (let i = 0; i <= 1; i++) {

  insert += `(
"${faker.name.jobTitle()}",
"${faker.commerce.productDescription()}",
"${faker.address.city()}",
FROM_UNIXTIME(RAND() * (UNIX_TIMESTAMP() - UNIX_TIMESTAMP('2021-01-01')) + UNIX_TIMESTAMP('2025-01-01')),
40,
"${faker.address.country()}"),
`;

}
console.log(insert);