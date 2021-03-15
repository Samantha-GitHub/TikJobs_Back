const faker = require('faker');

for (let i = 0; i < 50; i++) {
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
<{phone: }>,
<{vat: }>,
<{street: }>,
<{city: }>,
<{zip_code: }>,
<{country: }>,
<{website: }>,
<{image: }>,
<{email: }>,
<{employees_number: }>,
<{year_founded: }>);
`
}