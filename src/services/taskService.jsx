import { makeRequest } from "../utils/request";
/**
 * lista todas las tareas desde la API
 * @returns {Promise} - Una promesa que se resuelve con la lista de tareas
 */
export const getTasks = async () => {
    const response = await makeRequest("TASKS", null, "GET");
    return response;
};
/** crea una nueva tarea en la API
 * @param {object} taskData - Los datos de la tarea a crear
 * @returns {Promise} - Una promesa que se resuelve con la tarea creada
 */
export const createTask = async (taskData) => {
    const response = await makeRequest("TASKS", null, "POST", taskData);
    return response;
}
/**
 * actualiza una tarea existente en la API
 * @param {int} taskId 
 * @param {object} taskData 
 * @returns {Promise}
 */
export const updateTask = async (taskId, taskData) => {
    const response = await makeRequest("TASKS", taskId, "PUT", taskData);
    return response;
}
/** elimina una tarea existente en la API
 * @param {int} taskId 
 * @returns {Promise}
*/
export const deleteTask = async (taskId) => {
    const response = await makeRequest("TASKS", taskId, "DELETE");
    return response;
}