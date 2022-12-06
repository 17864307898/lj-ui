<template>
  <div class="number-input">
    <el-input-number
      v-model="localValue"
      :placeholder="placeholder || translate('placeholder')"
      v-bind="{ ...$props, ...$attrs }"
      v-on="$listeners"
      @input="oninput"
    />
  </div>
</template>

<script>
  import Vue from 'vue'
  import translateMixin from '../../mixins'
  import { InputNumber } from 'element-ui'

  Vue.use(InputNumber)
  export default {
    name: 'adapt-input-number',
    mixins: [translateMixin],
    props: {
      value: {
        type: undefined,
        default: undefined,
      },
    },
    data() {
      return {
        localValue: undefined,
      }
    },
    watch: {
      value: {
        handler(val) {
          this.localValue = val
        },
        immediate: true,
      },
    },
    created() {},
    methods: {
      oninput(val) {
        this.$emit('adapt-change', val)
      },
    },
  }
</script>
<style lang="scss" scoped>
  .number-input {
    & > * {
      width: 100% !important;
    }
  }
</style>
