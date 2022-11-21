<template>
  <div class="adapt-input">
    <el-input
      v-model="localValue"
      v-bind="{ ...$props, ...$attrs }"
      @input="oninput"
    />
  </div>
</template>

<script>
  import Vue from 'vue'
  import { Input } from 'element-ui'

  Vue.use(Input)

  export default {
    name: 'adapt-input',
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
        default: 'text',
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
      oninput(val) {
        this.$emit('adapt-change', val)
      },
    },
  }
</script>