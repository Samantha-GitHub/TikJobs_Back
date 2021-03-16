const faker = require('faker');

let insert = `INSERT INTO tikjob.usuario (firstname,lastname,email,phone,gender,country,city,zipcode,streetName,website,image,video,job_title,profile) VALUES`;

for (let i = 0; i <= 30; i++) {
  insert += `(
"${faker.name.firstName()}",
"${faker.name.lastName()}",
"${faker.internet.email()}",
"${faker.phone.phoneNumberFormat().replace(/\-/g, '')}",
"M",
"${faker.address.country()}",
"${faker.address.city()}",
"${faker.address.zipCode()}",
"${faker.address.streetAddress()}",
NULL,
"${faker.image.avatar()}",
NULL,
"${faker.name.jobTitle()}",
"${faker.lorem.paragraph()}"),`;
}
console.log(insert);
