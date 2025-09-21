# API Documentation - Task Manager Frontend

## 📋 Índice

1. [Introducción](#introducción)
2. [Base URL y Autenticación](#base-url-y-autenticación)
3. [Endpoints](#endpoints)
4. [Modelos de Datos](#modelos-de-datos)
5. [Códigos de Respuesta](#códigos-de-respuesta)
6. [Ejemplos de Uso](#ejemplos-de-uso)
7. [Manejo de Errores](#manejo-de-errores)

## 📖 Introducción

Esta documentación describe la API REST utilizada por el Task Manager Frontend. La API proporciona operaciones CRUD completas para la gestión de tareas.

### Características de la API

- **REST**: Sigue principios REST para operaciones HTTP
- **JSON**: Todas las requests y responses en formato JSON
- **Autenticación**: Bearer token authentication (preparado para futuro)
- **CORS**: Configurado para permitir requests desde el frontend

## 🔐 Base URL y Autenticación

### Base URL

```
Development: http://localhost:8000/api
Production: https://tu-api-produccion.com/api
```

### Autenticación

La aplicación está preparada para autenticación con Bearer token:

```javascript
// Headers automáticos en todas las requests
{
  "Content-Type": "application/json",
  "Authorization": "Bearer <token>"
}
```

**Nota**: Actualmente la autenticación no está implementada, pero el frontend está preparado para cuando se agregue.

## 🛠️ Endpoints

### 📋 Tasks

#### GET /tasks
Obtiene todas las tareas del sistema.

**Request**
```http
GET /api/tasks
Content-Type: application/json
Authorization: Bearer <token>
```

**Response Success (200)**
```json
{
  "data": [
    {
      "id": 1,
      "title": "Completar documentación",
      "description": "Escribir la documentación del proyecto",
      "status": "0",
      "created_at": "2025-09-21T10:00:00Z",
      "updated_at": "2025-09-21T10:00:00Z"
    }
  ]
}
```

#### POST /tasks
Crea una nueva tarea.

**Request**
```http
POST /api/tasks
Content-Type: application/json
Authorization: Bearer <token>

{
  "title": "Nueva tarea",
  "description": "Descripción de la tarea",
  "status": "0"
}
```

**Response Success (201)**
```json
{
  "data": {
    "id": 2,
    "title": "Nueva tarea",
    "description": "Descripción de la tarea",
    "status": "0",
    "created_at": "2025-09-21T11:00:00Z",
    "updated_at": "2025-09-21T11:00:00Z"
  }
}
```

#### PUT /tasks/{id}
Actualiza una tarea existente.

**Request**
```http
PUT /api/tasks/1
Content-Type: application/json
Authorization: Bearer <token>

{
  "title": "Tarea actualizada",
  "description": "Descripción actualizada",
  "status": "1"
}
```

**Response Success (200)**
```json
{
  "data": {
    "id": 1,
    "title": "Tarea actualizada",
    "description": "Descripción actualizada",
    "status": "1",
    "created_at": "2025-09-21T10:00:00Z",
    "updated_at": "2025-09-21T11:30:00Z"
  }
}
```

#### DELETE /tasks/{id}
Elimina una tarea específica.

**Request**
```http
DELETE /api/tasks/1
Authorization: Bearer <token>
```

**Response Success (200)**
```json
{
  "message": "Task deleted successfully"
}
```

## 📊 Modelos de Datos

### Task Model

```javascript
{
  id: number,              // ID único de la tarea
  title: string,           // Título de la tarea (requerido, max 255 chars)
  description: string,     // Descripción detallada (opcional)
  status: "0" | "1",      // Estado: "0" = Pendiente, "1" = Completada
  created_at: string,      // Timestamp ISO 8601 de creación
  updated_at: string       // Timestamp ISO 8601 de última actualización
}
```

### Task Status Values

```javascript
const TASK_STATUS = {
  PENDING: "0",     // Tarea pendiente
  COMPLETED: "1"    // Tarea completada
}
```

### Validation Rules

#### POST /tasks
```javascript
{
  title: {
    type: "string",
    required: true,
    minLength: 1,
    maxLength: 255
  },
  description: {
    type: "string",
    required: false,
    maxLength: 1000
  },
  status: {
    type: "string",
    required: false,
    default: "0",
    enum: ["0", "1"]
  }
}
```

#### PUT /tasks/{id}
```javascript
{
  title: {
    type: "string",
    required: false,
    minLength: 1,
    maxLength: 255
  },
  description: {
    type: "string",
    required: false,
    maxLength: 1000
  },
  status: {
    type: "string",
    required: false,
    enum: ["0", "1"]
  }
}
```

## 📋 Códigos de Respuesta

### Success Codes

| Código | Descripción | Uso |
|--------|-------------|-----|
| 200 | OK | GET, PUT, DELETE exitosos |
| 201 | Created | POST exitoso |
| 204 | No Content | DELETE exitoso (alternativo) |

### Error Codes

| Código | Descripción | Posibles Causas |
|--------|-------------|-----------------|
| 400 | Bad Request | Datos de entrada inválidos |
| 401 | Unauthorized | Token inválido o faltante |
| 403 | Forbidden | Sin permisos para la operación |
| 404 | Not Found | Recurso no encontrado |
| 422 | Unprocessable Entity | Errores de validación |
| 500 | Internal Server Error | Error del servidor |

### Error Response Format

```json
{
  "error": {
    "code": 400,
    "message": "Validation failed",
    "details": {
      "title": ["The title field is required"],
      "status": ["The status must be 0 or 1"]
    }
  }
}
```

## 💡 Ejemplos de Uso

### 1. Flujo Completo de Tarea

```javascript
// 1. Crear una tarea
const createTask = async () => {
  const response = await fetch('/api/tasks', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer <token>'
    },
    body: JSON.stringify({
      title: 'Revisar código',
      description: 'Hacer code review del PR #123',
      status: '0'
    })
  })
  
  const task = await response.json()
  console.log('Tarea creada:', task.data)
}

// 2. Listar tareas
const getTasks = async () => {
  const response = await fetch('/api/tasks', {
    headers: {
      'Authorization': 'Bearer <token>'
    }
  })
  
  const data = await response.json()
  console.log('Tareas:', data.data)
}

// 3. Marcar como completada
const completeTask = async (taskId) => {
  const response = await fetch(`/api/tasks/${taskId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer <token>'
    },
    body: JSON.stringify({
      status: '1'
    })
  })
  
  const updatedTask = await response.json()
  console.log('Tarea completada:', updatedTask.data)
}

// 4. Eliminar tarea
const deleteTask = async (taskId) => {
  const response = await fetch(`/api/tasks/${taskId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': 'Bearer <token>'
    }
  })
  
  if (response.ok) {
    console.log('Tarea eliminada exitosamente')
  }
}
```

### 2. Usando el Service Layer del Frontend

```javascript
import { taskService } from '../services/taskService'

// El frontend abstrae las calls con el service layer
const handleTaskOperations = async () => {
  try {
    // Obtener tareas
    const tasks = await taskService.getTasks()
    
    // Crear tarea
    const newTask = await taskService.createTask({
      title: 'Nueva tarea',
      description: 'Descripción',
      status: '0'
    })
    
    // Actualizar tarea
    const updatedTask = await taskService.updateTask(newTask.data.id, {
      status: '1'
    })
    
    // Eliminar tarea
    await taskService.deleteTask(updatedTask.data.id)
    
  } catch (error) {
    console.error('Error en operación:', error)
  }
}
```

## ⚠️ Manejo de Errores

### Error Handling en el Frontend

```javascript
// utils/request.jsx
export const makeRequest = async (endpoint, params, method, data) => {
  try {
    const response = await axios(config)
    return response.data
  } catch (error) {
    // Error de respuesta HTTP
    if (error.response) {
      console.error('API Error:', error.response.data)
      throw new Error(error.response.data.error?.message || 'API Error')
    }
    
    // Error de red
    if (error.request) {
      console.error('Network Error:', error.request)
      throw new Error('Error de conexión. Verifica tu internet.')
    }
    
    // Otro tipo de error
    console.error('Unexpected Error:', error.message)
    throw new Error('Error inesperado')
  }
}
```

### Casos de Error Comunes

#### 1. Validación de Datos
```json
// Request
POST /api/tasks
{
  "title": "",
  "status": "invalid"
}

// Response (422)
{
  "error": {
    "code": 422,
    "message": "Validation failed",
    "details": {
      "title": ["The title field is required"],
      "status": ["The status must be 0 or 1"]
    }
  }
}
```

#### 2. Recurso No Encontrado
```json
// Request
GET /api/tasks/999

// Response (404)
{
  "error": {
    "code": 404,
    "message": "Task not found"
  }
}
```

#### 3. Error de Servidor
```json
// Response (500)
{
  "error": {
    "code": 500,
    "message": "Internal server error"
  }
}
```

## 🔧 Configuración del Cliente HTTP

### Axios Configuration

```javascript
// config/api.jsx
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_URL || "http://localhost:8000/api",
  ENDPOINTS: {
    TASKS: "/tasks"
  },
  TIMEOUT: 10000, // 10 segundos
}

// utils/request.jsx - Cliente configurado
const config = {
  method: method,
  url: `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS[endpoint]}${params ? `/${params}` : ""}`,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem('access_token') || ""}`
  },
  data: data,
  timeout: API_CONFIG.TIMEOUT,
}
```

### Request Interceptors (Futuro)

```javascript
// Para implementar interceptors globales
axios.interceptors.request.use(
  (config) => {
    // Agregar token automáticamente
    const token = localStorage.getItem('access_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    // Manejar errores 401 (token expirado)
    if (error.response?.status === 401) {
      localStorage.removeItem('access_token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)
```

## 🚀 Rate Limiting y Performance

### Recomendaciones

1. **Debouncing**: Para búsquedas en tiempo real
2. **Caching**: Implementar cache local para reducir requests
3. **Batch Operations**: Agrupar operaciones cuando sea posible
4. **Optimistic Updates**: Actualizar UI antes de confirmar con API

### Ejemplo de Optimistic Update

```javascript
const handleToggleTaskStatus = async (task) => {
  // 1. Actualizar UI inmediatamente
  const optimisticTask = { ...task, status: task.status === "0" ? "1" : "0" }
  updateTaskInLocalState(optimisticTask)
  
  try {
    // 2. Confirmar con API
    const updatedTask = await taskService.updateTask(task.id, {
      status: optimisticTask.status
    })
    
    // 3. Actualizar con respuesta real
    updateTaskInLocalState(updatedTask.data)
  } catch (error) {
    // 4. Revertir si falla
    updateTaskInLocalState(task)
    showError('Error al actualizar tarea')
  }
}
```

## 📚 Testing de API

### Herramientas Recomendadas

1. **Postman**: Para testing manual
2. **Insomnia**: Alternativa a Postman
3. **curl**: Para testing desde terminal
4. **Jest + Supertest**: Para tests automatizados (backend)

### Ejemplos con curl

```bash
# Obtener tareas
curl -X GET "http://localhost:8000/api/tasks" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>"

# Crear tarea
curl -X POST "http://localhost:8000/api/tasks" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{
    "title": "Test Task",
    "description": "Created via curl",
    "status": "0"
  }'

# Actualizar tarea
curl -X PUT "http://localhost:8000/api/tasks/1" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{
    "status": "1"
  }'

# Eliminar tarea
curl -X DELETE "http://localhost:8000/api/tasks/1" \
  -H "Authorization: Bearer <token>"
```
