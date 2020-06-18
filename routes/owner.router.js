const ownersRouter = require('express').Router();

const { getAllOwners } = require('../controllers/owners.js');

ownersRouter.get('/', getAllOwners);

module.exports = ownersRouter;
