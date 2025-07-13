import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

function LineChart({ hourlyStats }) {
  const labels = hourlyStats.map((d) => `${d.hour}h`);
  const sessionData = hourlyStats.map((d) => d.sessions);
  const visitorData = hourlyStats.map((d) => d.visitors);

  const data = {
    labels,
    datasets: [
      {
        label: "Sessions",
        data: sessionData,
        fill: true,
        backgroundColor: "rgba(66, 153, 225, 0.3)",
        borderColor: "#4299e1",
        tension: 0.4,
      },
      {
        label: "Visitors",
        data: visitorData,
        fill: true,
        backgroundColor: "rgba(237, 100, 166, 0.3)",
        borderColor: "#ed64a6",
        tension: 0.4,
      },
    ],
  };

  return (
    <div className="chart-container">
      <Line data={data} />
    </div>
  );
}

export default LineChart;
