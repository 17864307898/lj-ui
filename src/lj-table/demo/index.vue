<template>
  <lj-table
    class="table-wrap"
    :columns="columns"
    :data="dataList"
    :pagination="pagination"
  >
    <template #type_expand>
      <lj-table
        class="table-wrap"
        :columns="columns"
        :data="[]"
        :need-pagination="false"
        :pagination="pagination"
      />
    </template>

    <template #type_index="{ $index }">
      {{ $index + (pagination.pageNo - 1) * pagination.pageSize + 1 }}
    </template>
  </lj-table>
</template>

<script>
  export default {
    data() {
      return {
        columns: [
          {
            type: 'expand',
            width: 55,
          },
          {
            type: 'selection',
            width: 55,
          },
          {
            type: 'index',
            width: 55,
            label: '序号',
          },
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
            fixed: 'right',
          },
        ],
        dataList: [],
        pagination: {
          pageNo: 1,
          pageSize: 20,
          total: 0,
        },
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