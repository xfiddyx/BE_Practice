const { ownersData, companiesData, productsData } = require('../index');

const {
  formattedCompany,
  formattedProducts,
} = require('../../utils/seeddata.utils');

exports.seed = function (knex) {
  return knex
    .insert(ownersData)
    .into('owners')
    .returning('*')
    .then((owners) => {
      const formattedCompanies = formattedCompany(companiesData, owners);
      return knex.insert(formattedCompanies).into('companies').returning('*');
    })
    .then((results) => {
      const formattedProductData = formattedProducts(productsData, results);
      return knex.insert(formattedProductData).into('products').returning('*');
    });
};
