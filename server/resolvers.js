const pubsub = require("./pubsub");
const {
  reviewCountData,
  regionData,
  reviewData,
  trafficData
} = require("./utils/generator");
console.log(reviewCountData());
const { get, set } = require("./utils/redis");

const COMPONENTS = {
  REVIEWCOUNT: "reviewCount",
  TRAFFIC: "traffic",
  DISTRIBUTION: "distribution",
  REVIEWS: "reviews"
};

/**
 * (1) Get random data for `component` by calling `generator` function
 * (2) Publish the data to channel for `component`
 * (3) Cache the data in redis against key `component`
 *
 * @param {function} generator - Corresponding data generator function for `component`
 * @param {string} component
 */
const publishRandomData = async (generator, component) => {
  const data = generator();

  pubsub.publish(component, { [component]: data });
  await set(component, data);
  return data;
};

module.exports = {
  Query: {
    reviewCount: () => get(COMPONENTS.REVIEWCOUNT),
    traffic: () => get(COMPONENTS.TRAFFIC),
    distribution: () => get(COMPONENTS.DISTRIBUTION),
    reviews: () => get(COMPONENTS.REVIEWS)
  },
  Mutation: {
    reviewCount: () =>
      publishRandomData(reviewCountData, COMPONENTS.REVIEWCOUNT),
    traffic: () => publishRandomData(trafficData, COMPONENTS.TRAFFIC),
    distribution: () => publishRandomData(regionData, COMPONENTS.DISTRIBUTION),
    reviews: () => publishRandomData(reviewData, COMPONENTS.REVIEWS)
  },
  Subscription: {
    reviewCount: {
      subscribe: () => pubsub.asyncIterator(COMPONENTS.REVIEWCOUNT)
    },
    traffic: {
      subscribe: () => pubsub.asyncIterator(COMPONENTS.TRAFFIC)
    },
    distribution: {
      subscribe: () => pubsub.asyncIterator(COMPONENTS.DISTRIBUTION)
    },
    reviews: {
      subscribe: () => pubsub.asyncIterator(COMPONENTS.REVIEWS)
    }
  }
};
