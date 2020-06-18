const { getOwners } = require('../models/owners.js');

const getAllOwners = (req, res, next) => {
  console.log('in the contr');
  getOwners()
    .then((result) => {
      res.status(200).send({ owners: result });
    })
    .catch(console.log('theres an error'));
};

module.exports = { getAllOwners };
