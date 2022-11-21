<template>
  <div class="adapt-input">
    <el-cascader
      v-model="localValue"
      v-bind="{ ...$props, ...$attrs }"
      @change="oninput"
    />
  </div>
</template>

<script>
  import Vue from 'vue'
  import { Cascader, CascaderPanel, MenuItem } from 'element-ui'

  Vue.use(Cascader)
  Vue.use(CascaderPanel)
  Vue.use(MenuItem)

  export default {
    name: 'adapt-cascader',
    props: {
      value: {
        type: undefined,
        default: undefined,
      },
      options: {
        type: Array,
        default: () => ([]),
      }
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
  .adapt-input {
    width: 100%;
    & > * {
      width: 100% !important;
    }
  }
</style>
