<template>
  <button style="background: crimson" @click="myRouter.push({
  name: 'bigWheel',
  query: { drawtype: 0 }
})">惩罚</button>
  <button @click="myRouter.push({
  name: 'bigWheel',
  query: { drawtype: 1 }
})" style="background: gold">奖励</button>
</template>
<script setup>
import {useRouter} from "vue-router";
import { useStore } from 'vuex' // 引入useStore 方法
const store = useStore()  // 该方法用于返回store 实例
const myRouter=useRouter();
/*vuex store对象属性介绍
Vue3中获取 store 实例对象的方法
vue2 中可以通过 this.$store.xxx 的方式拿到 store 的实例对象。

vue3 中的 setup 在 beforecreate 和 created 前执行，此时 vue对象还未被创建，没有了之前的this，所以此处我们需要用到另一种方法来获取到 store 对象。*/
console.log(store.state.count)
console.log(store.commit('increment',100))
console.log(store.dispatch('incrementAsync',1))
</script>