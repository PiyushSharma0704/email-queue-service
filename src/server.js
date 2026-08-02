const app = require('./app');
const env = require('./config/env');

require("./config/redis");
require("./workers/email.worker");
require("./queues/queue.events");

app.listen(env.PORT, () => {
  console.log(`Server is running on port ${env.PORT}`);
});