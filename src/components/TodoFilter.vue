<template>
  <div class="todo-filter">
    <el-input v-model="keyword" placeholder="搜索任务" clearable />
    <el-select
      v-model="filter"
      placeholder="筛选状态"
      style="width: 160px"
    >
      <el-option label="全部" value="all" />
      <el-option label="未完成" value="active" />
      <el-option label="已完成" value="done" />
    </el-select>
  </div>
</template>

<script setup lang="ts">
  import { ref, watch } from 'vue'
  import { useTodoStore } from '../stores/todo'

  const store = useTodoStore()
  const keyword = ref('')
  const filter = ref<'all' | 'active' | 'done'>('all')

  // ✅ 监听搜索与筛选变化
  watch([keyword, filter], () => {
    store.setFilter(keyword.value, filter.value)
  })
</script>

<style scoped>
  .todo-filter {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
  }
</style>
