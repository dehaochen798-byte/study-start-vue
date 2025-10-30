<template>
  <el-container style="min-height: 100vh; padding: 20px">
    <el-header
      style="text-align: center; font-size: 24px; font-weight: 600"
    >
      📝 我的待办清单
    </el-header>
    <el-main>
      <el-card class="box-card">
        <todo-input />
        <todo-filter></todo-filter>
        <todo-list />
      </el-card>
    </el-main>
  </el-container>
</template>

<script setup lang="ts">
  import TodoInput from './components/TodoInput.vue'
  import TodoList from './components/TodoList.vue'
  import TodoFilter from './components/TodoFilter.vue'
</script>

<style scoped>
  .box-card {
    max-width: 600px;
    margin: 0 auto;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
</style>
