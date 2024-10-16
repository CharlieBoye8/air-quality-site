import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const ComparisonChart = ({ location1Data, location2Data, location1Label, location2Label }) => {
  const data = {
    labels: ['Time 1', 'Time 2', 'Time 3', 'Time 4'],
    datasets: [
      {
        label: location1Label || 'Location 1',
        data: location1Data,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
      },
      {
        label: location2Label || 'Location 2',
        data: location2Data,
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
      },
    ],
  };

  return <Line data={data} />;
};

export default ComparisonChart;
