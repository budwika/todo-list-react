interface FilterTabsProps {
    activeFilter: 'all' | 'completed' | 'pending'
    onFilterChange: (filter: 'all' | 'completed' | 'pending') => void
    darkMode: boolean
}

export default function FilterTabs({ activeFilter, onFilterChange, darkMode }: FilterTabsProps) {
    const filters = [
        { id: 'all', label: 'All', icon: '📋' },
        { id: 'pending', label: 'Pending', icon: '⏳' },
        { id: 'completed', label: 'Completed', icon: '✅' },
    ] as const

    return (
        <div className="flex gap-2 flex-wrap justify-center">
            {filters.map(({ id, label, icon }) => (
                <button
                    key={id}
                    onClick={() => onFilterChange(id as 'all' | 'completed' | 'pending')}
                    className={`px-4 py-2 rounded-full font-medium transition-all flex items-center gap-2 whitespace-nowrap ${activeFilter === id
                            ? 'bg-blue-500 text-white shadow-md'
                            : `${darkMode ? 'bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-600' : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'}`
                        }`}
                >
                    <span>{icon}</span>
                    {label}
                </button>
            ))}
        </div>
    )
}
