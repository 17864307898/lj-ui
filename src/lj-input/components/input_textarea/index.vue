<template>
  <div class="adapt-input">
    <el-input
      v-model="localValue"
      v-bind="{ ...$props, ...$attrs }"
      v-on="$listeners"
      @input="oninput"
    />
  </div>
</template>

<script>
  export default {
    name: 'adapt-input-textarea',
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
        default: 'textarea',
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