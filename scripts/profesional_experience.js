const faker = require('faker');

let insert = `INSERT INTO tikjob.profesional_experience (employer,job_title,city,country,start_date,end_date,company_link,description) VALUES`;

for (let i = 0; i <= 50; i++) {
  insert += `(
"${faker.company.companyName()}",
"${faker.name.title()}",
"${faker.address.city()}",
"${faker.address.country()}",
FROM_UNIXTIME(RAND() * (UNIX_TIMESTAMP() - UNIX_TIMESTAMP('2020-01-01')) + UNIX_TIMESTAMP('2020-01-01')),
FROM_UNIXTIME(RAND() * (UNIX_TIMESTAMP() - UNIX_TIMESTAMP('2020-02-01')) + UNIX_TIMESTAMP('2025-12-01')),
NULL, 
"${faker.hacker.phrase()}"
),
`;
}
console.log(insert);
