const app = require('./app');
const env = require('./config/env');

require("./config/redis");


app.listen(env.PORT, () => {
  console.log(`Server is running on port ${env.PORT}`);
});