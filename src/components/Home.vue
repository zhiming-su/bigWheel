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

const myRouter=useRouter();

</script>