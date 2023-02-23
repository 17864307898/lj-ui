<template>
  <div class="level-box">
    <h1>安全风险等级</h1>
    <div>
      <span
        v-for="(item, index) in LevelAllList"
        :key="item.type"
        :class="{
          isActive: levelChoose.includes(index),
          is_disabled: +item.num === 0 && item.id !== '',
        }"
        @click="LevelChooseBtn(item, index)"
      >
        <b>{{ item.num }}</b>
        {{ item.type }}
        <i v-if="levelChoose.includes(index)" class="el-icon-check"></i>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'lj-saftey-risk-check',
  props: {
    labelData: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {
      levelChoose: [0],
      LevelAllList: [
        { id: '', type: '全部', num: 0 },
        { id: 4, type: '严重', num: 0 },
        { id: 3, type: '高危', num: 0 },
        { id: 2, type: '中危', num: 0 },
        { id: 1, type: '低危', num: 0 },
        { id: 0, type: '未评级', num: 0 },
        { id: '-1', type: '无风险', num: 0 },
      ],
    };
  },
  mounted() {
    this.LevelAllList.forEach((item) => {
      for(let el in this.labelData) {
        if(el === item.id) {
          item.type = this.labelData[el]
        }
      }
    });
  },
  methods: {
    LevelChooseBtn(item, index) {
      // 除全部外，其他安全风险等级数量为0 置灰
      if (+item.num === 0 && item.id !== '') {
        return;
      }
      if (index <= 0) {
        this.levelChoose = [0];
        this.$emit('handelRisk', this.levelChoose);
        return;
      }
      if (this.levelChoose.includes(index)) {
        this.levelChoose = this.levelChoose.filter((el) => {
          return el != index;
        });
      } else {
        this.levelChoose.push(index);
        this.levelChoose = this.levelChoose.filter((el) => {
          return el != 0;
        });
      }
    },
    mounted() {
      this.handleInit()
    },
    methods: {
      // 初始化
      handleInit() {
        this.handleInitSelect()

        // 自定义label
        if (this.labelData) {
          this.screenList.forEach((item) => {
            item.type = this.labelData[item.id] || item.type
          })
        }
      },
      // 数量初始化
      handleInitNum() {
        this.screenList.forEach((item) => {
          item.num = this.countInfo[item.id] || 0
        })
      },
      // 初始有选中值时初始化
      handleInitSelect() {
        if (!this.selected && this.selected !== 0) {
          this.localData = this.multiple ? [''] : ''
          return
        }

        this.localData = this.selected
        if (this.multiple) {
          this.localData = []
          this.selected.forEach((x) => {
            const current = this.screenList.find((y) => y.id === x)

            if (current?.num) this.localData.push(x)
          })

          if (!this.localData.length) this.localData = ['']
        } else {
          const current = this.screenList.find((y) => y.id === this.selected)

          this.localData = current?.num ? this.selected : ''
        }
      },
      // 点击选项
      handleItemClick(item) {
        if (this.multiple) {
          this.handleMultiple(item)
        } else {
          this.handleSingle(item)
        }
      },
      // 单选处理方式
      handleSingle({ id, num }) {
        // 除全部外，其他安全风险等级数量为0 置灰
        if (+num === 0 && id !== '') {
          return
        }

        this.localData = id
        this.handleEmitData()
      },
      // 多选处理方式
      handleMultiple({ id, num }) {
        // 除全部外，其他安全风险等级数量为0 置灰
        if (+num === 0 && id !== '') {
          return
        }

        // 点击全部，置空其他
        if (id === '') {
          const i = this.localData.findIndex((x) => x === id)
          if (i >= 0) return
          
          this.localData = ['']
          this.handleEmitData()
          return
        }

        // 存在的清空
        if (this.localData.includes(id)) {
          const i = this.localData.findIndex((x) => x === id)
          this.localData.splice(i, 1)
        } else {
          const i = this.localData.findIndex((x) => x === '')
          if (i >= 0) this.localData.splice(i, 1)

          this.localData.push(id)
        }

        // 默认选中全部tab栏
        if (this.localData.length === 0) {
          this.localData.push('')
        }

        this.handleEmitData()
      },
      // 判断是否已选中
      handleHasChecked({ id = '' }) {
        if (this.multiple) {
          return this.localData?.includes(id)
        }

      // 默认选中全部tab栏
      if (this.levelChoose.length === 0) {
        this.levelChoose.push(0);
      }
      this.$emit('handelRisk', this.levelChoose);
    },
  },
};
</script>
