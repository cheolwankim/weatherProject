//https://react-chartjs-2.js.org/ 차트참고

import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
// import styled from "styled-components";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const MyChart = ({ myData }) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "오늘의 기온",
      },
    },
  };

  let labels = myData.map((n) => n.fcstTime); //x축

  const data = {
    labels,
    datasets: [
      {
        label: "℃",
        data: myData.map((n) => n.fcstValue), //y축
        fontColor: "red",
        borderColor: "rgb(125, 125, 255)",
        backgroundColor: "rgba(0, 55, 55, 0.5)",
      },
    ],
  };


  return (
    <div>
      
        <Line options={options} data={data} />
      
    </div>
  );
};

export default MyChart;
