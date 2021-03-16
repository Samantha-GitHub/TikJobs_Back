const faker = require('faker');

const randomEmail = faker.internet.email();




for (let i = 0; i <= 45; i++) {
  const insert = `insert into tikjob.empresa
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
'${faker.phone.phoneNumberFormat().replace(/\-/g, "")}', 
${faker.finance.account()},
'${faker.address.streetAddress()}',
'${faker.address.city()}',
${faker.address.zipCode()},
'${faker.address.country()}',
NULL,
'${faker.image.business()}',
'${faker.internet.email()}',
'${faker.random.number()}',
NULL);`;
  console.log(insert);

}


/* console.log(randomEmail); */

