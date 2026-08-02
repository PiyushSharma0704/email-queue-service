const dotenv = require('dotenv');

dotenv.config();

const env = {
  PORT: process.env.PORT || 3000,
  REDIS_HOST: process.env.REDIS_HOST || 'localhost',
  REDIS_PORT: process.env.REDIS_PORT || 6379,
};

module.exports = env;