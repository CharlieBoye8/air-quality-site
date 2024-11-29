import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const ComparisonChart = ({ location1Data, location2Data, location1Label, location2Label, labels }) => {
  const data = {
    labels: labels, // Use actual timestamps as labels
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

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      tooltip: { mode: 'index', intersect: false },
    },
    scales: {
      x: { title: { display: true, text: 'Timestamp' } },
      y: { title: { display: true, text: 'Value' } },
    },
  };

  return (
    <div style={{ width: '100vh', height: 'auto' }}>
      <Line data={data} options={options} />
    </div>
  );
};

export default ComparisonChart;
