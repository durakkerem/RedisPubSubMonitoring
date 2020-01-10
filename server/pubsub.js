const { RedisPubSub } = require("graphql-redis-subscriptions");
const options = {
  host: process.env.REDIS_HOST || "127.0.0.1",
  port: process.env.REDIS_HOST_PORT || 6378,
  retryStrategy: times => {
    // reconnect after
    return Math.min(times * 50, 2000);
  }
};
const pubsub = new RedisPubSub({
  connection: options
});

module.exports = pubsub;
