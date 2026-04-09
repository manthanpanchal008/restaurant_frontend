import React from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const StatusChart = ({ orders }) => {
  const counts = orders.reduce((acc, order) => {
    acc[order.status] = (acc[order.status] || 0) + 1;
    return acc;
  }, {});

  const data = {
    labels: Object.keys(counts),
    datasets: [
      {
        data: Object.values(counts),
        backgroundColor: [
          "#ffc107", // Pending
          "#198754", // Delivered
          "#dc3545", // Cancelled
          "#0dcaf0", // Processing
        ],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        position: 'bottom',
      }
    },
    cutout: '70%',
  };

  return <Doughnut data={data} options={options} />;
};

export default StatusChart;
