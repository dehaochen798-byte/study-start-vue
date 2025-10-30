<template>
  <div class="todo-input">
    <el-input
      v-model="newTask"
      placeholder="输入新任务，按回车添加"
      @keyup.enter="addTask"
      clearable
    >
      <template #append>
        <el-button type="primary" @click="addTask">添加</el-button>
      </template>
    </el-input>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import { useTodoStore } from '../stores/todo'
  import { ElMessage } from 'element-plus'

  const store = useTodoStore()
  const newTask = ref<string>('')

  const addTask = () => {
    const text = newTask.value.trim()
    if (!text) {
      ElMessage.warning('请输入任务内容！')
      return
    }
    store.add(text)
    newTask.value = ''
    ElMessage.success('任务添加成功！')
  }
</script>

<style scoped>
  .todo-input {
    margin-bottom: 20px;
  }
</style>
