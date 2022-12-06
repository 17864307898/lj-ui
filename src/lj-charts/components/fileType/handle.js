export const handleOptions = (data) => {
  // const dataCount = 5e5;
  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    grid: {
      bottom: 90
    },
    dataZoom: [
      {
        type: 'slider'
      }
    ],
    xAxis: {
      data: [],
      silent: false,
      splitLine: {
        show: false
      },
      splitArea: {
        show: false
      }
    },
    yAxis: {
      splitArea: {
        show: false
      }
    },
    series: [
      {
        type: 'bar',
        data: data,
        // Set `large` for large data amount
        large: true
      }
    ]
  }

  return option
}