const faker = require('faker');

for (let i = 0; i <= 50; i++) {
  const insert = `INSERT INTO tikjob.usuario
(
function_department,
responsabilities,
location,
starting_date,
hour_week,
)
VALUES
(
'${faker.name.jobTitle()}',
'${faker.commerce.productDescription()}',
'${faker.address.city()},${faker.address.country()}',
'${faker.date.future()}',
'hour_week',
);
`;
}
