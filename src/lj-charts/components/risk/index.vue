<template>
  <div class="content-wrap">
    <div class="title-wrap">
      <div class="title">
        {{ defaultTitle }}
      </div>
    </div>

    <div class="chart-wrap" :style="`height: ${chartHeight}`">
      <!-- chart视图 -->
      <div class="charts" ref="echarts"></div>

      <!-- 右侧其余信息展示 -->
      <div class="righ-info">
        <div
          v-for="(item, index) in rightConfig"
          :key="`${item.title}_${index}`"
          class="info-item"
          @click="handleItemClick(item)"
        >
          <div class="item-title">
            {{ item.title }}
          </div>

          <el-tooltip
            v-if="chartType === 1"
            :content="handleRightLabel(item)"
            effect="light"
          >
            <span>{{ handleRight(item) }}</span>
          </el-tooltip>
          <span v-else>{{ handleRight(item) }}</span>
        </div>
      </div>
    </div>

    <div class="last-line">
      <el-button type="text" @click="handleViewDetails">
        {{ data.writeData && data.writeData.changeOver ? data.writeData.changeOver : t('details') }}
      </el-button>
    </div>
  </div>
</template>

<script>
import mixins from '../../mixins';
import t, { handleOptions, handleRightConfig } from './handle';

export default {
  name: 'RiskCharts',
  components: {},
  mixins: [mixins],
  props: {
    // 图表类型  1 许可证  2 漏洞
    chartType: {
      type: [Number, String],
      default: () => 1,
    },
    // y轴需要展示信息的下标
    config: {
      type: Array,
      default: () => [0, 1, 2],
    },
    // 是否开启溯源
    source: {
      type: Boolean,
      default: () => true,
    },
    data: {
      type: Object,
      default: () => ({
        writeData: {
          titleMap: {}
        },
      }),
    }
  },
  data() {
    return {};
  },
  computed: {
    defaultTitle() {
      let title = this.data.writeData && this.data.writeData.titleMap ? this.data.writeData.titleMap : {}
      if (title[1])  return title[this.chartType || 1];

      const titleMap = {
        1: t('licenseRisk'),
        2: t('vulnerabilityRisk'),
      };
      return titleMap[this.chartType || 1];
    },
    // 右侧展示配置
    rightConfig() {
      return handleRightConfig.call(this);
    },
  },
  methods: {
    // 初始化
    handleInitChart() {
      const option = handleOptions.call(this);

      this.handleEcharts(option);
    },
    // 查看详情
    handleViewDetails() {
      this.$emit('detail', this.chartType);
    },
    // 右侧选项展示
    handleRight(config) {
      const { list = [] } = config;
      const { data, chartType } = this;

      if (chartType === 1) return list.map((x) => data[x.key]).join('/');

      return list.map((x) => x).join('/');
    },
    // 右侧文案展示
    handleRightLabel(config) {
      const { chartType } = this;
      const { list = [] } = config;

      if (chartType === 1) return list.map((x) => x.title).join('/');
      return '';
    },
    // 右侧选项点击
    handleItemClick(item) {
      this.$emit('item-click', item.type);
    },
  },
};
</script>
<style lang="scss" scoped>
@import '../../../style/var.scss';

.content-wrap {
  width: 100%;
  .title-wrap {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }
  .title {
    font-size: $font-size-sm;
    margin-bottom: 12px;
    font-weight: 600;
  }

  .chart-wrap {
    display: flex;
    align-items: center;
    .charts {
      flex: 1;
      height: 100%;
    }

    .righ-info {
      flex-shrink: 0;
      width: 140px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .info-item {
        display: flex;
        flex-direction: column;
        cursor: pointer;
        padding: 12px;
        font-weight: 600;
        width: 100%;
        box-sizing: border-box;
        &:hover {
          background-color: $bg-color-hover;
        }
        .item-title {
          margin-bottom: 2px;
          font-size: $font-size-sm;
        }
        > span {
          font-size: $font-size-lg;
        }
      }
    }
  }

  .last-line {
    display: flex;
    justify-content: flex-end;
  }
}
</style>
