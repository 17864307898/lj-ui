<template>
  <div>
    <div>
      <lj-saftey-risk :type="1" :risk-list="riskList" :risk-data="riskData">
        <template #detailTarget>
          <i class="el-icon-arrow-right" @click="handelTarget"></i>
        </template>
      </lj-saftey-risk>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      riskList: {
        critical: 1,
        high: 6,
        low: 12,
        mid: 14,
        unknown: 3,
      },
      riskData: {
        1: {
          // 漏洞风险文案映射
          critical: '严重',
          high: '高危',
          mid: '中危',
          low: '低危',
          unknown: '未评级',
          noRisk: '无风险',
        },
        2: {
          // 许可证风险文案映射
          critical: '严重',
          high: '高风险',
          mid: '中风险',
          low: '低风险',
          unknown: '未知',
          noRisk: '无风险',
        },
      },
    };
  },
  created() {},
  methods: {
    handelTarget() {
      console.log('跳');
    },
  },
};
</script>