import { useTaskManager } from '../hooks/useTaskManager';
import Sidebar from './Sidebar';
import TaskCard from './TaskCard';
import TaskModal from './TaskModal';
import Loader from './Loader';
import AlerError from './AlerError';
const TaskManager = () => {

    const {
        isModalOpen,
        error,
        editingTask,
        loading,
        activeFilter,
        setActiveFilter,
        filteredTasks,
        taskCounts,
        handleEditTask,
        handleDeleteTask,
        handleOpenModal,
        handleCloseModal,
        handleSaveTask,
        getFilterTitle,
        clearError,
    } = useTaskManager();

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Header */}
            <div className="bg-white border-b border-gray-200 px-6 py-4">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gray-600 rounded flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                    </div>
                    <h1 className="text-xl font-semibold text-gray-800">TASK MANAGER</h1>
                </div>
            </div>

            <div className="flex h-screen">
                {/* Sidebar */}
                <Sidebar
                    activeFilter={activeFilter}
                    onFilterChange={setActiveFilter}
                    taskCounts={taskCounts}
                />

                {/* Main Content */}
                <div className="flex-1 p-6">
                    {/* Error Alert */}
                    {error && <AlerError message={error} onClose={clearError} />}

                    {/* Content Header */}
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-semibold text-gray-800">{getFilterTitle()}</h2>
                        <button
                            onClick={handleOpenModal}
                            className="bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded-md font-medium transition-colors flex items-center gap-2"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            AÑADIR NUEVA TAREA
                        </button>
                    </div>

                    {/* Loading State */}
                    {loading && <Loader />}

                    {/* Tasks Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[calc(100vh-250px)] overflow-y-auto pr-2">

                        {Array.isArray(filteredTasks) && filteredTasks.map((task, index) => (
                            <TaskCard
                                key={task.id || `task-${index}`}
                                task={task}
                                onEdit={handleEditTask}
                                onDelete={handleDeleteTask}
                            />
                        ))}
                    </div>

                    {/* Empty State */}
                    {(!Array.isArray(filteredTasks) || filteredTasks.length === 0) && (
                        <div className="text-center py-12">
                            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-medium text-gray-500 mb-2">No tasks found</h3>
                            <p className="text-gray-400">Start by creating your first task!</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Footer */}
            <div className="bg-white border-t border-gray-200 px-6 py-3">
                <p className="text-center text-sm text-gray-500">© {new Date().getFullYear()} My Task App</p>
            </div>

            {/* Task Modal */}
            <TaskModal
                isOpen={isModalOpen}
                editingTask={editingTask}
                onClose={handleCloseModal}
                onSave={handleSaveTask}
            />
        </div>
    );
};

export default TaskManager;
