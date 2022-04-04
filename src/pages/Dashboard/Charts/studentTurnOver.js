import React from "react"
import ReactEcharts from "echarts-for-react"

const StudentTurnOver = props => {
  const options = {
    tooltip: {
      trigger: "axis",
    },
    grid: {
      zlevel: 0,
      x: 50,
      x2: 50,
      y: 30,
      y2: 30,
      borderWidth: 0,
    },
    xAxis: {
      type: "category",
      data: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      axisLable: {
        color: "#ffffff",
      },
      axisLine: {
        lineStyle: {
          color: "#74788d",
        },
      },
    },
    yAxis: {
      type: "value",
      axisLable: {
        color: "#ffffff",
      },
      axisLine: {
        lineStyle: {
          color: "#74788d",
        },
      },
    },
    series: [
      {
        data: props.data,
        type: "line",
      },
    ],
    color: ["#556ee6"],
    textStyle: {
      color: ["#74788d"],
    },
  }
  return (
    <React.Fragment>
      <ReactEcharts style={{ height: "350px" }} option={options} />
    </React.Fragment>
  )
  StudentTurnOver.propTypes = {
    data: PropTypes.any,
  }
}
export default StudentTurnOver
