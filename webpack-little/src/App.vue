<template>
  <div id="app">
    <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->
    <div class="conter">
      {{ text }}
      <img :src="avatar">
      <img alt="Vue logo" :src="require('@/assets/logo.png')">
      <img src="./assets/bg.jpeg" alt="">
    </div>
  </div>
</template>

<script>
// import HelloWorld from "./components/HelloWorld.vue";
import "@/styles/public.scss";
import avatar from '@/assets/logo.png'

export default {
  name: "App",
  components: {
    // HelloWorld,
  },
  data() {
    return {
      text: "111",
      avatar:avatar
    };
  },
  methods: {},
  created() {
    console.log("二狗子");
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

</style>

<style lang="scss" scoped>

</style>
