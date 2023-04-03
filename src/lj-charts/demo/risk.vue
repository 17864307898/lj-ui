<template>
  <lj-charts
    :chart-type="2"
    :config="[0, 1]"
    :data="data"
    :source="false"
    :type="106"
    :height="220"
  />
</template>

<script>
export default {
  name: '',
  components: {},
  props: {},
  data() {
    return {
      // data: {
      //   indirectCompatibleCount: 37,
      //   notCompatibleCount: 86,
      //   licenseChangeCount: 122,
      //   copyrightChangeCount: 157,
      //   licenseRiskInfos: [
      //     {
      //       riskLevel: 0,
      //       riskLevelCount: 36,
      //     },
      //     {
      //       riskLevel: 2,
      //       riskLevelCount: 15,
      //     },
      //     // {
      //     //   riskLevel: 1,
      //     //   riskLevelCount: 7,
      //     // },
      //     // {
      //     //   riskLevel: 3,
      //     //   riskLevelCount: 9,
      //     // },
      //   ],
      // },
      // chart-type为2时传入
      data: {
        writeData: {
          titleMap: {
            1: '许可证风险',
            2: '漏洞风险',
          },
          rightConfig: {
            1: ['条件兼容', '不兼容', '许可证篡改', '版权篡改'],
            2: ['含漏洞组件', '含漏洞文件', '含溯源项目'],
          },
          vulData: ['Not-standard', '低危', '中危', '高危', '严重'],
          LicenseData: ['Not-standard', '中风险', '低风险', '高风险'],
          changeOver: '查看详情',
        },
        vulUnknown: 12,
        vulLow: 39,
        vulMid: 27,
        vulHigh: 6,
        vulCritical: 52,
        repoVulDistribute: {
          high: 72,
          mid: 21,
          low: 10,
          critical: 42,
          unknown: 3,
        },
        sourceProjectVulDistribute: {
          high: 38,
          mid: 21,
          low: 55,
          critical: 7,
          unknown: 19,
        },
      },
    };
  },
};
</script>
<style lang="scss" scoped>
.card-wrap {
  width: 500px;
}
</style>
