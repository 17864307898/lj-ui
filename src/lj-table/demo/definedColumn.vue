<template>
  <lj-table :columns="columns" :data="dataList">
    <template #action="{ row, $index }">
      <el-button type="text" @click="handleEditRow(row, $index)">编辑</el-button>
    </template>
  </lj-table>
</template>

<script>
  import { Button } from 'element-ui'

  export default {
    name: 'defined-column',
    components:{
      ElButton: Button,
    },
    props:{},
    data(){
      return {
        columns: [
          {
            label: '姓名',
            prop: 'name',
          },
          {
            label: '性别',
            prop: 'sex',
          },
          {
            label: '年龄',
            prop: 'old',
          },
          {
            label: '操作',
            prop: 'action',
          },
        ],
        dataList: [],
      }
    },
    created() {
      this.dataList = new Array(3).fill(0).map((item, index) => ({
        name: `姓名${index + 1}`,
        sex: '男',
        old: 11 + index,
      }))
    },
    methods: {
      handleEditRow(row, index) {
        console.log(row, index)
      },
    },
  }
</script>
<style lang="scss" scoped></style>