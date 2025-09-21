import { useState, useEffect } from 'react';

export function useTaskModal(editingTask, onClose, onSave) {

    const [formData, setFormData] = useState({
        idTask: '',
        title: '',
        description: '',
        status: false
    });

    useEffect(() => {
        if (editingTask) {
            setFormData({
                idTask: editingTask.id,
                title: editingTask.title,
                description: editingTask.description,
                status: editingTask.status === "1"
            });
        } else {
            setFormData({
                idTask: '',
                title: '',
                description: '',
                status: false
            });
        }
    }, [editingTask]);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.title.trim() && formData.description.trim()) {
            // onSave will convert: status false -> "0" (Pending), status true -> "1" (Completed)
            onSave(formData);
            setFormData({ idTask: '', title: '', description: '', status: false });
            onClose();
        }
    };

    const handleClose = () => {
        setFormData({ idTask: '', title: '', description: '', status: false });
        onClose();
    };

    return { formData, handleInputChange, handleSubmit, handleClose }


}
