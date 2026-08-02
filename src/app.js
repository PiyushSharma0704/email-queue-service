const express = require('express');
const healthRoutes = require('./routes/health.routes');
const emailRoutes = require("./routes/email.routes");

const { PORT } = require('./config/env');

const app = express();
app.use(express.json());
app.use('/api', healthRoutes);
app.use("/api/emails", emailRoutes);



module.exports = app;