import TodoItem from '././TodoItem'
import { useState } from 'react'

interface Todo {
    id: string
    title: string
    description?: string
    dueDate?: string
    completed: boolean
    createdAt: number
}

interface TodoListProps {
    todos: Todo[]
    editingId: string | null
    onToggle: (id: string) => void
    onDelete: (id: string) => void
    onEdit: (id: string | null) => void
    onUpdate: (id: string, title: string, description: string, dueDate: string) => void
    onReorder: (fromIndex: number, toIndex: number) => void
    darkMode: boolean
    draggedId: string | null
    onDragStart: (id: string) => void
    onDragEnd: () => void
}

export default function TodoList({
    todos,
    editingId,
    onToggle,
    onDelete,
    onEdit,
    onUpdate,
    onReorder,
    darkMode,
    draggedId,
    onDragStart,
    onDragEnd,
}: TodoListProps) {
    const [dragOverIndex, setDragOverIndex] = useState<number | null>(null)

    const handleDragOver = (e: React.DragEvent, index: number) => {
        e.preventDefault()
        setDragOverIndex(index)
    }

    const handleDrop = (e: React.DragEvent, toIndex: number) => {
        e.preventDefault()
        const fromIndex = todos.findIndex((t) => t.id === draggedId)
        if (fromIndex !== toIndex && fromIndex !== -1) {
            onReorder(fromIndex, toIndex)
        }
        setDragOverIndex(null)
    }

    return (
        <div className={`space-y-3 ${darkMode ? 'text-white' : ''}`}>
            {todos.map((todo, index) => (
                <div
                    key={todo.id}
                    draggable
                    onDragStart={() => onDragStart(todo.id)}
                    onDragEnd={onDragEnd}
                    onDragOver={(e) => handleDragOver(e, index)}
                    onDrop={(e) => handleDrop(e, index)}
                    className={`transition-all ${draggedId === todo.id ? 'opacity-50' : ''} ${dragOverIndex === index ? 'border-t-2 border-blue-500 pt-2' : ''
                        }`}
                >
                    <TodoItem
                        todo={todo}
                        isEditing={editingId === todo.id}
                        onToggle={() => onToggle(todo.id)}
                        onDelete={() => onDelete(todo.id)}
                        onEdit={() => onEdit(todo.id)}
                        onUpdate={(title, description, dueDate) =>
                            onUpdate(todo.id, title, description, dueDate)
                        }
                        onCancelEdit={() => onEdit(null)}
                        darkMode={darkMode}
                    />
                </div>
            ))}
        </div>
    )
}
