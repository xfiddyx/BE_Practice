const faker = require('faker');
const { sample, random } = require('lodash');
const { promisify } = require('util');
const fs = require('fs');

const mkdir = promisify(fs.mkdir);
const writeFile = promisify(fs.writeFile);

const generateUniques = (randomList, listLength, generator) => {
  if (listLength === 0) return randomList;
  const randomItem = generator();
  if (randomList.includes(randomItem))
    return generateUniques(randomList, listLength, generator);
  return generateUniques([randomItem, ...randomList], --listLength, generator);
};

const createRandomFirstName = () => faker.name.firstName();
const createRandomSurname = () => faker.name.lastName();
const createRandomCity = () => faker.address.city();
const createRandomCountry = () => faker.address.country();
const createRandomCompany = () => faker.company.companyName();

const uniqueFirstNames = generateUniques(
  [],
  100,
  createRandomFirstName,
  'firstNames'
);
const uniqueSurNames = generateUniques(
  [],
  100,
  createRandomSurname,
  'surNames'
);

const uniqueCity = generateUniques([], 30, createRandomCity, 'cities');
const uniqueCountry = generateUniques([], 10, createRandomCountry, 'countries');
const uniqueCompany = generateUniques(
  [],
  100,
  createRandomCompany,
  'companies'
);

const generateOwners = (firstNames, surNames, cities) => {
  return firstNames.map((name, i) => {
    return {
      forename: name,
      surname: surNames[i],
      age: random(16, 100),
      residence: sample(cities),
    };
  });
};

const generateCompany = (companies, owners, countries) => {
  return companies.map((comp) => {
    return {
      name: comp,
      established: random(1800, 2020),
      founder: sample(owners),
      bs: faker.company.bs(),
      head_office: sample(countries),
    };
  });
};

const product = (companies, productCount) => {
  return Array.from({ length: productCount }, () => {
    return {
      product: faker.commerce.product(),
      cost_of_product: random(5, 100000),
      company: sample(companies).name,
    };
  });
};

const generateFileText = (js) =>
  `module.exports = ${JSON.stringify(js, null, 2)}`;

module.exports = () => {
  const owners = generateOwners(uniqueFirstNames, uniqueSurNames, uniqueCity);
  const companies = generateCompany(uniqueCompany, owners, uniqueCountry);
  const products = product(companies, 2000);

  mkdir('../db/data/dev-data')
    .catch(() => console.log('overwriting'))
    .then(() => {
      return writeFile(
        './db/data/dev-data/owners.js',
        generateFileText(owners),
        'utf8'
      );
    })
    .then(() => {
      return writeFile(
        './db/data/dev-data/companies.js',
        generateFileText(companies),
        'utf8'
      );
    })
    .then(() => {
      return writeFile(
        './db/data/dev-data/products.js',
        generateFileText(products),
        'utf8'
      );
    });
};
