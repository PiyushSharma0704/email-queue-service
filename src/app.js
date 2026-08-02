const express = require('express');
const healthRoutes = require('./routes/health.routes');
const { PORT } = require('./config/env');

const app = express();
app.use(express.json());
app.use('/api', healthRoutes);


module.exports = app;