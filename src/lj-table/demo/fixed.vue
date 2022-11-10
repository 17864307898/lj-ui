<template>
  <lj-table
    class="table-wrap"
    :columns="columns"
    :data="dataList"
  />
</template>

<script>
  export default {
    data() {
      return {
        columns: [
          {
            type: 'selection',
            width: 55,
          },
          {
            label: '姓名',
            prop: 'name',
            minWidth: 300,
          },
          {
            label: '性别',
            prop: 'sex',
            minWidth: 300,
          },
          {
            label: '年龄',
            prop: 'old',
            minWidth: 300,
          },
          {
            label: '操作',
            prop: 'action',
            fixed: 'right',
            minWidth: 55,
          }
        ],
        dataList: [],
      }
    },
    created() {
      this.dataList = new Array(10).fill(0).map((item, index) => ({
        name: `姓名${index + 1}`,
        sex: '男',
        old: 11 + index,
      }))
    },
  }
</script>

<style lang="scss" scoped>
 .table-wrap {
  height: 300px;
 }
</style>