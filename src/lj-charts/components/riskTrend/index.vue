<template>
  <div class="content-wrap">
    <div class="title-wrap">
      <div class="title">
        {{
          data.writeData && data.writeData.title
            ? data.writeData.title
            : t('riskTrend')
        }}
      </div>
      <!-- 分布类型 -->
      <div class="fr">
        <el-switch
          v-model="currentType"
          :active-text="
            data.writeData && data.writeData.switchList[1]
              ? data.writeData.switchList[1]
              : t('licenseRisk')
          "
          :active-value="2"
          :inactive-text="
            data.writeData && data.writeData.switchList[2]
              ? data.writeData.switchList[2]
              : t('vulnerabilityRisk')
          "
          :inactive-value="1"
          @change="handleClick"
        />
      </div>
    </div>
    <div v-if="data" ref="echarts" :style="`height: ${chartHeight}`"></div>
    <el-empty v-else :description="translate('empty')" />
  </div>
</template>

<script>
import { parseRecordsLineS, NAME_MAP } from './handle';
import { formatDate } from '../../../utils';
import t, { RISK_COLORS } from '../risk/handle';

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
    // 数据集
    data: {
      type: [Array, Object],
      default: () => ({
        writeData: {
          title: '',
          switchList: [],
        },
      }),
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
      },
      currentType: 1,
    };
  },
  computed: {
    // 图表高度
    chartHeight() {
      if (!this.height) return DEFAULT_HEIGHT;

      if (isNaN(this.height)) return this.height;

      return this.height + 'px';
    },
    // 风险数据配置
    risk() {
      const writeList = this.data.writeData && this.data.writeData[this.currentType] ? this.data.writeData[this.currentType] : [];
      if (writeList && writeList.length > 0) {
        return writeList.map((x) => {
          return {
            name: x,
            type: 'line',
            data: [],
          };
        });
      } else {
        const list = NAME_MAP[this.currentType];
        return list.map((x) => {
          return {
            name: t(x),
            type: 'line',
            data: [],
          };
        });
      }
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
      this.parseRecordsLine.riskData = this.risk.map((x, i) => {
        return {
          ...x,
          data: [],
          color: RISK_COLORS[i],
        };
      });

      if (this.currentType === 1) {
        this.parseRecordsLine.data = this.data.vulInfoList;
        this.parseRecordsLine.data.forEach((el, i) => {
          el.color = RISK_COLORS[i];
          this.parseRecordsLine.name.push(formatDate(el.time, 'YYYY-MM-DD'));
          this.parseRecordsLine.riskData[0].data.push(el.vulCritical);
          this.parseRecordsLine.riskData[1].data.push(el.vulHigh);
          this.parseRecordsLine.riskData[2].data.push(el.vulMid);
          this.parseRecordsLine.riskData[3].data.push(el.vulLow);
          this.parseRecordsLine.riskData[4].data.push(el.vulUnknown);
        });
      } else {
        this.parseRecordsLine.data = this.data.licenseInfoList;
        this.parseRecordsLine.data.forEach((el, i) => {
          el.color = RISK_COLORS[i];
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
      font-size: 14px;
      margin-bottom: 12px;
      font-weight: 600;
    }
  }
}
</style>
