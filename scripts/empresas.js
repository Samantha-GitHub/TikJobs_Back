const faker = require('faker');

let insert = `INSERT INTO  tikjob.empresa (name_company,phone,vat,street,city,zip_code,country,website,image,email,employees_number,year_founded) VALUES`;

for (let i = 0; i <= 45; i++) {
  insert += `(
"${faker.company.companyName()}",
"${faker.phone.phoneNumberFormat().replace(/\-/g, '')}", 
${faker.finance.account()},
"${faker.address.streetAddress()}",
"${faker.address.city()}",
${faker.address.zipCode()},
"${faker.address.country()}",
NULL,
"${faker.image.business()}",
"${faker.internet.email()}",
"${faker.random.number()}",
FROM_UNIXTIME(RAND() * (UNIX_TIMESTAMP() - UNIX_TIMESTAMP('1990-01-01')) + UNIX_TIMESTAMP('2021-01-01'))),`;
}
console.log(insert);
