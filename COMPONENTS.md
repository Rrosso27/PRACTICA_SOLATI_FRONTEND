# Documentación de Componentes - Task Manager

## 📋 Índice

1. [TaskManager](#taskmanager)
2. [TaskCard](#taskcard)
3. [TaskModal](#taskmodal)
4. [Sidebar](#sidebar)
5. [Loader](#loader)
6. [AlerError](#alererror)

---

## 🎯 TaskManager

**Archivo**: `src/components/TaskManager.jsx`

### Descripción
Componente principal que actúa como contenedor de toda la aplicación. Orquesta el estado global y renderiza todos los sub-componentes.

### Funcionalidades
- Gestión del estado global de tareas
- Manejo de filtros y estados de UI
- Coordinación entre componentes
- Manejo de errores y loading states

### Dependencias
```javascript
import { useTaskManager } from '../hooks/useTaskManager'
import Sidebar from './Sidebar'
import TaskCard from './TaskCard'
import TaskModal from './TaskModal'
import Loader from './Loader'
import AlerError from './AlerError'
```

### Estado Interno
El componente no maneja estado propio, todo se delega al hook `useTaskManager`:

```javascript
const {
  isModalOpen,      // boolean - Estado del modal
  error,           // string | null - Mensaje de error actual
  editingTask,     // Task | null - Tarea en edición
  loading,         // boolean - Estado de carga global
  activeFilter,    // string - Filtro activo ('all', 'pending', 'completed')
  filteredTasks,   // Task[] - Tareas filtradas
  taskCounts,      // object - Contadores por estado
  // ... funciones de manejo
} = useTaskManager()
```

### Estructura del Render

```jsx
<div className="min-h-screen bg-gray-100">
  {/* Header */}
  <div className="bg-white border-b">
    <h1>TASK MANAGER</h1>
  </div>
  
  <div className="flex h-screen">
    {/* Sidebar */}
    <Sidebar />
    
    {/* Main Content */}
    <div className="flex-1 p-6">
      {/* Controls */}
      <div className="flex justify-between items-center mb-6">
        <h2>{getFilterTitle()}</h2>
        <button onClick={handleOpenModal}>+ Add New Task</button>
      </div>
      
      {/* Content Area */}
      {loading ? (
        <Loader />
      ) : filteredTasks.length === 0 ? (
        <EmptyState />
      ) : (
        <TaskGrid />
      )}
    </div>
  </div>
  
  {/* Modal */}
  {isModalOpen && <TaskModal />}
  
  {/* Error Alert */}
  {error && <AlerError />}
</div>
```

### Estilos Principales
- **Layout**: Flexbox vertical con sidebar fijo
- **Header**: Fondo blanco con borde inferior
- **Main**: Padding uniforme, fondo gris claro
- **Grid**: Grid responsivo para las tarjetas

---

## 📄 TaskCard

**Archivo**: `src/components/TaskCard.jsx`

### Descripción
Componente que representa una tarea individual en formato de tarjeta. Muestra la información de la tarea y proporciona acciones rápidas.

### Props

```javascript
interface TaskCardProps {
  task: {
    id: number,
    title: string,
    description: string,
    status: "0" | "1",
    created_at: string,
    updated_at: string
  },
  onEdit: (task: Task) => void,
  onDelete: (taskId: number) => void
}
```

### Funcionalidades
- **Display**: Muestra título, descripción y estado de la tarea
- **Status Toggle**: Permite cambiar entre pendiente/completada
- **Actions**: Botones para editar y eliminar
- **Visual State**: Diferentes estilos según el estado de la tarea

### Estados Visuales

#### Tarea Pendiente (status: "0")
```css
- Fondo: bg-white
- Borde: border-gray-200
- Título: text-gray-800
- Descripción: text-gray-600
- Checkbox: unchecked
```

#### Tarea Completada (status: "1")
```css
- Fondo: bg-green-50
- Borde: border-green-200
- Título: line-through text-gray-500
- Descripción: text-gray-400
- Checkbox: checked con checkmark verde
```

### Estructura del Componente

```jsx
<div className="task-card-container">
  {/* Header */}
  <div className="flex items-start justify-between">
    <div className="flex items-center gap-3">
      <Checkbox />
      <div>
        <h3>{task.title}</h3>
        <p>{task.description}</p>
      </div>
    </div>
    
    {/* Actions */}
    <div className="flex gap-2">
      <EditButton />
      <DeleteButton />
    </div>
  </div>
  
  {/* Footer */}
  <div className="text-xs text-gray-400">
    Created: {formatDate(task.created_at)}
  </div>
</div>
```

### Event Handlers

```javascript
const handleToggleStatus = () => {
  const newStatus = task.status === "0" ? "1" : "0"
  onEdit({ ...task, status: newStatus })
}

const handleEdit = () => {
  onEdit(task)
}

const handleDelete = () => {
  if (window.confirm('¿Estás seguro de eliminar esta tarea?')) {
    onDelete(task.id)
  }
}
```

---

## 🔧 TaskModal

**Archivo**: `src/components/TaskModal.jsx`

### Descripción
Modal para crear nuevas tareas o editar tareas existentes. Incluye validación de formulario y manejo de estados de loading.

### Props

```javascript
interface TaskModalProps {
  isOpen: boolean,
  editingTask: Task | null,
  onClose: () => void,
  onSave: (taskData: Partial<Task>) => Promise<void>
}
```

### Estado Interno

```javascript
const [formData, setFormData] = useState({
  title: '',
  description: '',
  status: '0'
})
const [errors, setErrors] = useState({})
const [loading, setLoading] = useState(false)
```

### Validación del Formulario

```javascript
const validateForm = () => {
  const newErrors = {}
  
  if (!formData.title.trim()) {
    newErrors.title = 'El título es requerido'
  } else if (formData.title.length > 255) {
    newErrors.title = 'El título debe tener máximo 255 caracteres'
  }
  
  if (formData.description.length > 1000) {
    newErrors.description = 'La descripción debe tener máximo 1000 caracteres'
  }
  
  setErrors(newErrors)
  return Object.keys(newErrors).length === 0
}
```

### Estructura del Modal

```jsx
<div className="modal-overlay">
  <div className="modal-container">
    {/* Header */}
    <div className="modal-header">
      <h2>{editingTask ? 'Edit Task' : 'New Task'}</h2>
      <CloseButton />
    </div>
    
    {/* Form */}
    <form onSubmit={handleSubmit}>
      {/* Title Field */}
      <div className="form-group">
        <label htmlFor="title">Title *</label>
        <input
          id="title"
          type="text"
          value={formData.title}
          onChange={handleChange}
          className={errors.title ? 'error' : ''}
        />
        {errors.title && <span className="error-text">{errors.title}</span>}
      </div>
      
      {/* Description Field */}
      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          value={formData.description}
          onChange={handleChange}
          className={errors.description ? 'error' : ''}
        />
        {errors.description && <span className="error-text">{errors.description}</span>}
      </div>
      
      {/* Status Field (solo para edición) */}
      {editingTask && (
        <div className="form-group">
          <label>Status</label>
          <StatusToggle />
        </div>
      )}
      
      {/* Actions */}
      <div className="modal-actions">
        <CancelButton />
        <SubmitButton loading={loading} />
      </div>
    </form>
  </div>
</div>
```

### Event Handlers

```javascript
const handleChange = (e) => {
  const { name, value } = e.target
  setFormData(prev => ({
    ...prev,
    [name]: value
  }))
  
  // Limpiar error del campo al escribir
  if (errors[name]) {
    setErrors(prev => ({
      ...prev,
      [name]: null
    }))
  }
}

const handleSubmit = async (e) => {
  e.preventDefault()
  
  if (!validateForm()) return
  
  setLoading(true)
  try {
    await onSave(formData)
    onClose()
  } catch (error) {
    console.error('Error saving task:', error)
  } finally {
    setLoading(false)
  }
}
```

---

## 📊 Sidebar

**Archivo**: `src/components/Sidebar.jsx`

### Descripción
Barra lateral de navegación que contiene los filtros de tareas y contadores por estado.

### Props

```javascript
interface SidebarProps {
  activeFilter: 'all' | 'pending' | 'completed',
  onFilterChange: (filter: string) => void,
  taskCounts: {
    all: number,
    pending: number,
    completed: number
  }
}
```

### Estructura del Componente

```jsx
<div className="sidebar">
  {/* Header */}
  <div className="sidebar-header">
    <h3>Filters</h3>
  </div>
  
  {/* Filter Options */}
  <nav className="sidebar-nav">
    <FilterButton
      filter="all"
      active={activeFilter === 'all'}
      count={taskCounts.all}
      onClick={() => onFilterChange('all')}
    >
      All Tasks
    </FilterButton>
    
    <FilterButton
      filter="pending"
      active={activeFilter === 'pending'}
      count={taskCounts.pending}
      onClick={() => onFilterChange('pending')}
    >
      Pending
    </FilterButton>
    
    <FilterButton
      filter="completed"
      active={activeFilter === 'completed'}
      count={taskCounts.completed}
      onClick={() => onFilterChange('completed')}
    >
      Completed
    </FilterButton>
  </nav>
</div>
```

### FilterButton Component

```jsx
const FilterButton = ({ filter, active, count, onClick, children }) => {
  const baseClasses = "flex items-center justify-between w-full p-3 text-left rounded-lg transition-colors"
  const activeClasses = active 
    ? "bg-blue-100 text-blue-700 border-blue-200" 
    : "hover:bg-gray-100 text-gray-700"
  
  return (
    <button
      className={`${baseClasses} ${activeClasses}`}
      onClick={onClick}
    >
      <span className="flex items-center gap-3">
        <Icon filter={filter} />
        {children}
      </span>
      <span className="badge">{count}</span>
    </button>
  )
}
```

### Icons por Filter

```jsx
const getFilterIcon = (filter) => {
  switch (filter) {
    case 'all':
      return <AllTasksIcon />
    case 'pending':
      return <PendingIcon />
    case 'completed':
      return <CompletedIcon />
    default:
      return null
  }
}
```

---

## ⏳ Loader

**Archivo**: `src/components/Loader.jsx`

### Descripción
Componente de loading que se muestra durante operaciones asíncronas.

### Props

```javascript
interface LoaderProps {
  size?: 'sm' | 'md' | 'lg',
  message?: string
}
```

### Variantes de Tamaño

```javascript
const sizeClasses = {
  sm: 'w-4 h-4',
  md: 'w-8 h-8', 
  lg: 'w-12 h-12'
}
```

### Estructura del Componente

```jsx
<div className="loader-container">
  <div className="loader-content">
    {/* Spinner */}
    <div className={`loader-spinner ${sizeClasses[size]}`}>
      <svg className="animate-spin" viewBox="0 0 24 24">
        <circle
          className="opacity-25"
          cx="12" cy="12" r="10"
          stroke="currentColor" strokeWidth="4"
          fill="none"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v8H4z"
        />
      </svg>
    </div>
    
    {/* Message */}
    {message && (
      <p className="loader-message">{message}</p>
    )}
  </div>
</div>
```

### Casos de Uso

```jsx
// Loading general
<Loader message="Loading tasks..." />

// Loading en botón
<button disabled={loading}>
  {loading ? <Loader size="sm" /> : 'Save Task'}
</button>

// Loading en modal
{loading && <Loader message="Saving task..." />}
```

---

## ⚠️ AlerError

**Archivo**: `src/components/AlerError.jsx`

### Descripción
Componente para mostrar alertas de error con posibilidad de cierre automático o manual.

### Props

```javascript
interface AlerErrorProps {
  error: string,
  onClose: () => void,
  autoClose?: boolean,
  duration?: number, // en milisegundos
  type?: 'error' | 'warning' | 'info'
}
```

### Estado Interno

```javascript
const [isVisible, setIsVisible] = useState(true)

useEffect(() => {
  if (autoClose && duration) {
    const timer = setTimeout(() => {
      handleClose()
    }, duration)
    
    return () => clearTimeout(timer)
  }
}, [autoClose, duration])
```

### Estructura del Componente

```jsx
{isVisible && (
  <div className="alert-overlay">
    <div className={`alert-container ${typeClasses[type]}`}>
      {/* Icon */}
      <div className="alert-icon">
        <AlertIcon type={type} />
      </div>
      
      {/* Content */}
      <div className="alert-content">
        <p className="alert-message">{error}</p>
      </div>
      
      {/* Close Button */}
      <button
        className="alert-close"
        onClick={handleClose}
      >
        <CloseIcon />
      </button>
    </div>
  </div>
)}
```

### Tipos de Alerta

```javascript
const typeClasses = {
  error: 'bg-red-50 border-red-200 text-red-800',
  warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
  info: 'bg-blue-50 border-blue-200 text-blue-800'
}

const typeIcons = {
  error: <ErrorIcon />,
  warning: <WarningIcon />,
  info: <InfoIcon />
}
```

### Event Handlers

```javascript
const handleClose = () => {
  setIsVisible(false)
  setTimeout(() => {
    onClose()
  }, 200) // Delay para animación de salida
}
```

### Casos de Uso

```jsx
// Error simple
<AlerError 
  error="Failed to save task" 
  onClose={clearError}
/>

// Error con auto-close
<AlerError 
  error="Task saved successfully" 
  type="info"
  autoClose={true}
  duration={3000}
  onClose={clearError}
/>

// Warning
<AlerError 
  error="This action cannot be undone" 
  type="warning"
  onClose={clearError}
/>
```

---

## 🎨 Estilos Comunes

### Clases Utility Compartidas

```css
/* Botones */
.btn-primary {
  @apply px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors;
}

.btn-secondary {
  @apply px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors;
}

.btn-danger {
  @apply px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors;
}

/* Forms */
.form-input {
  @apply w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500;
}

.form-input.error {
  @apply border-red-500 focus:ring-red-500 focus:border-red-500;
}

.form-label {
  @apply block text-sm font-medium text-gray-700 mb-2;
}

.error-text {
  @apply text-sm text-red-600 mt-1;
}

/* Cards */
.card {
  @apply bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow;
}

/* Animations */
.fade-in {
  @apply animate-fade-in;
}

.fade-out {
  @apply animate-fade-out;
}
```

### Responsive Design

Todos los componentes siguen estas breakpoints:

```css
/* Mobile First */
.responsive-grid {
  @apply grid grid-cols-1 gap-4;
  @apply sm:grid-cols-2;
  @apply lg:grid-cols-3;
  @apply xl:grid-cols-4;
}

.responsive-padding {
  @apply p-4;
  @apply sm:p-6;
  @apply lg:p-8;
}
```

---

## 🔧 Props Validation

### Ejemplo con PropTypes

```javascript
import PropTypes from 'prop-types'

TaskCard.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    status: PropTypes.oneOf(['0', '1']).isRequired,
    created_at: PropTypes.string.isRequired,
    updated_at: PropTypes.string.isRequired
  }).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
}

TaskCard.defaultProps = {
  task: {
    description: ''
  }
}
```

## 🧪 Testing Guidelines

### Ejemplo de Test para TaskCard

```javascript
import { render, screen, fireEvent } from '@testing-library/react'
import TaskCard from './TaskCard'

describe('TaskCard', () => {
  const mockTask = {
    id: 1,
    title: 'Test Task',
    description: 'Test Description',
    status: '0',
    created_at: '2025-09-21T10:00:00Z',
    updated_at: '2025-09-21T10:00:00Z'
  }
  
  it('renders task information correctly', () => {
    render(
      <TaskCard 
        task={mockTask}
        onEdit={jest.fn()}
        onDelete={jest.fn()}
      />
    )
    
    expect(screen.getByText('Test Task')).toBeInTheDocument()
    expect(screen.getByText('Test Description')).toBeInTheDocument()
  })
  
  it('calls onEdit when edit button is clicked', () => {
    const mockOnEdit = jest.fn()
    
    render(
      <TaskCard 
        task={mockTask}
        onEdit={mockOnEdit}
        onDelete={jest.fn()}
      />
    )
    
    fireEvent.click(screen.getByRole('button', { name: /edit/i }))
    expect(mockOnEdit).toHaveBeenCalledWith(mockTask)
  })
})
