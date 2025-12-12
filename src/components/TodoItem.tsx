import { useState } from 'react'

interface Todo {
    id: string
    title: string
    description?: string
    dueDate?: string
    completed: boolean
    createdAt: number
}

interface TodoItemProps {
    todo: Todo
    isEditing: boolean
    onToggle: () => void
    onDelete: () => void
    onEdit: () => void
    onUpdate: (title: string, description: string, dueDate: string) => void
    onCancelEdit: () => void
    darkMode: boolean
}

export default function TodoItem({
    todo,
    isEditing,
    onToggle,
    onDelete,
    onEdit,
    onUpdate,
    onCancelEdit,
    darkMode,
}: TodoItemProps) {
    const [isDeleting, setIsDeleting] = useState(false)
    const [editTitle, setEditTitle] = useState(todo.title)
    const [editDescription, setEditDescription] = useState(todo.description || '')
    const [editDueDate, setEditDueDate] = useState(todo.dueDate || '')

    const handleSave = () => {
        if (editTitle.trim()) {
            onUpdate(editTitle, editDescription, editDueDate)
        }
    }

    const handleCancel = () => {
        setEditTitle(todo.title)
        setEditDescription(todo.description || '')
        setEditDueDate(todo.dueDate || '')
        onCancelEdit()
    }

    const formatDate = (dateString?: string) => {
        if (!dateString) return null
        const date = new Date(dateString)
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
        })
    }

    const isOverdue =
        todo.dueDate &&
        !todo.completed &&
        new Date(todo.dueDate) < new Date(new Date().setHours(0, 0, 0, 0))

    if (isEditing) {
        return (
            <div
                className={`p-4 rounded-lg border-2 shadow-md animate-fadeIn ${todo.completed
                    ? `${darkMode ? 'bg-green-900 border-green-500' : 'bg-green-50 border-green-300'}`
                    : `${darkMode ? 'bg-blue-900 border-blue-500' : 'bg-blue-50 border-blue-300'}`
                    }`}
            >
                <div className="space-y-3">
                    <input
                        type="text"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium text-lg ${darkMode ? 'bg-gray-800 text-white border-gray-600' : ''
                            }`}
                        placeholder="Task title"
                        autoFocus
                    />

                    <textarea
                        value={editDescription}
                        onChange={(e) => setEditDescription(e.target.value)}
                        placeholder="Description (optional)"
                        className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none ${darkMode ? 'bg-gray-800 text-white border-gray-600' : ''
                            }`}
                        rows={2}
                    />

                    <input
                        type="date"
                        value={editDueDate}
                        onChange={(e) => setEditDueDate(e.target.value)}
                        className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${darkMode ? 'bg-gray-800 text-white border-gray-600' : ''
                            }`}
                    />

                    <div className="flex gap-2 justify-end">
                        <button
                            onClick={handleCancel}
                            className={`px-4 py-2 rounded-md transition-colors font-medium ${darkMode
                                ? 'text-gray-300 hover:bg-gray-700'
                                : 'text-gray-700 hover:bg-gray-200'
                                }`}
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSave}
                            disabled={!editTitle.trim()}
                            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 disabled:opacity-50 transition-colors font-medium"
                        >
                            Save
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    const handleDeleteClick = () => {
        setIsDeleting(true)
        setTimeout(() => onDelete(), 300)
    }

    return (
        <div
            className={`p-4 rounded-lg shadow-md hover:shadow-lg transition-all flex gap-4 items-start group ${isDeleting ? 'animate-slideOut' : 'animate-slideIn'
                } ${todo.completed
                    ? `${darkMode ? 'bg-green-900 border border-green-600' : 'bg-green-50 border border-green-200'}`
                    : isOverdue
                        ? `${darkMode ? 'bg-red-900 border border-red-600' : 'bg-red-50 border border-red-200'}`
                        : `${darkMode ? 'bg-yellow-900 border border-yellow-600 hover:border-yellow-500' : 'bg-yellow-50 border border-yellow-300 hover:border-yellow-400'}`
                }`}
        >
            {/* Checkbox */}
            <button
                onClick={onToggle}
                className={`flex-shrink-0 w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all mt-1 ${todo.completed
                    ? 'bg-green-500 border-green-500'
                    : `border-gray-400 hover:border-green-500 ${darkMode ? 'border-gray-500' : ''}`
                    }`}
                aria-label={todo.completed ? 'Mark as incomplete' : 'Mark as complete'}
            >
                {todo.completed && <span className="text-white text-sm">✓</span>}
            </button>

            {/* Content */}
            <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-baseline gap-2">
                    <h3
                        className={`text-lg font-medium ${todo.completed
                            ? `${darkMode ? 'text-gray-400 line-through' : 'text-gray-500 line-through'}`
                            : `${darkMode ? 'text-white' : 'text-gray-800'}`
                            }`}
                    >
                        {todo.title}
                    </h3>
                    {isOverdue && (
                        <span className="px-2 py-1 bg-red-500 text-white text-xs font-bold rounded">
                            Overdue
                        </span>
                    )}
                </div>

                {todo.description && (
                    <p className={`text-sm mt-1 ${todo.completed
                        ? `${darkMode ? 'text-gray-500' : 'text-gray-400'}`
                        : `${darkMode ? 'text-gray-300' : 'text-gray-600'}`
                        }`}>
                        {todo.description}
                    </p>
                )}

                {todo.dueDate && (
                    <div className="mt-2 flex items-center gap-2">
                        <span className="text-lg lg:text-xl">📅</span>
                        <span
                            className={`text-base lg:text-lg font-semibold ${isOverdue
                                    ? 'text-red-600'
                                    : todo.completed
                                        ? `${darkMode ? 'text-gray-500' : 'text-gray-400'}`
                                        : `${darkMode ? 'text-gray-200' : 'text-gray-600'}`
                                }`}
                        >
                            {formatDate(todo.dueDate)}
                        </span>
                    </div>
                )}
            </div>

            {/* Actions */}
            <div className="flex-shrink-0 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                    onClick={onEdit}
                    className={`p-2 rounded-md transition-colors ${darkMode
                        ? 'hover:bg-blue-900 text-blue-400 hover:text-blue-300'
                        : 'hover:bg-blue-100 text-blue-600 hover:text-blue-700'
                        }`}
                    aria-label="Edit task"
                    title="Edit task"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                    </svg>
                </button>
                <button
                    onClick={handleDeleteClick}
                    className={`p-2 rounded-md transition-colors ${darkMode
                        ? 'hover:bg-red-900 text-red-400 hover:text-red-300'
                        : 'hover:bg-red-100 text-red-600 hover:text-red-700'
                        }`}
                    aria-label="Delete task"
                    title="Delete task"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                    </svg>
                </button>
            </div>
        </div>
    )
}
