<template>
  <div class="adapt-datetime">
    <el-date-picker
      v-model="localValue"
      v-bind="{ ...$props, ...$attrs }"
      v-on="$listeners"
      @change="onchange"
    />
  </div>
</template>

<script>
  import Vue from 'vue'
  import { DatePicker } from 'element-ui'

  Vue.use(DatePicker)

  export default {
    name: 'adapt-date-picker',
    props: {
      value: {
        type: undefined,
        default: undefined,
      },
      placeholder: {
        type: String,
        default: '请填写',
      },
      type: {
        type: String,
        default: 'date',
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
  .adapt-datetime {
    width: 100%;
    & > * {
      width: 100% !important;
    }
  }
</style>
