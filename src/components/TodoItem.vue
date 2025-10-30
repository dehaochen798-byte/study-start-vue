<template>
  <el-card
    shadow="hover"
    class="todo-item"
    :class="{ done: todo.done }"
  >
    <div class="item-content">
      <el-checkbox :model-value="todo.done" @change="toggle" />

      <div class="text-box" @dblclick="startEdit">
        <template v-if="isEditing">
          <el-input
            v-model="editText"
            size="small"
            @keyup.enter="finishEdit"
            @blur="finishEdit"
            autofocus
          />
        </template>
        <template v-else>
          <transition name="fade">
            <span key="text" class="text">{{ todo.text }}</span>
          </transition>
        </template>
        <!-- ✅ 使用 transition 包裹文字 -->
      </div>

      <el-button type="danger" size="small" @click="confirmRemove">
        删除
      </el-button>
    </div>
  </el-card>
</template>

<script setup lang="ts">
  import { ElMessageBox, ElMessage } from 'element-plus'
  import type { TodoItem } from '../stores/todo'
  import { useTodoStore } from '../stores/todo'
  import { ref } from 'vue'

  const props = defineProps<{ todo: TodoItem }>()
  const store = useTodoStore()

  const isEditing = ref(false)
  const editText = ref('')

  const toggle = () => {
    store.toggle(props.todo.id)
  }

  const startEdit = () => {
    if (props.todo.done) return
    isEditing.value = true
    editText.value = props.todo.text
  }

  const finishEdit = () => {
    isEditing.value = false
    const newText = editText.value.trim()
    if (newText && newText !== props.todo.text) {
      store.editText(props.todo.id, newText)
      ElMessage.success('任务已更新')
    }
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

  .text-box {
    flex: 1;
    cursor: pointer;
  }

  .text {
    display: inline-block;
    padding: 4px 8px;
    border-radius: 4px;
  }

  .text-box:hover .text {
    background-color: #f5f5f5;
  }

  .done .text {
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
