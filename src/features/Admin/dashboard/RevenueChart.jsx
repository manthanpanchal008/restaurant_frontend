import React from "react";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

const RevenueChart = ({ orders }) => {
  // group by date
  const grouped = {};

  orders.forEach((order) => {
    const date = new Date(order.createdAt).toLocaleDateString();

    if (!grouped[date]) {
      grouped[date] = 0;
    }

    grouped[date] += order.totalAmount;
  });

  const labels = Object.keys(grouped);
  const dataValues = Object.values(grouped);

  const data = {
    labels,
    datasets: [
      {
        label: "Revenue ₹",
        data: dataValues,
        borderColor: "#0d6efd",
        backgroundColor: "rgba(13,110,253,0.2)",
        tension: 0.4,
      },
    ],
  };

  return <Line data={data} />;
};

export default RevenueChart;