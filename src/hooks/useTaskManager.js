import { useState, useEffect, useCallback } from 'react';

import { getTasks, deleteTask, createTask, updateTask } from '../services/taskService';

export function useTaskManager() {
    const [activeFilter, setActiveFilter] = useState('all');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTask, setEditingTask] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [tasks, setTasks] = useState([]);

    const fetchTasks = useCallback(async () => {
        try {
            setLoading(true);
            const data = await getTasks();

            if (data && Array.isArray(data.data)) {
                setTasks(data.data);
            } else if (Array.isArray(data)) {
                setTasks(data);
            } else {
                console.warn('API response format unexpected:', data);
                setTasks([]);
            }

        } catch (error) {
            console.error('Error fetching tasks:', error);
            setTasks([]);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchTasks();
    }, [fetchTasks]);


    const safeTasksArray = Array.isArray(tasks) ? tasks : [];

    const filteredTasks = safeTasksArray.filter(task => {
        if (activeFilter === 'all') return true;
        if (activeFilter === 'pending') return task.status === "0";
        if (activeFilter === 'completed') return task.status === "1";
        return true;
    });

    const taskCounts = {
        all: safeTasksArray.length,
        pending: safeTasksArray.filter(task => task.status === "0").length,
        completed: safeTasksArray.filter(task => task.status === "1").length
    };

    const handleEditTask = (task) => {
        setEditingTask(task);
        setIsModalOpen(true);
    };

    const handleDeleteTask = (taskId) => {
        setLoading(true);

        deleteTask(taskId).then(() => {
            setTasks(prevTasks => {
                const safeTasks = Array.isArray(prevTasks) ? prevTasks : [];
                return safeTasks.filter(task => task.id !== taskId);
            });
            setError(null);
        }).catch((error) => {
            console.error('Error deleting task:', error);

            const errorMessage = error.response?.data?.message ||
                error.message ||
                'Error al eliminar la tarea';

            setError(errorMessage);

            setTimeout(() => {
                setError(null);
            }, 5000);
        }).finally(() => {
            setLoading(false);
        });

    };

    const handleOpenModal = () => {
        setEditingTask(null);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingTask(null);
    };

    const handleSaveTask = (taskData) => {
        setLoading(true);
        const currentDate = new Date().toISOString();

        if (editingTask) {
            const updatedTask = {
                ...editingTask,
                title: taskData.title,
                description: taskData.description,
                status: taskData.status ? "1" : "0",
                updated_at: currentDate
            };
            setUpdateTasks(updatedTask);
        } else {
            const newTask = {
                title: taskData.title,
                description: taskData.description,
                status: taskData.status ? "1" : "0",
                created_at: currentDate,
                updated_at: currentDate
            };
            setNewtasks(newTask);
        }

    };

    const setUpdateTasks = (updatedTasks) => {

        updateTask(updatedTasks.id, updatedTasks).then((response) => {
            if (response.success !== false) {
                setTasks(prevTasks => {
                    const safeTasks = Array.isArray(prevTasks) ? prevTasks : [];
                    return safeTasks.map(task =>
                        task.id === editingTask.id ? updatedTasks : task
                    );
                });
                setError(null);
                handleCloseModal();
            } else {
                throw response;
            }
        }).catch((error) => {
            console.error('Error updating task:', error);

            let errorMessage = 'Error al actualizar la tarea';

            if (error.errors) {
                const errors = error.errors;
                if (errors.title && Array.isArray(errors.title)) {
                    errorMessage = `Título: ${errors.title[0]}`;
                } else if (errors.description && Array.isArray(errors.description)) {
                    errorMessage = `Descripción: ${errors.description[0]}`;
                } else if (errors.status && Array.isArray(errors.status)) {
                    errorMessage = `Estado: ${errors.status[0]}`;
                } else {
                    errorMessage = error.message || 'Error de validación';
                }
            }
            setError(errorMessage);

            setTimeout(() => {
                setError(null);
            }, 5000);
        }).finally(() => {
            setLoading(false);
        });

    }

    const setNewtasks = (newTasks) => {
        createTask(newTasks).then((response) => {
            if (response.success !== false) {
                setTasks(prevTasks => {
                    const safeTasks = Array.isArray(prevTasks) ? prevTasks : [];
                    return [...safeTasks, response.data || response];
                });
                setError(null);
                handleCloseModal();
            } else {
                throw response;
            }
        }).catch((error) => {
            console.error('Error creating task:', error);

            let errorMessage = 'Error al crear la tarea';

            if (error.errors) {
                const errors = error.errors;
                if (errors.title && Array.isArray(errors.title)) {
                    errorMessage = `Título: ${errors.title[0]}`;
                } else if (errors.description && Array.isArray(errors.description)) {
                    errorMessage = `Descripción: ${errors.description[0]}`;
                } else if (errors.status && Array.isArray(errors.status)) {
                    errorMessage = `Estado: ${errors.status[0]}`;
                } else {
                    errorMessage = error.message || 'Error de validación';
                }
            }

            setError(errorMessage);

            setTimeout(() => {
                setError(null);
            }, 5000);
        }).finally(() => {
            setLoading(false);
        });

    }


    const getFilterTitle = () => {
        switch (activeFilter) {
            case 'pending':
                return 'Tareas pendientes';
            case 'completed':
                return 'Tareas completadas';
            default:
                return 'Todas las tareas';
        }
    };

    const clearError = () => {
        setError(null);
    };


    return {
        tasks,
        error,
        isModalOpen,
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
    }
}