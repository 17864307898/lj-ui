<template>
  <el-form :model="form">
    <el-form-item
      v-for="(item, index) in list"
      :key="`${item.code}_${index}`"
      label-width="80px"
      :label="item.label"
      :prop="item.field"
    >
      <!-- <span>{{ item.label }}：</span> -->
      <lj-input
        v-model="form[item.field]"
        v-bind="item"
        @change="handleChange"
        @input="handleInput"
        @blur="handleBlur"
      />
    </el-form-item>
  </el-form>
</template>

<script>
  import Vue from 'vue'
  import { Form, FormItem } from 'element-ui'
  Vue.use(Form)
  Vue.use(FormItem)

  export default {
    name: 'input-demo',
    data () {
      return {
        list: [
          {
            code: 101,
            showWordLimit: true,
            maxlength: 30,
            label: '单行输入',
            field: 'key1',
          },
          {
            code: 102,
            maxlength: 30,
            clearable: true,
            label: '多行输入',
            resize: 'none',
            field: 'key2',
          },
          {
            code: 103,
            label: '下拉',
            options: [
              {
                label: '选项1',
                value: 1,
              },
              {
                label: '选项2',
                value: 2,
              },
              {
                label: '选项3',
                value: 3,
              },
            ],
            filterable: true,
            multiple: true,
            field: 'key3',
          },
          {
            code: 104,
            label: '级联',
            showAllLevels: false,
            options: [
              {
                value: 'zhinan',
                label: '指南',
                children: [
                  {
                    value: 'shejiyuanze',
                    label: '设计原则',
                    children: [
                      {
                        value: 'yizhi',
                        label: '一致'
                      },
                      {
                        value: 'fankui',
                        label: '反馈'
                      },
                    ],
                  }
                ],
              }
            ],
            field: 'key4',
          },
          {
            code: 105,
            label: '日期选择',
            pickerOptions: {
              shortcuts: [
                {
                  text: '今天',
                  onClick(picker) {
                    picker.$emit('pick', new Date())
                  },
                },
                {
                  text: '昨天',
                  onClick(picker) {
                    const date = new Date()
                    date.setTime(date.getTime() - 3600 * 1000 * 24)
                    picker.$emit('pick', date)
                  },
                },
                {
                  text: '一周前',
                  onClick(picker) {
                    const date = new Date()
                    date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
                    picker.$emit('pick', date)
                  },
                },
              ],
            },
            type: 'daterange',
            field: 'key5',
          },
          {
            code: 106,
            label: '数字输入',
            max: 99,
            step: 4,
            controlsPosition: 'right',
            field: 'key6',
          },
          {
            code: 107,
            label: '单选按钮',
            options: [
              {
                label: '按钮1',
                value: 1,
              },
              {
                label: '按钮2',
                value: 2,
              },
            ],
            field: 'key7',
          },
          {
            code: 108,
            label: 'switch开关',
            activeText: '打开',
            inactiveText: '关闭',
            field: 'key8',
          },
          {
            code: 110,
            label: '未知类型',
            field: 'key9',
          },
        ],
        form: {},
      }
    },
    methods: {
      handleChange() {
        console.log(arguments)
      },
      handleInput() {},
      handleBlur() {}
    }
  }
</script>

<style lang="scss">
.demo-list {
  display: flex;
  margin-bottom: 12px;
  >span{
    font-weight: 600;
    margin-right: 12px;
    display: inline-block;
    width: 100px;
    text-align: right;
  }
  >div {
    width: 260px !important;
  }
}
</style>