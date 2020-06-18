const ENV = process.NODE_ENV || 'development';

const dbConfig = {
  development: {
    client: 'pg',
    connection: {
      database: 'companies_data',
    },
    seeds: {
      directory: './db/seeds',
    },
  },
  test: {
    client: 'pg',
    connection: {
      database: 'companies_data',
    },
    seeds: {
      directory: './db/seeds',
    },
  },
};

module.exports = dbConfig[ENV];
