import { useState, useEffect } from 'react'
import TodoForm from '././components/TodoForm'
import TodoList from '././components/TodoList'
import FilterTabs from '././components/FilterTabs'
import {
  loadTodosFromStorage,
  saveTodosToStorage,
  loadDarkModeFromStorage,
  saveDarkModeToStorage,
  addTodo as addTodoService,
  deleteTodo as deleteTodoService,
  toggleTodo as toggleTodoService,
  updateTodo as updateTodoService,
  reorderTodos as reorderTodosService,
  filterTodos as filterTodosService,
  getTodoStats,
  type Todo,
} from '././services/todoService'

type FilterType = 'all' | 'completed' | 'pending'

function App() {
  const [todos, setTodos] = useState<Todo[]>(loadTodosFromStorage())
  const [filter, setFilter] = useState<FilterType>('all')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [darkMode, setDarkMode] = useState(loadDarkModeFromStorage())
  const [draggedId, setDraggedId] = useState<string | null>(null)

  useEffect(() => {
    saveTodosToStorage(todos)
  }, [todos])

  useEffect(() => {
    saveDarkModeToStorage(darkMode)
  }, [darkMode])

  const handleAddTodo = (title: string, description: string, dueDate: string) => {
    setTodos((prevTodos) => addTodoService(prevTodos, title, description, dueDate))
  }

  const handleDeleteTodo = (id: string) => {
    setTodos((prevTodos) => deleteTodoService(prevTodos, id))
    if (editingId === id) setEditingId(null)
  }

  const handleToggleTodo = (id: string) => {
    setTodos((prevTodos) => toggleTodoService(prevTodos, id))
  }

  const handleUpdateTodo = (
    id: string,
    title: string,
    description: string,
    dueDate: string
  ) => {
    setTodos((prevTodos) => updateTodoService(prevTodos, id, title, description, dueDate))
    setEditingId(null)
  }

  const handleReorderTodos = (fromIndex: number, toIndex: number) => {
    setTodos((prevTodos) => reorderTodosService(prevTodos, fromIndex, toIndex))
  }

  const handleToggleDarkMode = () => {
    setDarkMode((prev) => !prev)
  }

  const filteredTodos = filterTodosService(todos, filter)
  const stats = getTodoStats(todos)

  return (
    <div className={`min-h-screen py-8 px-4 sm:px-6 lg:px-8 transition-colors ${darkMode ? 'bg-gray-900' : 'bg-blue-50'}`}>
      <div className="flex flex-col items-center">
        <div className={`w-full ${darkMode ? 'text-white' : ''}`}>
          <div className="mb-4 flex justify-center">
            <div className="flex items-center justify-between gap-6 w-full max-w-2xl">
              {/* Title */}
              <div className="text-left">
                <h1 className={`text-4xl sm:text-5xl font-bold ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                  My Tasks
                </h1>
              </div>

              {/* Dark Mode Toggle */}
              <button
                onClick={handleToggleDarkMode}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${darkMode
                  ? 'bg-yellow-400 text-gray-900 hover:bg-yellow-300'
                  : 'bg-gray-800 text-white hover:bg-gray-700'
                  }`}
              >
                {darkMode ? '☀️ Light' : '🌙 Dark'}
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="mb-8 flex justify-center">
            <div className="w-full max-w-2xl text-center">
              <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {stats.total} total • {stats.completed} completed • {stats.pending} pending
              </p>
            </div>
          </div>

          {/* Add Todo Form */}
          <div className="mb-8 flex justify-center">
            <div className="w-full max-w-2xl">
              <TodoForm onAdd={handleAddTodo} darkMode={darkMode} />
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="mb-6 flex justify-center">
            <FilterTabs activeFilter={filter} onFilterChange={setFilter} darkMode={darkMode} />
          </div>

          {/* Todo List */}
          <div className="flex justify-center">
            <div className="w-full max-w-2xl">
              {filteredTodos.length === 0 ? (
                <div className="text-center py-12">
                  <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {filter === 'all' && todos.length === 0
                      ? '✨ No tasks yet. Add one to get started!'
                      : filter === 'completed'
                        ? '📋 No completed tasks'
                        : '🎉 All caught up! No pending tasks'}
                  </p>
                </div>
              ) : (
                <TodoList
                  todos={filteredTodos}
                  editingId={editingId}
                  onToggle={handleToggleTodo}
                  onDelete={handleDeleteTodo}
                  onEdit={setEditingId}
                  onUpdate={handleUpdateTodo}
                  onReorder={handleReorderTodos}
                  darkMode={darkMode}
                  draggedId={draggedId}
                  onDragStart={setDraggedId}
                  onDragEnd={() => setDraggedId(null)}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
