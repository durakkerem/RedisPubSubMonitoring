/**
 * Random Data generator
 */
const moment = require("moment");

const reviewCountData = () => {
  const min = 20;
  const max = 90;
  const currentTime = moment();
  const ts = currentTime.unix();
  const percentage = parseInt((ts - parseInt(ts / 10000) * 10000) / 10);
  // const percentage = parseInt(Math.random() * (max - min) + min, 10);
  console.log("generator", percentage);
  return {
    percentage
  };
};

const timestamps = Array.from(Array(800).keys())
  .map(num => ({
    timestamp: 5 * num,
    value: parseInt(Math.random() * 100, 10)
  }))
  .reverse();

const trafficData = () => {
  const currentTime = moment();
  const ts = currentTime.unix();
  const slice = parseInt(
    (currentTime.minute() * 60 + currentTime.second()) / 5,
    10
  );
  const dps = timestamps
    .map(item => ({
      timestamp: ts - item.timestamp,
      value: item.value
    }))
    .slice(slice, slice + 60);
  const total = dps.reduce((prev, curr) => prev + curr.value, 0);
  return {
    dps,
    total
  };
};

const regionData = () => {
  const min = 5;
  const max = 50;

  const count1 = parseInt(parseInt(Math.random() * (max - min)) + min, 10);
  const count2 = parseInt(parseInt(Math.random() * (max - min)) + min, 10);
  const count3 = parseInt(Math.random() * (max - min) + min, 10);
  const count4 = parseInt(Math.random() * (max - min) + min, 10);

  return [
    { x: "Operator I: " + count1, percentage: count1 },
    { x: "Operator II: " + count2, percentage: count2 },
    { x: "Operator IIII: " + count3, percentage: count3 },
    { x: "Operator IV: " + count4, percentage: count4 }
  ];
};
const reviewData = () => {
  const currentTime = moment();

  const reviews = [
    {
      reviewerName: "Chris Tea",
      description: "I liked the tea.",
      starRating: 5,
      timestamp: currentTime
    },
    {
      reviewerName: "Kerem Durak",
      description: "Good prices, happy environment.",
      starRating: 3,
      timestamp: currentTime
    },
    {
      reviewerName: "Richard Jason",
      description: "Unhappy with the cashier.",
      starRating: 1,
      timestamp: currentTime
    }
  ];
  var randomSelection = parseInt(Math.random() * 3 + 1);

  return reviews.slice(randomSelection - 1, randomSelection, 10);
};

const activityData = () => {
  const currentTime = moment();
  console.log(currentTime);

  const activity = [
    {
      reviewerName: "Operator I",
      description:
        "Assigned review: 5daab2fc42b023c0f68a5 to Operator II. Note: Need to confirm this claim with the management.",
      starRating: 0,
      timestamp: currentTime
    },
    {
      reviewerName: "Operator II",
      description:
        "Added note to: c42b023c0f68a55daab2f. Note: This reviewer left negative reviews to other locations too",
      starRating: 0,
      timestamp: currentTime
    },
    {
      reviewerName: "Operator II",
      description: "Archived: 8a55daab2fc42b023c0f6.",
      starRating: 0,
      timestamp: currentTime
    },
    {
      reviewerName: "Operator IV",
      description:
        "Replied: c42b023c0f68a55daab2f. Thank you for your review. Would you tell us why you are unhappy with our service?",
      starRating: 0,
      timestamp: currentTime
    },
    {
      reviewerName: "Operator IV",
      description:
        "Replied: c42b055daab223c0f68af. Hello! Please contact us from our mail so we may help you. Thanks!",
      starRating: 0,
      timestamp: currentTime
    },
    {
      reviewerName: "Operator II",
      description:
        "Tagged and archived: c42b023c0f68a55daab2f. Reviews from 2018 and older.",
      starRating: 0,
      timestamp: currentTime
    },
    {
      reviewerName: "Operator I",
      description:
        "Added note to: c42b023c0f68a55daab2f. Note: Needs confirmation.",
      starRating: 0,
      timestamp: currentTime
    },
    {
      reviewerName: "Operator III",
      description:
        "Replied: c42b023c0f68a55daab2f. Thank you for your review! What can we do to improve your experience?",
      starRating: 0,
      timestamp: currentTime
    },
    {
      reviewerName: "Operator I",
      description: "Archived: 8a55daac42b023c0f6b2f",
      starRating: 0,
      timestamp: currentTime
    },
    {
      reviewerName: "Operator I",
      description: "Modified project's data: locationList",
      starRating: 0,
      timestamp: currentTime
    },
    {
      reviewerName: "Operator I",
      description: "Modified project's data: locationList",
      starRating: 0,
      timestamp: currentTime
    },
    {
      reviewerName: "Operator I",
      description:
        "Added note to location c42ba55daab2023c0f68f: There are plenty of negative reviews here. Need to contact management ASAP.",
      starRating: 0,
      timestamp: currentTime
    }
  ];
  var randomSelection = parseInt(Math.random() * 12 + 1);

  return activity.slice(randomSelection - 1, randomSelection, 10);
};

module.exports = {
  reviewCountData,
  regionData,
  reviewData,
  trafficData,
  activityData
};
