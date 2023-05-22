<template>
  <LuckyWheel
      ref="myLucky"
      width="300px"
      height="300px"
      :prizes="this.$route.query.drawtype==1?prizes:prizes1"
      :blocks="blocks"
      :buttons="buttons"
      @start="startCallback"
      @end="endCallback"
  />
  <button style="margin-top:10px;background: #747bff" @click="this.$router.push({path:'/'})">返回</button>
</template>

<script>
import {useRouter} from 'vue-router';
export default {
  data () {
    return {
      blocks: [{ padding: '13px', background: '#617df2' }],
      prizes: [
        { fonts: [{ text: '谢谢参与', top: '10%' }], background: '#e9e8fe' },
        { fonts: [{ text: '林克30分钟', top: '10%' }], background: '#b8c5f2' },
        { fonts: [{ text: '手机10分钟', top: '10%' }], background: '#e9e8fe' },
        { fonts: [{ text: '小零食一个', top: '10%' }], background: '#b8c5f2' },
        { fonts: [{ text: '10元', top: '10%' }], background: '#e9e8fe' },
        { fonts: [{ text: '棒棒糖一个', top: '10%' }], background: '#b8c5f2' },
      ],
      prizes1: [
        { fonts: [{ text: '打扫卫生', top: '10%' }], background: '#e9e8fe' },
        { fonts: [{ text: '跑步10分钟', top: '10%' }], background: '#b8c5f2' },
        { fonts: [{ text: '古诗1首', top: '10%' }], background: '#e9e8fe' },
        { fonts: [{ text: '逃过一节', top: '10%' }], background: '#b8c5f2' },
        { fonts: [{ text: '跳绳300个', top: '10%' }], background: '#e9e8fe' },
        { fonts: [{ text: '下次抽奖取消', top: '10%' }], background: '#b8c5f2' },
      ],
      buttons: [{
        radius: '35%',
        background: '#8a9bf3',
        pointer: true,
        fonts: [{ text: '开始', top: '-10px' }]
      }],
    }
  },

mounted() {
    const {query, params}=useRouter()
    console.log(this.$route.query.drawtype)
  console.log(this.$router)
},
  methods: {
    // 点击抽奖按钮会触发star回调
    startCallback () {
      // 调用抽奖组件的play方法开始游戏
      this.$refs.myLucky.play()
      // 模拟调用接口异步抽奖
      setTimeout(() => {
        // 假设后端返回的中奖索引是0
        let index = 0
        const dice = [
          { value: 0, prob: 1 / 6 },
          { value: 1, prob: 1 / 6 },
          { value: 2, prob: 1 / 6 },
          { value: 3, prob: 1 / 6 },
          { value: 4, prob: 1 / 6 },
          { value: 5, prob: 1 / 6 },
        ];
        index=this.getRandomItem(dice).value
        console.log(index)
        // 调用stop停止旋转并传递中奖索引
        this.$refs.myLucky.stop(index)
      }, 3000)
    },
    // 抽奖结束会触发end回调
    endCallback (prize) {
      console.log(prize)
    },
     getRandomItem(items) {
      // 计算元素出现概率总和
      const totalProb = items.reduce((sum, item) => sum + item.prob, 0);
      // 生成一个 0~1 之间的随机数，作为概率值
      const rand = Math.random();
      // 遍历数组并比较元素概率与随机概率值，返回一个随机选择的元素
      let accumProb = 0;
      for (const item of items) {
        accumProb += item.prob / totalProb;
        if (rand < accumProb) {
          return item;
        }
      }
      // 如果数组为空或元素的概率总和为 0，则返回 undefined
      return undefined;
    }
  }
}
</script>