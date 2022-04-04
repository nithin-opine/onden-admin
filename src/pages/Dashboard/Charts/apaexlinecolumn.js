import React from "react"
import ReactApexChart from "react-apexcharts"

const Apaexlinecolumn = props => {
  const series = props.data
  const options = {
    chart: {
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "60%",
        endingShape: "rounded",
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },

    colors: ["#34c38f", "#556ee6", "#f46a6a"],
    xaxis: {
      categories: [
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
    },
    grid: {
      borderColor: "#f1f1f1",
    },
    fill: {
      opacity: 1,
    },
  }

  return (
    <ReactApexChart options={options} series={series} type="bar" height={350} />
  )
  Apaexlinecolumn.propTypes = {
    data: PropTypes.any,
  }
}

export default Apaexlinecolumn
