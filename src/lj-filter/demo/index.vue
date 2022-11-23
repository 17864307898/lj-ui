<template>
  <div>
    <div>
      <lj-filter
        :filter-choose-list="filterChooseList"
        :filter-show="true"
        :filter-content="{name: '组件', empty: '清空', title: '筛选方式', sure: '筛选', cancel: '取消', reset: '重置', selected: '已选择'}"
        :table-sel-arr="tableSelArr"
      >
        <template #query>
          <div>左边输入框内容</div>
        </template>
        <template #reference>
          <i class="el-icon-ice-cream"></i>
        </template>
        <template #filterItems="props">
          <filter-items
            :filter-close="props.filterClose"
            :filter-reset="props.resetData"
            :filter-sure="props.filterSure"
            :public-list-data="publicListData"
            @filterChooseData="filterChooseData"
          />
        </template>
        <template #batchIgnore>
          <batch-ignore
            :batch-show="1"
            :operate-name="'组件'"
            :row-data="tableSelArr"
            :type="queryForm.status"
            @batch-operate="fnBatchIgnoreOrNot"
          />
        </template>
        <template #right-content>
          <el-switch
            v-model="queryForm.status"
            active-color="#cd4443"
            :active-text="'已忽略' + '(' + ignoreTotal + ')'"
            :active-value="1"
            inactive-color="#409eff"
            inactive-text="未忽略"
            :inactive-value="0"
          />
        </template>
      </lj-filter>
    </div>
    <lj-table
      class="table-wrap"
      :columns="columns"
      :data="dataList"
      @selection-change="tableSelectionChange"
    >
    </lj-table>
  </div>
</template>

<script>
import filterItems from './filterItems.vue';
import batchIgnore from './batchIgnore.vue';

export default {
  components: {
    filterItems,
    batchIgnore,
  },
  data() {
    return {
      ignoreTotal: 0,
      filterChooseList: [],
      publicListData: {
        importList: [
          { id: 0, type: '开源库' },
          { id: 1, type: '自建库' },
        ],
      },
      tableSelArr: [],
      queryForm: {
        status: 0,
      },
      columns: [
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
    };
  },
  created() {
    this.dataList = new Array(3).fill(0).map((item, index) => ({
      name: `姓名${index + 1}`,
      sex: '男',
      old: 11 + index,
    }));
  },
  methods: {
    filterChooseData(data) {
      this.filterChooseList = [];
      this.publicListData.importList.forEach((el) => {
        if (el.id === data.importType) {
          this.filterChooseList.push({
            id: 1,
            type: '引入方式',
            item: el.type,
          });
        }
      });
      this.handleQuery();
    },
    handleQuery() {
      this.dataList = new Array(2).fill(0).map((item, index) => ({
        name: `姓名${index + 1}`,
        sex: '男',
        old: 11 + index,
      }));
    },
    fnBatchIgnoreOrNot() {
      console.log('忽略');
    },
    // 点击复选框
    tableSelectionChange(val) {
      this.tableSelArr = val;
    },
  },
};
</script>

<style lang="scss" scoped>
.filter-box {
  position: relative;
  display: flex;
  align-items: center;
}
.el-icon-ice-cream {
  padding: 0 10px;
  cursor: pointer;
  color: #1890ff;
  font-size: 22px !important;
}
.el-icon-ice-cream:hover {
  color: #409eff;
}
.mg-bottom20 {
  margin-bottom: 40px;
}
</style>
