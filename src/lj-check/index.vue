<template>
  <div v-if="checkTotalFormat.type1 && checkTotalFormat.type2" class="jcnr">
    <div class="line">
      <span class="title">{{ $t('vabI18n["代码行数"]') }}</span>
      <!-- <div class="progress">
                <div
                  class="fl"
                  :style="{
                    width:'100%',
                  }"
                >
                  {{ Number(checkTotalFormat.type1.line + checkTotalFormat.type2.line) || 0 }}
                </div>
              </div> -->
      <div class="progress">
        <el-tooltip class="item" :content="'参与同源检测' + checkTotalFormat.type1.line" effect="light" :manual="!showTrace"
          placement="top">
          <div class="fl" :style="{
            width:
              setCapacity(
                checkTotalFormat.type1.line +
                checkTotalFormat.type2.line,
                checkTotalFormat.type1.line
              ) + '%',
          }">
            {{ checkTotalFormat.type1.line }}
          </div>
        </el-tooltip>
        <el-tooltip class="item" :content="'未参与同源检测' + checkTotalFormat.type2.line" effect="light"
          :manual="!$showOpenSource()" placement="top">
          <div class="fr" :style="{
            width:
              setCapacity(
                checkTotalFormat.type1.line +
                checkTotalFormat.type2.line,
                checkTotalFormat.type2.line
              ) + '%',
          }">
            {{ checkTotalFormat.type2.line }}
          </div>
        </el-tooltip>
      </div>
    </div>
    <div class="line">
      <span class="title">{{ $t('vabI18n["文件数"]') }}</span>
      <!-- <div class="progress">
                <div
                  class="fl"
                  :style="{
                    width:'100%',
                  }"
                >
                  {{ Number(checkTotalFormat.type1.count + checkTotalFormat.type2.count) || 0 }}
                </div>
              </div> -->
      <div class="progress">
        <el-tooltip class="item" :content="'参与同源检测' + checkTotalFormat.type1.count" effect="light" :manual="!showTrace"
          placement="top">
          <div class="fl" :style="{
            width:
              setCapacity(
                checkTotalFormat.type1.count +
                checkTotalFormat.type2.count,
                checkTotalFormat.type1.count
              ) + '%',
          }">
            {{ checkTotalFormat.type1.count }}
          </div>
        </el-tooltip>
        <el-tooltip class="item" :content="'未参与同源检测' + checkTotalFormat.type2.count" effect="light" :manual="!showTrace"
          placement="top">
          <div class="fr" :style="{
            width:
              setCapacity(
                checkTotalFormat.type1.count +
                checkTotalFormat.type2.count,
                checkTotalFormat.type2.count
              ) + '%',
          }">
            {{ checkTotalFormat.type2.count }}
          </div>
        </el-tooltip>
      </div>
    </div>
    <div class="line">
      <span class="title">{{ $t('vabI18n["容量"]') }}</span>
      <!-- <div class="progress">
                <div
                  class="fl"
                  :style="{
                    width:'100%',
                  }"
                >
                  {{ capacityNum(checkTotalFormat.type1.size  + checkTotalFormat.type2.size) }}
                </div>
              </div> -->
      <div class="progress">
        <el-tooltip class="item" :content="
          '参与同源检测容量' +
          capacityNum(checkTotalFormat.type1.size)
        " effect="light" :manual="!showTrace" placement="top">
          <div class="fl" :style="{
            width:
              setCapacity(
                checkTotalFormat.type1.size +
                checkTotalFormat.type2.size,
                checkTotalFormat.type1.size
              ) + '%',
          }">
            {{ capacityNum(checkTotalFormat.type1.size) }}
          </div>
        </el-tooltip>
        <el-tooltip class="item" :content="
          '未参与同源检测' + capacityNum(checkTotalFormat.type2.size)
        " effect="light" :manual="!showTrace" placement="top">
          <div class="fr" :style="{
            width:
              setCapacity(
                checkTotalFormat.type1.size +
                checkTotalFormat.type2.size,
                checkTotalFormat.type2.size
              ) + '%',
          }">
            {{ capacityNum(checkTotalFormat.type2.size) }}
          </div>
        </el-tooltip>
      </div>
    </div>
  </div>
</template>

<script>
  import { deepClone } from '../utils'

  export default {
    name: 'lj-check',
    components: {},
    props: {
      // 数据集
      data: {
        type: Array,
        default: () => undefined,
      },
    },
    data() {
      return {
        // config: [
        //   {

        //   }
        // ],
        completed: null, // 已完成检测
        uncompleted: null, // 未完成检测
      }
    },
    methods: {
      // 检测内容统计 格式化
      formatCheckTotal() {
        const completed = {}
        const uncompleted = {}

        const data = deepClone(this.data) || []

        data?.forEach((item) => {
          if (+item.match_type === 0) {
            this.handleFormat(uncompleted, item)
          } else {
            this.handleFormat(completed, item)
          }
        })

        this.completed = completed
        this.uncompleted = uncompleted
      },
      // 赋值
      handleFormat(data1, data2) {
        Object.entries(data2).forEach(([key, val]) => {
          if (Object.prototype.hasOwnProperty.call(data1, key)) {
            data1[key] += +val
          } else {
            data1[key] = +val
          }
        })
      },
    }
  }
</script>
