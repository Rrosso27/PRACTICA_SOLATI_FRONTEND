import { useTaskModal } from '../hooks/useTaskModal';

const TaskModal = ({ isOpen, editingTask, onClose, onSave }) => {
    const { formData, handleInputChange, handleSubmit, handleClose } = useTaskModal(editingTask, onClose, onSave);
    if (!isOpen) return null;

    return (
        <>
            {/* Overlay */}
            <div className="fixed inset-0 bg-black opacity-20  z-50" onClick={handleClose}></div>

            {/* Modal Container */}
            <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
                <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 pointer-events-auto">
                    {/* Modal Header */}
                    <div className="flex items-center justify-between p-6 border-b border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-900">
                            {editingTask ? 'Editar Tarea' : 'Nueva Tarea'}
                        </h3>
                        <button
                            onClick={handleClose}
                            className="text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Modal Body */}
                    <form onSubmit={handleSubmit} className="p-6">
                        <div className="space-y-4">
                            {/* Hidden ID field for editing */}
                            <input type="hidden" id='idTask' name='idTask' value={formData.idTask} onChange={handleInputChange} />

                            {/* Title Field */}
                            <div>
                                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                                    Título  *
                                </label>
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                                    placeholder="e.g., Completar documentación 2"
                                    required
                                />
                            </div>

                            {/* Description Field */}
                            <div>
                                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                                    Descripción *
                                </label>
                                <textarea
                                    id="description"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    rows={3}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 resize-none"
                                    placeholder="e.g., Escribir README completo del proyecto"
                                    required
                                />
                            </div>

                            {/* Status Field */}
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="status"
                                    name="status"
                                    checked={formData.status}
                                    onChange={handleInputChange}
                                    className="h-4 w-4 text-cyan-600 focus:ring-cyan-500 border-gray-300 rounded"
                                />
                                <label htmlFor="status" className="ml-2 block text-sm text-gray-700">
                                    Marcar como completado
                                </label>
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="flex gap-3 mt-6 pt-4 border-t border-gray-200">
                            <button
                                type="button"
                                onClick={handleClose}
                                className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 transition-colors"
                            >
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                className="flex-1 px-4 py-2 text-sm font-medium text-white bg-cyan-600 border border-transparent rounded-md hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 transition-colors"
                            >
                                {editingTask ? 'Actualizar Tarea' : 'Crear Tarea'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>

    );
};

export default TaskModal;
