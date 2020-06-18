const express = require('express');

const app = express();

// app.use('/api', apiRouter);

app.use(express.json());

module.exports = app;
