<template>
  <lj-charts
    :data="data"
    :type="105"
    :height="240"
  />
</template>

<script>
export default {
  name: '',
  components: {},
  props: {},
  data() {
    return {
      data: {
        vulInfoList: [
          {
            vulCritical: 0,
            vulHigh: 0,
            vulLow: 0,
            vulMid: 0,
            vulUnknown: 0,
            time: 1671430007199,
          },
        ],
        licenseInfoList: [
          {
            high: 1,
            mid: 3,
            low: 3,
            unknown: 6,
            time: 1671430007199,
          },
        ],
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
