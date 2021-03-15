const faker = require('faker');

const randomEmail = faker.internet.email();

for (let i = 0; i <= 50; i++) {
  const insert = `INSERT INTO tikjob.empresa
(
name_company,
phone,
vat,
street,
city,
zip_code,
country,
website,
image,
email,
employees_number,
year_founded)
VALUES
(
'${faker.company.companyName()}',
'${faker.phone.phoneNumber()}',
'${faker.finance.account()}',
'${faker.address.streetAddress()}',
'${faker.address.city()}',
'${faker.address.zipCode()}',
'${faker.address.country()}',
<{website: }>,
'${faker.image.business()}',
'${faker.internet.email()}',
'${faker.random.number()}',
'${faker.date.past()}'
`;
}

console.log(randomEmail);
