<template>
  <div class="content-wrap">
    <div class="title-wrap">
      <div class="title">{{ translate('riskTrend') }}</div>
      <!-- 分布类型 -->
      <div class="fr">
        <el-button
          :plain="currentType === 1 ? false : true"
          size="mini"
          :type="currentType === 1 ? 'primary' : ''"
          @click="handleClick(1)"
        >
          漏洞风险
        </el-button>

        <el-button
          :plain="currentType === 2 ? false : true"
          size="mini"
          :type="currentType === 2 ? 'primary' : ''"
          @click="handleClick(2)"
        >
          许可证风险
        </el-button>
      </div>
    </div>
    <div
      v-if="data"
      id="parseRecordsLine"
      :style="`height: ${chartHeight}`"
    ></div>
    <el-empty v-else :description="translate('empty')" />
  </div>
</template>

<script>
import { parseRecordsLineS } from './handle';
import { formatDate } from '../../../utils';
import { translate } from '../../../utils/translate';
const t = translate('ljCharts');

export default {
  name: 'adapt-license-distribution',
  components: {},
  props: {
    height: {
      type: [String, Number],
      default: () => undefined,
    },
    // 图表类型  1 许可证  2 漏洞
    chartType: {
      type: [Number, String],
      default: () => 1,
    },
    data: {
      type: Object,
      default: () => {
        return {};
      },
    },
    // 是否开启溯源
    source: {
      type: Boolean,
      default: () => true,
    },
  },
  computed: {
    // 图表高度
    chartHeight() {
      if (!this.height) return DEFAULT_HEIGHT;

      if (isNaN(this.height)) return this.height;

      return this.height + 'px';
    },
  },
  data() {
    return {
      parseRecordsLine: {
        name: [],
        data: [],
        risk: [
          {
            name: '严重',
            type: 'line',
            data: [],
          },
          {
            name: '高危',
            type: 'line',
            data: [],
          },
          {
            name: '中危',
            type: 'line',
            data: [],
          },
          {
            name: '低危',
            type: 'line',
            data: [],
          },
          {
            name: '未知',
            type: 'line',
            data: [],
          },
        ],
      },
      currentType: 1,
    };
  },
  // watch: {
  //   data: {
  //     handler(val) {
  //       this.parseRecordsLine = val
  //     },
  //     immediate: true,
  //   },
  // },
  mounted() {
    this.handleClick(1);
  },
  methods: {
    // 翻译
    translate(path) {
      return t(path);
    },
    handleClick(index) {
      this.currentType = index;
      this.parseRecordsLine.data = [];
      this.parseRecordsLine.name = [];
      this.parseRecordsLine.risk.forEach((el) => {
        el.data = [];
      });
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
        parseRecordsLineS('parseRecordsLine', this.parseRecordsLine);
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.content-wrap {
  width: 100%;
  .title-wrap {
    width: 100%;
    display: flex;
    justify-content: space-between;
    .title {
      font-size: 18px;
      font-weight: 600;
    }
  }
}
</style>
