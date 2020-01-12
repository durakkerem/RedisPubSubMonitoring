/**
 * Worker node - Asynchronously fetch random data from server
 * (mocking actual event)
 */
const schedule = require("node-schedule");
const request = require("request-promise");

const queries = {
  REVIEWCOUNT: `
    mutation {
      reviewCount {
        percentage
      }
    }
    `,
  TRAFFIC: `
    mutation {
      traffic {
        total
        dps {
          timestamp
          value
        }
      }
    }
    `,
  DISTRIBUTION: `
    mutation {
      distribution {
        x
        percentage
      }
    }
    `,
  REVIEWS: `
    mutation {
      reviews {
        reviewerName
        description
        starRating
        timestamp
      }
    }
    `,
  ACTIVITY: `
    mutation {
      activity {
        reviewerName
        description
        starRating
        timestamp
      }
    }
    `
};

const makeHttpRequest = async component => {
  const options = {
    uri: "http://localhost:4000",
    method: "POST",
    json: true,
    body: {
      operationName: null,
      variables: {},
      query: queries[component]
    }
  };
  console.log(options);
  await request(options);
};

const start = async () => {
  console.log("Starting worker");

  const s1 = schedule.scheduleJob("*/3 * * * * *", async () => {
    await makeHttpRequest("REVIEWCOUNT");
    console.log("Fetched new results for REVIEWCOUNT");
  });
  const s3 = schedule.scheduleJob("*/4 * * * * *", async () => {
    await makeHttpRequest("DISTRIBUTION");
    console.log("Fetched new results for DISTRIBUTION");
  });
  const s4 = schedule.scheduleJob("*/30 * * * * *", async () => {
    await makeHttpRequest("REVIEWS");
    console.log("Fetched new results for REVIEWS");
  });
  const s5 = schedule.scheduleJob("*/3 * * * * *", async () => {
    await makeHttpRequest("ACTIVITY");
    console.log("Fetched new results for ACTIVITY");
  });
  console.log(
    "Scheduled Jobs for REVIEWCOUNT, distribution, messages and REVIEWS and ACTIVITY"
  );
};

start();
