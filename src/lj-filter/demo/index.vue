<template>
  <div>
    <lj-filter
      :filter-list="filterChooseList"
      :filter-show="true"
      :form-list="formList"
      :filter-content="{
        name: '组件',
        empty: '清空',
        title: '筛选方式',
        sure: '筛选',
        cancel: '取消',
        reset: '重置',
        selected: '已选择',
      }"
      @form-data="getformDatas"
      @tag-close="filterCloseTag"
    >
      <template #left-box>
        <div>左边内容</div>
      </template>
      <template #reference>
        <i class="el-icon-ice-cream"></i>
      </template>
      <!-- <template #filter-items="props">
        <filter-items
          :filter-close="props.filterClose"
          :filter-reset="props.filterReset"
          :filter-sure="props.filterSure"
          :form-list="formList"
          :public-list-data="publicListData"
          @filterChooseData="fnFilterChooseData"
        />
      </template> -->
      <template #right-box>
        <div>右边内容</div>
      </template>
      <template #tag-left-box>
        <div v-if="filterChooseList && filterChooseList.length > 0">
          筛选tag左边内容：
        </div>
      </template>
      <template #tag-right-box>
        <div v-if="filterChooseList && filterChooseList.length > 0">
          筛选tag右边内容
        </div>
      </template>
    </lj-filter>
  </div>
</template>

<script>
import filterItems from './filterItems.vue';

export default {
  components: {
    filterItems,
  },
  data() {
    return {
      filterChooseList: [],
      publicListData: {
        importList: [
          { id: 0, type: '开源库' },
          { id: 1, type: '自建库' },
        ],
      },
      formList: [
        {
          code: 101,
          showWordLimit: true,
          label: '单行输入',
          field: 'key1',
        },
        {
          code: 103,
          label: '下拉2',
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
          field: 'key2',
        },
      ],
    };
  },
  created() {},
  methods: {
    // tag单个关闭
    filterCloseTag(tag) {
      console.log('关闭单个', tag)
    },
    // 筛选表单数据
    getformDatas(data) {
      console.log('取得表单数据', data);
      this.filterChooseList = []
      this.filterChooseList = data.filterChooseList || []
    },
    // 插槽使用处理筛选数据方法
    // fnFilterChooseData(data) {
    //   console.log(data)
    //   this.filterChooseList = [];
    //   this.publicListData.importList.forEach((el) => {
    //     if (el.id === data.importType) {
    //       this.filterChooseList.push({
    //         id: 1,
    //         type: '引入方式',
    //         item: el.type,
    //       });
    //     }
    //   });
    // },
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
