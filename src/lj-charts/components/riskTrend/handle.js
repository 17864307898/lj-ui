// import { deepClone } from '../../../utils';
// import { t } from '../distribute/handle';

import Vue from 'vue'
import * as echarts from 'echarts'
import elementResizeDetectorMaker from 'element-resize-detector'

let parseRecordsLineEcharts

export function parseRecordsLineS(id, data) {
  var legendName = []
  data.risk.forEach((el) => {
    legendName.push(el.name)
  })
  if (
    parseRecordsLineEcharts != null &&
    parseRecordsLineEcharts != '' &&
    parseRecordsLineEcharts != undefined
  ) {
    parseRecordsLineEcharts.dispose() // 销毁
  }
  if (!document.getElementById(id)) {
    return false
  }
  parseRecordsLineEcharts = echarts.init(document.getElementById(id))
  let option = {
    title: {
      show: false,
    },
    tooltip: {
      trigger: 'axis',
    },
    legend: {
      show: false,
      data: legendName,
    },
    grid: {
      top: '30px',
    },
    xAxis: {
      type: 'category',
      boundaryGap: true,
      splitLine: { show: false },
      data: data.name,
    },
    yAxis: {
      type: 'value',
      name: 'y',
      minorSplitLine: {
        show: false,
      },
    },
    series: data.riskData,
  }
  parseRecordsLineEcharts.setOption(option)
  //随着屏幕大小调节图表
  window.addEventListener('resize', () => {
    parseRecordsLineEcharts.resize()
  })
  // 随外层div的大小变化自适应
  let erd = elementResizeDetectorMaker()
  erd.listenTo(document.getElementById(id), () => {
    Vue.nextTick(() => {
      parseRecordsLineEcharts.resize()
    })
  })
}
