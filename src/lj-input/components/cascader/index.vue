<template>
  <div class="adapt-input">
    <el-cascader
      v-model="localValue"
      :placeholder="(placeholder || translate('select'))"
      v-bind="{ ...$props, ...$attrs }"
      v-on="$listeners"
      @change="oninput"
    />
  </div>
</template>

<script>
  import Vue from 'vue'
  import { Cascader, CascaderPanel, MenuItem } from 'element-ui'
  import translateMixin from '../../mixins'

  Vue.use(Cascader)
  Vue.use(CascaderPanel)
  Vue.use(MenuItem)

  export default {
    name: 'adapt-cascader',
    mixins: [translateMixin],
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
