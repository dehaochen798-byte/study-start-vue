<template>
  <el-card
    shadow="hover"
    class="todo-item"
    :class="{ done: todo.done }"
  >
    <div class="item-content">
      <el-checkbox v-model="todo.done" />
      <transition name="fade">
        <span key="text" class="text">{{ todo.text }}</span>
      </transition>
      <el-button type="danger" size="small" @click="remove(todo.id)">
        删除
      </el-button>
    </div>
  </el-card>
</template>

<script setup lang="ts">
  import { useTodoStore } from '../stores/todo'
  import type { TodoItem } from '../stores/todo'

  // 定义 props 类型
  const props = defineProps<{
    todo: TodoItem
  }>()

  const store = useTodoStore()

  const remove = (id: number) => {
    store.remove(id)
  }
</script>

<style scoped>
  .todo-item {
    display: flex;
    align-items: center;
  }

  .item-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .done {
    opacity: 0.6;
    text-decoration: line-through;
  }
</style>
