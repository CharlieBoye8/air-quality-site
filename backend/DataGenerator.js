/**
 * This script generates sensor data for three sensors over the past six months.
 * By Charlie Boye
 */

const fs = require('fs');

function getRandomValue(min, max) {
  return parseFloat((Math.random() * (max - min) + min).toFixed(2));
}

function generateTimestamps(startDate, intervals, intervalUnit) {
  const timestamps = [];
  let currentDate = new Date(startDate);

  for (let i = 0; i < intervals; i++) {
    timestamps.push(new Date(currentDate).toISOString());
    if (intervalUnit === 'weekly') {
      currentDate.setDate(currentDate.getDate() + 7);
    } else if (intervalUnit === 'daily') {
      currentDate.setDate(currentDate.getDate() + 1);
    }
  }
  return timestamps;
}

function generateSensorData(sensorId, location) {
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
  
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

  const weeklyTimestamps = generateTimestamps(sixMonthsAgo, 5, 'weekly');
  const dailyTimestamps = generateTimestamps(oneWeekAgo, 5, 'daily');

  const measurementTypes = [
    { type: 'PM2.5', min: 10, max: 20 },
    { type: 'MQ-3', min: 0.5, max: 1.5 },
    { type: 'MQ-7', min: 40, max: 60 },
    { type: 'MQ135', min: 80, max: 100 }
  ];

  const measurements = measurementTypes.map(({ type, min, max }) => {
    const weeklyData = weeklyTimestamps.map(timestamp => ({
      value: getRandomValue(min, max),
      timestamp
    }));

    const dailyData = dailyTimestamps.map(timestamp => ({
      value: getRandomValue(min, max),
      timestamp
    }));

    return {
      type,
      data: [...weeklyData, ...dailyData]
    };
  });

  return {
    sensor_id: sensorId.toString(),
    location,
    measurements
  };
}

const sensors = [
  { sensorId: 1, location: 'West Building' },
  { sensorId: 2, location: 'Gettysburger' },
  { sensorId: 3, location: 'Gettysburg Hotel' }
];

const data = sensors.map(sensor => generateSensorData(sensor.sensorId, sensor.location));

fs.writeFileSync('Bigdata.json', JSON.stringify(data, null, 2), 'utf8');
console.log('Data generated and saved to Bigdata.json');
