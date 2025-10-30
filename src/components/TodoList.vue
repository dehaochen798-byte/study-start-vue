<template>
  <el-scrollbar height="300px">
    <div class="todo-list-wrapper">
      <transition-group name="list" tag="div" class="todo-list">
        <todo-item
          v-for="item in store.filteredTodos"
          :key="item.id"
          :todo="item"
        />
      </transition-group>

      <el-empty
        v-if="store.filteredTodos.length === 0"
        description="暂无任务，开始添加一个吧！"
      />
    </div>
  </el-scrollbar>
</template>

<script setup lang="ts">
  import { useTodoStore } from '../stores/todo'
  import TodoItem from './TodoItem.vue'

  const store = useTodoStore()
</script>

<style scoped>
  .todo-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  /* 平滑动画效果 */
  .list-enter-active,
  .list-leave-active {
    transition: all 0.4s ease;
  }
  .list-enter-from {
    opacity: 0;
    transform: translateY(10px);
  }
  .list-leave-to {
    opacity: 0;
    transform: translateY(-10px);
  }
</style>
