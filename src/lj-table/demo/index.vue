<template>
  <div>
    <lj-table
      class="table-wrap"
      :columns="columns"
      :data="dataList"
      v-loading="loading"
      :height="'100%'"
      full-container
      :pagination="pagination"
    >
      <template #type_expand>
        <lj-table
          class="table-wrap"
          :columns="columns"
          :data="dataList.slice(0, 10)"
          :full-container="false"
          :need-pagination="false"
          :pagination="pagination"
        />
      </template>

      <template #type_index="{ $index }">
        {{ $index + (pagination.pageNo - 1) * pagination.pageSize + 1 }}
      </template>
    </lj-table>
    <lj-table class="table-wrap" :columns="columns" :data="dataList"></lj-table>
  </div>
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
          minWidth: 100,
        },
        {
          label: '性别',
          prop: 'sex',
          minWidth: 100,
          showOverflowTooltip: false,
        },
        {
          label: '年龄',
          prop: 'old',
          minWidth: 100,
        },
        // {
        //   label: '年龄2',
        //   prop: 'old',
        //   minWidth: 100,
        // },
        // {
        //   label: '年龄3',
        //   prop: 'old',
        //   minWidth: 100,
        // },
        // {
        //   label: '年龄4',
        //   prop: 'old',
        //   minWidth: 100,
        // },
        // {
        //   label: '年龄5',
        //   prop: 'old',
        //   minWidth: 100,
        // },
        {
          label: '操作',
          prop: 'action',
          minWidth: 100,
          fixed: 'right',
        },
      ],
      dataList: [],
      pagination: {
        pageNo: 1,
        pageSize: 20,
        total: 0,
      },
      loading: false,
    };
  },
  created() {
    this.loading = true;

    setTimeout(() => {
      this.dataList = new Array(20).fill(0).map((item, index) => ({
        name: `姓名${index + 1}`,
        sex: '测试性别测试性别',
        old: 11 + index,
      }));

      this.loading = false;
    }, 1000);
  },
};
</script>

<style lang="scss" scoped>
.table-wrap {
  height: 400px;
}
</style>