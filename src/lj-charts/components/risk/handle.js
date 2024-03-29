import { deepClone } from '../../../utils';
import { t } from '../distribute/handle';
import style from '../../../style/var.scss';

export default t;

// 风险等级颜色配置
export const RISK_COLORS = style['risk-color-list'].split(',');
const REVERSE_COLOR = deepClone(RISK_COLORS);
REVERSE_COLOR.reverse();

// 许可证
const LICENSE_LIST = [
  t('vulUnknown'),
  t('lowRiskFile'),
  t('midRiskFile'),
  t('highRiskFile'),
];

// 漏洞
const RISK_LIST = [
  t('noRated'),
  t('vulLow'),
  t('vulMid'),
  t('vulHigh'),
  t('vulCritical'),
];

const TYPE_MAP = {
  // 许可证
  1: {
    yMap: LICENSE_LIST,
    xKey: [],
  },
  // 漏洞
  2: {
    yMap: RISK_LIST,
    xKey: ['vulUnknown', 'vulLow', 'vulMid', 'vulHigh', 'vulCritical'],
  },
};

/**
 * echarts配置
 * @param {*} data 数据集
 * @param {*} chartType 图表类型 1 许可证 2 漏洞
 * @param {*} type 业务类型
 * @returns
 */
export const handleOptions = function () {
  const { chartType = 1, data } = this;
  let config = TYPE_MAP[chartType];

  if (
    data.writeData &&
    data.writeData.vulData &&
    data.writeData.vulData.length > 0
  ) {
    config.yMap =
      chartType === 1 ? data.writeData.licenseData : data.writeData.vulData;
  } else {
    config = TYPE_MAP[chartType];
  }

  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
    },
    color: REVERSE_COLOR.slice(1),
    grid: {
      top: '6%',
      left: '3%',
      right: '3%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: {
      type: 'value',
      boundaryGap: [0, 0.01],
    },
    yAxis: {
      type: 'category',
      data: config.yMap,
    },
    series: [
      {
        type: 'bar',
        colorBy: 'data',
        data: formatData.call(this, config),
      },
    ],
  };

  return option;
};

/**
 * 数据处理
 * @param {*} data
 * @returns
 */
export function formatData(config = {}) {
  const { data, chartType = 1 } = this;
  const cloneData = deepClone(data);
  const { xKey = [] } = config;

  // 许可证
  if (chartType === 1) {
    const list = cloneData?.licenseRiskInfos || [];
    list.sort((x, y) => x.riskLevel - y.riskLevel);
    let LICENSE_LIST_DATA = null;
    if (
      data.writeData &&
      data.writeData.vulData &&
      data.writeData.vulData.length > 0
    ) {
      LICENSE_LIST_DATA = data.writeData.vulData;
    } else {
      LICENSE_LIST_DATA = LICENSE_LIST;
    }
    return LICENSE_LIST_DATA.map((x, i) => {
      const current = list?.find((y) => +y.riskLevel === i);

      if (current) return current.riskLevelCount || 0;

      return 0;
    });
  } else {
    return xKey.map((x) => cloneData[x] || 0);
  }
}

export function handleRightConfig() {
  const { chartType = 1, config, source = false, data } = this;
  let rightConfigTitle =
    data.writeData && data.writeData.rightConfig
      ? data.writeData.rightConfig
      : [];
  // 许可证
  if (chartType === 1) {
    return [
      {
        title: t('compatibilityRisk'),
        list: [
          {
            key: 'notCompatibleCount',
            title:
              rightConfigTitle[1] && rightConfigTitle[1].length > 0
                ? rightConfigTitle[1][0]
                : t('notCompatibleCount'),
          },
          {
            key: 'indirectCompatibleCount',
            title:
              rightConfigTitle[1] && rightConfigTitle[1].length > 0
                ? rightConfigTitle[1][1]
                : t('indirectCompatibleCount'),
          },
        ],
        type: 1,
      },
      {
        title: t('tamperingRisk'),
        list: [
          {
            key: 'licenseChangeCount',
            title:
              rightConfigTitle[1] && rightConfigTitle[1].length > 0
                ? rightConfigTitle[1][3]
                : t('licenseChangeCount'),
          },
          {
            key: 'copyrightChangeCount',
            title:
              rightConfigTitle[1] && rightConfigTitle[1].length > 0
                ? rightConfigTitle[1][4]
                : t('copyrightChangeCount'),
          },
        ],
        type: 2,
        isSource: true,
      },
    ].filter((x) => {
      if (x?.isSource) return source;

      return true;
    });
  }

  const list = [
    {
      key: 'repoVulDistribute',
      title:
        rightConfigTitle[2] && rightConfigTitle[2].length > 0
          ? rightConfigTitle[2][0]
          : t('vulnerabilityComponent'),
      type: 1,
    },
    {
      key: 'fileVulDistribute',
      title:
        rightConfigTitle[2] && rightConfigTitle[2].length > 0
          ? rightConfigTitle[2][1]
          : t('buggyFile'),
      type: 2,
    },
    {
      key: 'sourceProjectVulDistribute',
      title:
        rightConfigTitle[2] && rightConfigTitle[2].length > 0
          ? rightConfigTitle[2][2]
          : t('IncludingTraceability'),
      type: 3,
      isSource: true,
    },
  ]
    .filter((x, i) => config.includes(i))
    .filter((x) => {
      if (x?.isSource) return source;

      return true;
    });

  return list.map((x) => {
    return {
      ...x,
      list: [sumTotal(data, x.key)],
    };
  });
}

function sumTotal(data, key) {
  const current = deepClone(data[key]);
  if (!current) return 0;

  return Object.values(current).reduce((total, x) => {
    total += +x;

    return total;
  }, 0);
}
