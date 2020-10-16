<template>
  <div id="app">
    <todo-header />
    <todo-wrap />
    <todo-footer />
  </div>
</template>

<script>
import TodoHeader from "@/todo/header.vue";
import TodoFooter from "@/todo/footer.jsx";
import TodoWrap from "@/todo/todo.vue";

export default {
  name: "App",
  components: {
    TodoHeader,
    TodoFooter,
    TodoWrap,
  },
  data() {
    return {};
  },
  methods: {},
  created() {},
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  background: rgba($color: #999, $alpha: 0.9);
  // background: rgba(153, 153, 153, 0.9);
}
</style>

<style lang="scss" scoped></style>
