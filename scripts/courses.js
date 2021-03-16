const faker = require('faker');

let insert = `INSERT INTO tikjob.courses (course_title,institution,city,country,course_link,start_date,end_date) VALUES`;

for (let i = 0; i <= 50; i++) {
  insert += `
(
"${faker.name.jobTitle()}",
"${faker.name.findName()}",
"${faker.address.city()}",
"${faker.address.country()} ",
NULL,
FROM_UNIXTIME(RAND() * (UNIX_TIMESTAMP() - UNIX_TIMESTAMP('2020-01-01')) + UNIX_TIMESTAMP('2020-12-01')),
FROM_UNIXTIME(RAND() * (UNIX_TIMESTAMP() - UNIX_TIMESTAMP('2021-01-01')) + UNIX_TIMESTAMP('2021-12-01'))
),
`;
}
console.log(insert);
