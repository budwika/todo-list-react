import { useState } from 'react'

interface TodoFormProps {
    onAdd: (title: string, description: string, dueDate: string) => void
    darkMode: boolean
}

export default function TodoForm({ onAdd, darkMode }: TodoFormProps) {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [dueDate, setDueDate] = useState('')
    const [isExpanded, setIsExpanded] = useState(false)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (title.trim()) {
            onAdd(title, description, dueDate)
            setTitle('')
            setDescription('')
            setDueDate('')
            setIsExpanded(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="w-full">
            <div className={`rounded-lg shadow-md hover:shadow-lg transition-shadow ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                {/* Main Input */}
                <div
                    className={`p-4 flex items-center gap-3 cursor-text animate-slideIn ${isExpanded ? `border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}` : ''
                        }`}
                    onClick={() => !isExpanded && setIsExpanded(true)}
                >
                    <div className="flex-shrink-0">
                        <div className="w-6 h-6 rounded-full bg-blue-400 flex items-center justify-center">
                            <span className="text-white text-sm font-bold">+</span>
                        </div>
                    </div>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        onFocus={() => setIsExpanded(true)}
                        placeholder="Add a new task..."
                        className={`flex-1 outline-none text-lg ${darkMode ? 'bg-gray-800 text-white placeholder-gray-500' : 'bg-white text-gray-800 placeholder-gray-400'}`}
                    />
                </div>

                {/* Expanded Form */}
                {isExpanded && (
                    <div className="p-4 space-y-4">
                        {/* Description */}
                        <div>
                            <label htmlFor="description" className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                Description (optional)
                            </label>
                            <textarea
                                id="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Add more details about your task..."
                                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none ${darkMode
                                    ? 'bg-gray-700 text-white placeholder-gray-500 border-gray-600'
                                    : 'bg-white text-gray-800 placeholder-gray-400 border-gray-300'
                                    }`}
                                rows={3}
                            />
                        </div>

                        {/* Due Date */}
                        <div>
                            <label htmlFor="dueDate" className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                Due Date (optional)
                            </label>
                            <input
                                type="date"
                                id="dueDate"
                                value={dueDate}
                                onChange={(e) => setDueDate(e.target.value)}
                                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${darkMode
                                        ? 'bg-gray-700 text-white border-gray-600'
                                        : 'bg-white text-gray-800 border-gray-300'
                                    }`}
                            />
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-2 justify-end">
                            <button
                                type="button"
                                onClick={() => {
                                    setIsExpanded(false)
                                    setTitle('')
                                    setDescription('')
                                    setDueDate('')
                                }}
                                className={`px-4 py-2 rounded-md transition-colors font-medium ${darkMode
                                        ? 'text-gray-300 hover:bg-gray-700'
                                        : 'text-gray-700 hover:bg-gray-100'
                                    }`}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={!title.trim()}
                                className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium shadow-md hover:shadow-lg">
                                Add Task
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </form>
    )
}
