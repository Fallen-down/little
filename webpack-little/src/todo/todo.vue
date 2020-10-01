<template>
  <main class="main">
    <input
      class="form-control form-control-lg"
      type="text"
      autofocus
      placeholder="接下来要做什么？"
      @keyup.enter="addTodo"
    />
    <div class="list-group">
      <todo-item />
    </div>
    <todo-tabs />
  </main>
</template>
<script>
import TodoItem from "@/todo/item.vue";
import TodoTabs from "@/todo/tabs.vue";
export default {
  components: {
    TodoItem,
    TodoTabs,
  },
  data() {
    return {
      list: [],
    };
  },
  methods: {
    addTodo() {},
  },
};
</script>
<style lang="scss" scoped>
.main {
  position: relative;
  width: 600px;
  margin: 0 auto;
  box-shadow: 0 0 5px #666;
}
</style>
