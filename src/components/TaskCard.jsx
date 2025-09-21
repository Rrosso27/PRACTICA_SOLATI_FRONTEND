import React from 'react';

const TaskCard = ({ task, onEdit, onDelete }) => {
    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };
    const getStatusColor = (status) => {
        switch (status) {
            case "0":
                return 'border-l-cyan-400 bg-white';
            case "1":
                return 'border-l-green-400 bg-white';
            default:
                return 'border-l-gray-400 bg-white';
        }
    };

    const getStatusBadge = (status) => {
        if (status === "1") {
            return (
                <div className="flex items-center gap-2 mb-3">
                    <div className="w-4 h-4 bg-green-400 rounded-sm flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                        </svg>
                    </div>
                    <span className="text-green-600 font-medium text-sm">Terminada</span>
                </div>
            );
        }
        return (
            <div className="mb-3">
                <span className="text-gray-500 text-sm">Estado: Pendiente</span>
            </div>
        );
    };

    return (
        <div className={`${getStatusColor(task.status)} border-l-4 rounded-lg shadow-sm p-4 transition-shadow hover:shadow-md`}>
            <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-gray-800 text-sm">{task.title}</h3>
            </div>

            <p className="text-gray-600 text-sm mb-3 leading-relaxed">{task.description}</p>

            {getStatusBadge(task.status)}

            {/* Date Information */}
            <div className="text-xs text-gray-400 mb-3 space-y-1">
                {task.created_at && (
                    <div>Created: {formatDate(task.created_at)}</div>
                )}
                {task.updated_at && task.updated_at !== task.created_at && (
                    <div>Updated: {formatDate(task.updated_at)}</div>
                )}
            </div>

            <div className="flex gap-3">
                <button
                    onClick={() => onEdit(task)}
                    className="text-gray-600 hover:text-gray-800 font-medium text-sm transition-colors"
                >
                    Edit
                </button>
                <button
                    onClick={() => onDelete(task.id)}
                    className="text-gray-600 hover:text-red-600 font-medium text-sm transition-colors"
                >
                    Delete
                </button>
            </div>
        </div>
    );
};

export default TaskCard;
