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

      // 默认选中全部tab栏
      if (this.levelChoose.length === 0) {
        this.levelChoose.push(0);
      }
      this.$emit('handelRisk', this.levelChoose);
    },
  },
};
</script>
