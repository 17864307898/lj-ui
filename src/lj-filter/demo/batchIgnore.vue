<template>
  <el-link
    :type="batchShow || !type ? 'danger' : 'primary'"
    :underline="false"
    @click="batchIgnore(rowData)"
  >
    {{ batchShow ? '批量' : '' }}{{ type == 1 ? '撤销' : '忽略' }}
  </el-link>
</template>

<script>

  export default {
    name: 'fossbinary-front-batch-operate',
    props: {
      rowData: {
        type: [Object, Array],
        default: () => {
          return {} || []
        },
      },
      type: {
        type: Number,
        default: 0,
      },
      batchShow: {
        type: Number,
        default: 0,
      },
      operateName: {
        type: String,
        default: '',
      },
    },
    data() {
      return {}
    },

    mounted() {},

    methods: {
      // 批量忽略
      batchIgnore(data) {
        let ids = [];
          let num = null
        if (data.project_id) {
          ids = [data.project_id]
        } else {
          data.forEach((el) => {
            ids.push(el.project_id)
          })
          num = data.length
        }
        const conNum = num > 0 ? num + '个' : '该'
        const conText = num > 0 ? '批量' : ''
        const content =
          '是否确认' +
          conText +
          (+this.type === 1 ? '撤销' + conNum : '忽略' + conNum)

        this.$confirm(content + this.operateName + '？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        })
          .then(() => {
            this.$emit('batch-operate', ids)
          })
          .catch(() => {})
      },
    },
  }
</script>

<style lang="scss">
  .el-link {
    font-size: 12px !important;
  }
</style>
