export interface Todo {
  id: string;
  title: string;
  description?: string;
  dueDate?: string;
  completed: boolean;
  createdAt: number;
}

type FilterType = "all" | "completed" | "pending";

const STORAGE_KEY = "todos";
const DARK_MODE_KEY = "darkMode";


export const loadTodosFromStorage = (): Todo[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (e) {
    console.error("Failed to load todos from storage:", e);
    return [];
  }
};

export const saveTodosToStorage = (todos: Todo[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  } catch (e) {
    console.error("Failed to save todos to storage:", e);
  }
};

export const loadDarkModeFromStorage = (): boolean => {
  try {
    const stored = localStorage.getItem(DARK_MODE_KEY);
    return stored ? JSON.parse(stored) : false;
  } catch (e) {
    console.error("Failed to load dark mode from storage:", e);
    return false;
  }
};

export const saveDarkModeToStorage = (darkMode: boolean): void => {
  try {
    localStorage.setItem(DARK_MODE_KEY, JSON.stringify(darkMode));
  } catch (e) {
    console.error("Failed to save dark mode to storage:", e);
  }
};

export const addTodo = (
  todos: Todo[],
  title: string,
  description: string,
  dueDate: string
): Todo[] => {
  const newTodo: Todo = {
    id: Date.now().toString(),
    title,
    description: description || undefined,
    dueDate: dueDate || undefined,
    completed: false,
    createdAt: Date.now(),
  };
  return [newTodo, ...todos];
};

export const deleteTodo = (todos: Todo[], id: string): Todo[] => {
  return todos.filter((todo) => todo.id !== id);
};

export const toggleTodo = (todos: Todo[], id: string): Todo[] => {
  return todos.map((todo) =>
    todo.id === id ? { ...todo, completed: !todo.completed } : todo
  );
};

export const updateTodo = (
  todos: Todo[],
  id: string,
  title: string,
  description: string,
  dueDate: string
): Todo[] => {
  return todos.map((todo) =>
    todo.id === id
      ? {
          ...todo,
          title,
          description: description || undefined,
          dueDate: dueDate || undefined,
        }
      : todo
  );
};

export const reorderTodos = (
  todos: Todo[],
  fromIndex: number,
  toIndex: number
): Todo[] => {
  const newTodos = [...todos];
  const [movedTodo] = newTodos.splice(fromIndex, 1);
  newTodos.splice(toIndex, 0, movedTodo);
  return newTodos;
};

export const filterTodos = (todos: Todo[], filter: FilterType): Todo[] => {
  if (filter === "completed") return todos.filter((todo) => todo.completed);
  if (filter === "pending") return todos.filter((todo) => !todo.completed);
  return todos;
};

export const getTodoStats = (
  todos: Todo[]
): { total: number; completed: number; pending: number } => {
  const completed = todos.filter((t) => t.completed).length;
  return {
    total: todos.length,
    completed,
    pending: todos.length - completed,
  };
};
