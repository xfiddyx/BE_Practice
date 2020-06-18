const client = require('../connection');

const getOwners = () => {
  console.log('in the model');
  return client.select('*').from('owners');
};

module.exports = { getOwners };
