<template>
  <div class="todo-item" :class="[todo.completed ? 'completed' : '']">
    <!-- <input type="checkbox" class="toggle" v-model="todo.completed" />
    <label> {{ todo.content }}</label>
    <button class="destory" @click="deleteTodo"></button> -->
    <div class="list-group-item">
      <div class="custom-control custom-checkbox">
        <input type="checkbox" class="custom-control-input" :checked='true'/>
        <label class="custom-control-label">
          Cras justo odio
        </label>
        <button type="button" class="close" aria-label="关闭">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    </div>
    <div class="list-group-item active">
      <div class="custom-control custom-checkbox">
        <label class="custom-control-label">
          <input type="checkbox" class="custom-control-input" />
          Cras justo odio
        </label>
        <button type="button" class="close" aria-label="关闭">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    </div>
    <div class="list-group-item disabled">
      <div class="custom-control custom-checkbox">
        <label class="custom-control-label">
          <input type="checkbox" class="custom-control-input" />
          Cras justo odio
        </label>
        <button type="button" class="close" aria-label="关闭">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    todo: {
      type: Object,
      // required: true, 是否必填
      default: () => ({}),
    },
  },
  data() {
    return {};
  },
  methods: {
    deleteTodo() {},
  },
};
</script>
<style lang="scss" scoped></style>
