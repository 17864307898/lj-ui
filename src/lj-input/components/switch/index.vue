<template>
  <div class="adapt-input">
    <el-switch
      v-model="localValue"
      v-bind="{ ...$props, ...$attrs }"
      v-on="$listeners"
      @change="onchange"
    />
  </div>
</template>

<script>
  import Vue from 'vue'
  import translateMixin from '../../mixins'
  import { Switch } from 'element-ui'

  Vue.use(Switch)

  export default {
    name: 'adapt-switch',
    mixins: [translateMixin],
    props: {
      value: {
        type: undefined,
        default: undefined,
      },
      placeholder: {
        type: String,
        default: '请填写',
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
    methods: {
      onchange(val) {
        this.$emit('adapt-change', val)
      },
    },
  }
</script>