<template>
  <div class="content-wrap">
    <div class="title-wrap">
      <div class="title">{{ title || t('riskTrend') }}</div>
      <!-- 分布类型 -->
      <div class="fr">
        <el-button
          :plain="currentType === 1 ? false : true"
          size="mini"
          :type="currentType === 1 ? 'primary' : ''"
          @click="handleClick(1)"
        >
          {{ t('vulnerabilityRisk') }}
        </el-button>

        <el-button
          :plain="currentType === 2 ? false : true"
          size="mini"
          :type="currentType === 2 ? 'primary' : ''"
          @click="handleClick(2)"
        >
          {{ t('licenseRisk') }}
        </el-button>
      </div>
    </div>
    <div v-if="data" ref="echarts" :style="`height: ${chartHeight}`"></div>
    <el-empty v-else :description="translate('empty')" />
  </div>
</template>

<script>
  import { parseRecordsLineS } from './handle'
  import { formatDate } from '../../../utils'
  import { translate } from '../../../utils/translate'
  import { RISK_COLORS } from '../licenseRisk/handle'
  const t = translate('ljCharts');

  export default {
    name: 'adapt-license-distribution',
    components: {},
    props: {
      // 图表类型  1 许可证  2 漏洞
      chartType: {
        type: [Number, String],
        default: () => 1,
      },
      // 是否开启溯源
      source: {
        type: Boolean,
        default: () => true,
      },
      // 标题
      title: {
        type: String,
        default: () => '',
      },
      // 数据集
      data: {
        type: [Array, Object],
        default: () => undefined,
      },
      // 图表高度
      height: {
        type: [String, Number],
        default: () => undefined,
      },
    },
    data() {
      return {
        parseRecordsLine: {
          name: [],
          data: [],
          risk: [
            {
              name: t('vulCritical'),
              type: 'line',
              data: [],
            },
            {
              name: t('vulHigh'),
              type: 'line',
              data: [],
            },
            {
              name: t('vulMid'),
              type: 'line',
              data: [],
            },
            {
              name: t('vulLow'),
              type: 'line',
              data: [],
            },
            {
              name: t('vulUnknown'),
              type: 'line',
              data: [],
            },
          ],
        },
        currentType: 1,
      };
    },
    computed: {
      // 图表高度
      chartHeight() {
        if (!this.height) return DEFAULT_HEIGHT

        if (isNaN(this.height)) return this.height

        return this.height + 'px'
      },
    },
    mounted() {
      this.handleClick(1);
    },
    methods: {
      // 翻译
      t(path) {
        return t(path);
      },
      handleClick(index) {
        this.currentType = index;
        this.parseRecordsLine.data = [];
        this.parseRecordsLine.name = [];
        this.parseRecordsLine.risk.forEach((el, i) => {
          el.data = []
          el.color = RISK_COLORS[i]
        })
        if (this.currentType === 1) {
          this.parseRecordsLine.data = this.data.vulInfoList;
          this.parseRecordsLine.riskData = this.parseRecordsLine.risk;
          this.parseRecordsLine.data.forEach((el) => {
            this.parseRecordsLine.name.push(formatDate(el.time, 'YYYY-MM-DD'));
            this.parseRecordsLine.riskData[0].data.push(el.vulCritical);
            this.parseRecordsLine.riskData[1].data.push(el.vulHigh);
            this.parseRecordsLine.riskData[2].data.push(el.vulMid);
            this.parseRecordsLine.riskData[3].data.push(el.vulLow);
            this.parseRecordsLine.riskData[4].data.push(el.vulUnknown);
          });
        } else {
          this.parseRecordsLine.data = this.data.licenseInfoList;
          this.parseRecordsLine.riskData = this.parseRecordsLine.risk.filter(
            (el) => {
              return el.name != '严重';
            }
          );
          this.parseRecordsLine.data.forEach((el) => {
            this.parseRecordsLine.name.push(formatDate(el.time, 'YYYY-MM-DD'));
            this.parseRecordsLine.riskData[0].data.push(el.high);
            this.parseRecordsLine.riskData[1].data.push(el.mid);
            this.parseRecordsLine.riskData[2].data.push(el.low);
            this.parseRecordsLine.riskData[3].data.push(el.unknown);
          });
        }
        this.$nextTick(() => {
          parseRecordsLineS.call(this, 'parseRecordsLine');
        });
      },
    },
  }
</script>
<style lang="scss" scoped>
.content-wrap {
  width: 100%;
  .title-wrap {
    width: 100%;
    display: flex;
    justify-content: space-between;
    .title {
      font-size: 14px;
      margin-bottom: 12px;
      font-weight: 600;
    }
  }
}
</style>
