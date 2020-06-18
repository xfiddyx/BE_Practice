const apiRouter = require('express').Router();
const ownersRouter = require('./owner.router');
console.log('api');
apiRouter.use('/owners', ownersRouter);

module.exports = apiRouter;
