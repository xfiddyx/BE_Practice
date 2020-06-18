const knex = require('knex');
const dbConfig = require('./knexfile.js');

const client = knex(dbConfig);

module.exports = client;
