/**
 * Random Data generator
 */
const moment = require("moment");

const reviewCountData = () => {
  const min = 20;
  const max = 90;

  const percentage = parseInt(Math.random() * (max - min) + min, 10);
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
  const reviews = [
    {
      title: "Chris Tea",
      description: "I liked the tea.",
      color: "#27ae60"
    },
    {
      title: "Kerem Durak",
      description: "Fiyatlar cok uygun tesekkurler.",
      color: "#f39c12"
    }
  ];
  return reviews.slice(0, parseInt(Math.random() * 2 + 1, 10));
};

module.exports = {
  reviewCountData,
  regionData,
  reviewData,
  trafficData
};
