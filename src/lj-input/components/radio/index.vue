<template>
  <div class="adapt-select">
    <el-radio-group
      v-model="localValue"
      v-bind="{ ...$props, ...$attrs }"
      v-on="$listeners"
      @change="onchange"
    >
      <el-radio
        v-for="option in options"
        :key="option[optionValue]"
        :label="option[optionLabel]"
      />
    </el-radio-group>
  </div>
</template>

<script>
  import Vue from 'vue'
  import { Radio, RadioGroup } from 'element-ui'

  Vue.use(Radio)
  Vue.use(RadioGroup)
  export default {
    name: 'adapt-radio',
    props: {
      value: {
        type: undefined,
        default: undefined,
      },
      options: {
        type: Array,
        default: () => [],
      },
      optionLabel: {
        type: String,
        default: 'label',
      },
      optionValue: {
        type: String,
        default: 'value',
      },
      placeholder: {
        type: String,
        default: '请选择',
      },
    },
    data() {
      return {
        localValue: '',
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
      onchange(val) {
        this.$emit('adapt-change', val)
      },
    },
  }
</script>
<style lang="scss" scoped>
  .adapt-select {
    & > * {
      width: 100%;
    }
  }
</style>
