const faker = require('faker');

for (let i = 0; i <= 50; i++) {
  const insert = `INSERT INTO tikjob.usuario
(
firstname,
lastname,
email,
phone,
gender,
country,
city,
zipcode,
streetName,
website,
image,
video,
job_title,
profile
    )
VALUES
('${faker.name.firstName()}',
'${faker.name.lastName()}',
'${faker.internet.email()}',
'${faker.phone.phone()}',
'${faker.name.gender()}',
'${faker.phone.phone()}',
'${faker.address.country()}',
'${faker.address.zipCode()}',
'${faker.address.streetAddress()}',
'website',
'${faker.image.avatar()}',
'video',
'${faker.name.jobTitle()}',
'${faker.lorem.paragraph()}');
`;
}
