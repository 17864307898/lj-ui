<template>
  <!-- table简便封装 -->
  <div class="lj-table lj-v-flex">
    <!-- 搜索区域 -->
    <el-row>
      <slot name="query"></slot>
    </el-row>
    <!-- 表格区域 -->
    <el-row class="lj-flex-1">
      <el-table
        :ref="`table_${tableKey}`"
        class="table"
        :data="dataset"
        :height="height"
        v-bind="$attrs"
        v-on="$listeners"
      >
        <!-- 展示数据 -->
        <el-table-column
          v-for="(col, index) in columns"
          v-bind="col"
          :key="`${index}_${col.prop}`"
          :column-key="col.prop"
          :selectable="selectable"
          show-overflow-tooltip
        >
          <!-- 允许自定义表头 -->
          <template
            #header="{ column, $index }"
            v-if="!['selection', 'index', 'expand'].includes(col.type)"
          >
            <slot
              :$index="$index"
              :column="column"
              :name="`${col.prop}_Header`"
            >
              {{ column.label }}
            </slot>
          </template>
          <!-- 允许自定义内容 -->
          <template
            #default="{ row, column, $index }"
            v-if="!['selection', 'index', 'expand'].includes(col.type)"
          >
            <slot
              :$index="$index"
              :col="col"
              :column="column"
              :name="col.prop"
              :row="row"
            >
              {{ row[col.prop] || row[col.prop] === 0 ? row[col.prop] : '--' }}
            </slot>
          </template>
          <!-- 扩展类型 -->
          <template
            #default="{ row, column, $index }"
            v-else-if="['expand'].includes(col.type)"
          >
            <slot
              :$index="$index"
              :col="col"
              :column="column"
              :name="`type_${col.type}`"
              :row="row"
            />
          </template>
        </el-table-column>

        <!-- 无数据展示 -->
        <template #empty>
          <slot name="empty" />
        </template>

        <!-- 插入表格最后一行 -->
        <template #append>
          <slot name="append" />
        </template>
      </el-table>
    </el-row>
    <el-row>
      <!-- 分页支持自定义 -->
      <slot v-if="needPagination" name="pagination" :pagination="pagination">
        <div class="lj-v-flex flex-row jc-end pagination-wrap">
          <el-pagination
            :current-page="pagination.pageNo"
            :page-size="pagination.pageSize"
            :total="pagination.total"
            v-bind="paginationConfig"
            @current-change="handlePageChange"
            @size-change="handleSizeChange"
          />
        </div>
      </slot>
    </el-row>
  </div>
</template>

<script>
  import Vue from 'vue'
  import { Table, TableColumn, Row, Col, Pagination } from 'element-ui'
  import { deepClone } from '../utils'

  Vue.use(Table)
  Vue.use(TableColumn)
  Vue.use(Row)
  Vue.use(Col)
  Vue.use(Pagination)

  export default {
    name: 'lj-table',
    props: {
      // table-key  多个table时需传入
      tableKey: {
        type: String,
        default: () => 'ref',
      },
      // 表头配置
      columns: {
        type: Array,
        default: () => [],
      },
      // 数据集
      data: {
        type: Array,
        default: () => [],
      },
      // 分页信息
      pagination: {
        type: Object,
        default: () => ({
          pageNo: 1,
          pageSize: 10,
          total: 0,
        }),
      },
      // 自定义分页信息
      customPagination: {
        type: Object,
        default: () => null,
      },
      // 是否需要分页信息
      needPagination: {
        type: Boolean,
        default: () => true,
      },
      // 当前行是否可选
      selectable: {
        type: Function,
        default: () => true,
      },
      // 表格高度 默认100%
      height: {
        type: [Number, String],
        default: () => '100%',
      },
    },
    data() {
      return {
        // 默认分页信息
        defaultPagination: {
          background: true,
          layout: 'total, sizes, prev, pager, next, jumper',
        },
      }
    },
    computed: {
      // 深克隆一份data
      dataset() {
        return deepClone(this.data)
      },
      // 分页配置
      paginationConfig() {
        return {
          ...this.defaultPagination,
          ...this.customPagination,
        }
      },
    },
    watch: {},
    created() {},
    mounted() {},
    methods: {
      // 页码改变
      handlePageChange(page) {
        this.$emit('page-change', page)
      },
      // 每页条数改变
      handleSizeChange(size) {
        this.$emit('size-change', size)
      },
      // 获取当前ref实例
      handleGetRefs() {
        return new Promise((resovle) => {
          this.$nextTick(() => {
            const ref = this.$refs[`table_${this.tableKey}`]

            resovle(ref)
          })
        })
      },
    },
  }
</script>
