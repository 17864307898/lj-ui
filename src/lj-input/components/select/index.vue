<template>
  <div class="adapt-select">
    <el-select
      v-model="localValue"
      :placeholder="(placeholder || translate('select'))"
      v-bind="{ ...$props, ...$attrs }"
      v-on="$listeners"
      @change="onchange"
    >
      <el-option
        v-for="(item, index) in localOptions"
        :key="`${item[optionValue]}_${index}`"
        :label="item[optionLabel]"
        :value="item[optionValue]"
        v-bind="item"
      >
        <slot :item="item" :optionLabel="optionLabel">
          {{ item[optionLabel] }}
        </slot>
      </el-option>
    </el-select>
  </div>
</template>

<script>
  import Vue from 'vue'
  import { Select, Option } from 'element-ui'
  import { translate } from '../../../utils/translate'
  const t = translate('ljInput')

  Vue.use(Select)
  Vue.use(Option)

  export default {
    name: 'adapt-select',
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
        default: () => '',
      },
      multiple: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        localValue: '',
        localOptions: [],
      }
    },
    watch: {
      value: {
        handler(val) {
          this.localValue = val
        },
        immediate: true,
      },
      options: {
        handler(val) {
          this.localOptions = val?.length ? val : this.$attrs.map || []
        },
        deep: true,
        immediate: true,
      },
    },
    created() {},
    methods: {
      onchange(val) {
        this.$emit('adapt-change', val)
      },
      translate(path) {
        return t(path)
      }
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
