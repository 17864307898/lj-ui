<template>
  <div class="adapt-input">
    <!-- 单一选项 -->
    <component
      v-if="isSolo"
      :is="dynamicComponent"
      :value="localValue"
      v-bind="options[0]"
      v-on="$listeners"
      @change="handleInputChange"
    >
      {{ options[0].label }}
    </component>

    <!-- 多个选项组 -->
    <el-checkbox-group
      v-else
      v-model="localValue" 
      v-bind="$attrs"
      v-on="$listeners"
      @change="handleInputChange"
    >
      <component
        v-for="(item, index) in finalOptions"
        :key="`${index}_${item.label}`"
        :is="dynamicComponent"
        :label="item.value"
        v-bind="item"
      >
        {{ item.label }}
      </component>
    </el-checkbox-group>
  </div>
</template>

<script>
  export default {
    name: 'AdaptCheckbox',
    components:{},
    props:{
      value: {
        type: undefined,
        default: undefined
      },
      // 复选框选项配置
      options: {
        type: Array,
        default: () => ([]),
      },
      // 展示为按钮形式
      isButton: {
        type: Boolean,
        default: () => false
      }
    },
    data(){
      return {
        localValue: undefined
      }
    },
    computed: {
      // 当前checkbox展示形式
      dynamicComponent() {
        return this.isButton ? 'el-checkbox-button' : 'el-checkbox'
      },

      // 判断是否为单一按钮
      isSolo() {
        const { options = [] } = this

        return options?.length === 1
      },

      // options处理
      finalOptions() {
        if (this.isSolo) return this.options

        return this.options.map((item) => {
          const current = { ...item }
          delete current['true-label']
          delete current['trueLabel']
          delete current['false-label']
          delete current['falseLabel']

          return current
        })
      }
    },
    watch: {
      value: {
        handler(val) {
          if (!val) {
            this.localValue = this.isSolo ? false : []
            return
          }

          this.localValue = val
        },
        immediate: true,
        deep: true
      }
    },
    methods: {
      // 值变动
      handleInputChange(val) {
        console.log(val)
        this.$emit('adapt-change', val)
      }
    }
  }
</script>
<style lang="scss" scoped>
  .adapt-input {
    width: 100%;
  }
</style>