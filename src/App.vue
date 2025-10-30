<template>
  <el-container
    style="
      min-height: 100vh;
      padding: 24px;
      background-color: #f7f8fa;
    "
  >
    <el-header
      style="text-align: center; font-size: 24px; font-weight: 600"
    >
      📝 我的待办清单
    </el-header>

    <el-main>
      <el-card class="box-card">
        <todo-input />
        <todo-filter />
        <todo-list />
      </el-card>
    </el-main>
  </el-container>
</template>

<script setup lang="ts">
  import TodoFilter from './components/TodoFilter.vue'
  import TodoInput from './components/TodoInput.vue'
  import TodoList from './components/TodoList.vue'
</script>

<style scoped>
  .box-card {
    max-width: 780px;
    margin: 0 auto;
    border-radius: 16px;
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.06);
    padding: 24px;
    background: white;
  }
</style>
