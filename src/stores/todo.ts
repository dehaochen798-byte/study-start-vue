// src/stores/todo.ts
import { defineStore } from 'pinia'

/**
 * ✅ 1. 定义任务类型
 */
export interface TodoItem {
  id: number
  text: string
  done: boolean
}

export interface SearchAndFilter {
  keyword: string
  filter: string
}

/**
 * ✅ 2. 定义 store 的状态类型
 */
interface TodoState {
  todos: TodoItem[]
}

/**
 * ✅ 3. 创建 Pinia Store
 */
export const useTodoStore = defineStore('todo', {
  state: (): TodoState & SearchAndFilter => ({
    todos: JSON.parse(localStorage.getItem('todos') || '[]'),
    keyword: '',
    filter: 'all',
  }),
  getters: {
    filteredTodos(state) {
      let list = state.todos
      if (state.filter === 'active')
        list = list.filter((t) => !t.done)
      if (state.filter === 'done') list = list.filter((t) => t.done)
      if (state.keyword.trim()) {
        const keyword = state.keyword.toLowerCase()
        list = list.filter((t) =>
          t.text.toLowerCase().includes(keyword),
        )
      }

      return list
    },
  },
  actions: {
    /**
     * 添加任务
     * @param text 任务内容
     */
    add(text: string) {
      const newTodo: TodoItem = {
        id: Date.now(),
        text,
        done: false,
      }
      this.todos.push(newTodo)
      console.log('add')
      this.save()
    },

    /**
     * 切换完成状态
     */
    toggle(id: number) {
      const todo = this.todos.find((t) => t.id === id)
      if (todo) todo.done = !todo.done
      this.save()
    },

    /**
     * 删除任务
     */
    remove(id: number) {
      this.todos = this.todos.filter((t) => t.id !== id)
      this.save()
    },

    /*
     *双击修改
     */
    editText(id: number, newText: string) {
      this.todos = this.todos.map((todo) =>
        todo.id === id ? { ...todo, text: newText } : todo,
      )
      this.save()
    },

    /*
     *持久化
     */
    save() {
      localStorage.setItem('todos', JSON.stringify(this.todos))
    },

    setFilter(keyword: string, filter: string) {
      this.keyword = keyword
      this.filter = filter
    },
  },
})
