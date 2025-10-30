<template>
  <el-card
    shadow="hover"
    class="todo-item"
    :class="{ done: todo.done }"
  >
    <el-scrollbar max-height="400px">
      <div class="item-content">
        <el-checkbox :model-value="todo.done" @change="toggle" />

        <!-- ✅ 使用 transition 包裹文字 -->
        <transition name="fade">
          <span key="text" class="text">{{ todo.text }}</span>
        </transition>

        <el-button type="danger" size="small" @click="confirmRemove">
          删除
        </el-button>
      </div>
    </el-scrollbar>
  </el-card>
</template>

<script setup lang="ts">
  import { ElMessageBox, ElMessage } from 'element-plus'
  import type { TodoItem } from '../stores/todo'
  import { useTodoStore } from '../stores/todo'

  const props = defineProps<{ todo: TodoItem }>()
  const store = useTodoStore()

  const toggle = () => {
    store.toggle(props.todo.id)
  }

  const confirmRemove = async () => {
    try {
      await ElMessageBox.confirm('确定删除该任务吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
      store.remove(props.todo.id)
      ElMessage.success('任务已删除')
    } catch {
      // 用户点击取消
    }
  }
</script>

<style scoped>
  .todo-item {
    display: flex;
    align-items: center;
    transition: all 0.3s ease;
  }

  .item-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
  }

  .text {
    flex: 1;
    word-break: break-word;
  }

  .done {
    opacity: 0.6;
    text-decoration: line-through;
    color: #999;
  }

  /* ✅ fade 动画 */
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.3s;
  }
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
</style>
