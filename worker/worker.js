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
        title
        description
        color
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
  const s2 = schedule.scheduleJob("*/5 * * * * *", async () => {
    await makeHttpRequest("TRAFFIC");
    console.log("Fetched new results for TRAFFIC");
  });
  const s3 = schedule.scheduleJob("*/4 * * * * *", async () => {
    await makeHttpRequest("DISTRIBUTION");
    console.log("Fetched new results for DISTRIBUTION");
  });
  const s4 = schedule.scheduleJob("*/3 * * * * *", async () => {
    await makeHttpRequest("REVIEWS");
    console.log("Fetched new results for REVIEWS");
  });
  console.log(
    "Scheduled Jobs for REVIEWCOUNT, Traffic, distribution, messages and REVIEWS"
  );
};

start();
