import React from "react"
import ReactEcharts from "echarts-for-react"

const Pie = props => {
  const options = {
    toolbox: {
      show: false,
    },
    tooltip: {
      trigger: "item",
      formatter: "{a} <br/>{b} : {c} ({d}%)",
    },
    color: ["#02a499", "#f8b425", "#ec4561", "#38a4f8", "#3c4ccf"],
    series: [
      {
        name: "Total sales",
        type: "pie",
        radius: "55%",
        center: ["50%", "60%"],
        data: props.data,
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      },
    ],
  }
  return (
    <React.Fragment>
      <ReactEcharts style={{ height: "350px" }} option={options} />
    </React.Fragment>
  )
  Pie.propTypes = {
    data: PropTypes.any,
  }
}
export default Pie
