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
          <span :class="[`risk_${key}`, { gray_style: riskList[key] == 0 }]" @click="handelSafteyRisk(key)">
            {{ riskList[key] }}
          </span>
        </el-tooltip>
      </template>
      <slot name="detailTarget"></slot>
    </div>
    <p v-else class="SafetyRisk">
      {{ riskData['noRisk'] }}
    </p>
  </div>
</template>

<script>

import Vue from 'vue';
import {
  Tooltip,
} from 'element-ui';

Vue.use(Tooltip);

  export default {
    name: 'lj-saftey-risk',
    props: {
      riskList: {
        type: Object,
        default: () => ({}),
      },
      type: {
        // 1: 漏洞风险  2: 许可证风险
        type: Number,
        default: 1,
      },
      riskData: {
        type: Object,
        default: () => ({}),
      },
    },
    data() {
      return {}
    },
    methods: {
      handelSafteyRisk(key) {
        this.$emit('handelRisk', key)
      }
    }
  }
</script>
