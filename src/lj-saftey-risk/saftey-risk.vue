<template>
  <div class="riskComponents">
    <div
      v-if="
        riskList.critical >= 1 ||
        riskList.high >= 1 ||
        riskList.low >= 1 ||
        riskList.mid >= 1 ||
        riskList.unknown >= 1
      "
    >
      <template v-for="(item, key) in riskData[type]">
        <el-tooltip
          v-if="riskList[key] || +riskList[key] >= 0"
          :key="key"
          :content="item"
          effect="dark"
          placement="top"
        >
          <span
            :class="[`risk_${key}`, { gray_style: riskList[key] == 0 }]"
            @click="handleSafteyRisk(key)"
          >
            {{ riskList[key] }}
          </span>
        </el-tooltip>
      </template>
      <!-- 详情跳转 -->
      <i v-show="targetShow" class="el-icon-arrow-right" @click="handelTarget"></i>
    </div>
    <p v-else class="SafetyRisk">
      {{ riskData['noRisk'] }}
    </p>
  </div>
</template>

<script>
import Vue from 'vue';
import { Tooltip } from 'element-ui';
import { translate } from '../utils/translate';
const t = translate('ljSafteyRisk');

Vue.use(Tooltip);

export default {
  name: 'lj-saftey-risk',
  props: {
    // 传入数据
    riskList: {
      type: Object,
      default: () => ({}),
    },
    type: {
      // 1: 漏洞风险  2: 许可证风险
      type: Number,
      default: 1,
    },
    // 跳转显示
    targetShow: {
      type: Boolean,
      default: false,
    }
  },
  data() {
    return {
      // 文案类型映射 1 漏洞 2 许可证
      riskData: {
        1: {
          // 漏洞风险文案映射
          critical: t('vulCritical'),
          high: t('vulHigh'),
          mid: t('vulMid'),
          low: t('vulLow'),
          unknown: t('noRated'),
          noRisk: t('riskFree'),
        },
        2: {
          // 许可证风险文案映射
          critical: t('vulCritical'),
          high: t('highStake'),
          mid: t('midRisk'),
          low: t('lowStake'),
          unknown: t('vulUnknown'),
          noRisk: t('riskFree'),
        },
      },
    };
  },
  methods: {
    // 等级点击方法
    handleSafteyRisk(key) {
      this.$emit('handle-risk', key)
    },
    // 跳转点击方法
    handelTarget() {
      this.$emit('handle-target')
    },
  },
};
</script>
