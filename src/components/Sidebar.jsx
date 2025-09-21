
const Sidebar = ({ activeFilter, onFilterChange, taskCounts }) => {
  const menuItems = [
    {
      id: 'all',
      label: 'Todas las tareas',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      ),
      count: taskCounts.all
    },
    {
      id: 'pending',
      label: 'Tareas pendientes', 
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      count: taskCounts.pending 
    },
    {
      id: 'completed',
      label: 'Terminadas', 
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      count: taskCounts.completed 
    }
  ];

  return (
    <div className="w-64 bg-gray-50 border-r border-gray-200 p-4">


      {/* Menu Items */}
      <nav className="space-y-1">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onFilterChange(item.id)}
            className={`w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-md transition-colors ${
              activeFilter === item.id
                ? 'bg-cyan-500 text-white'
                : 'text-gray-700 hover:bg-gray-200'
            }`}
          >
            <div className="flex items-center gap-2">
              {item.icon}
              <span>{item.label}</span>
            </div>
            {item.count > 0 && (
              <span className={`px-2 py-1 text-xs rounded-full ${
                activeFilter === item.id
                  ? 'bg-cyan-600 text-white'
                  : 'bg-gray-300 text-gray-700'
              }`}>
                {item.count}
              </span>
            )}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
