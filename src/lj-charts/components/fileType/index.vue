<template>
  <div class="content-wrap">
    <div class="title">
      {{ translate('fileTitle') }}
    </div>

    <div id="echarts" :style="`height: ${chartHeight}`"></div>
  </div>
</template>

<script>
  import mixins from '../../mixins'
  import { t } from '../distribute/handle'
  import { handleOptions } from './handle'

  export default {
    name: 'adapt-file-type',
    components:{},
    mixins: [mixins],
    props:{},
    data(){
      return {}
    },
    mounted() {
      this.handleInit()
    },
    methods: {
      // 翻译
      translate(path) {
        return t(path)
      },
      // 初始化
      handleInit() {
        const option = handleOptions([])

        this.handleEcharts(option)
      }
    },
  }
</script>
<style lang="scss" scoped>
  .content-wrap {
    width: 100%;
    .title {
      font-size: 18px;
      font-weight: 600;
    }
  }
</style>