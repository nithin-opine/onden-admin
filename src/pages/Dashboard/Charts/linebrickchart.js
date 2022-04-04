import React from "react"
import { Line } from "react-chartjs-2"

const LineChart = props => {
  const data = {
    labels: [
      "Trial Package",
      "Monthly Package",
      "3 Month Package",
      "1 Year Package",
    ],
    datasets: [
      {
        label: "Package Analytics",
        fill: true,
        lineTension: 0.5,
        backgroundColor: "rgba(85, 110, 230, 0.2)",
        borderColor: "#556ee6",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "#556ee6",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "#556ee6",
        pointHoverBorderColor: "#fff",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: props.data,
      },
    ],
  }
  var option = {
    scales: {
      yAxes: [
        {
          ticks: {
            max: 1.0,
            min: -1.0,
            stepSize: 0.1,
          },
        },
      ],
    },
  }
  return (
    <React.Fragment>
      <Line width={474} height={300} data={data} options={option} />
    </React.Fragment>
  )
  LineChart.propTypes = {
    data: PropTypes.any,
  }
}

export default LineChart
