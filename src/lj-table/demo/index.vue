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
          
        ],
        dataList: [],
      }
    },
    created() {
      this.dataList = new Array(20).fill(0).map((item, index) => ({
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