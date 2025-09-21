# Guía de Desarrollo - Task Manager Frontend

## 📋 Índice

1. [Configuración del Entorno](#configuración-del-entorno)
2. [Estándares de Código](#estándares-de-código)
3. [Estructura de Archivos](#estructura-de-archivos)
4. [Convenciones de Nomenclatura](#convenciones-de-nomenclatura)
5. [Guías de Componentes](#guías-de-componentes)
6. [Manejo de Estado](#manejo-de-estado)
7. [Estilos y CSS](#estilos-y-css)
8. [Testing](#testing)
9. [Debugging](#debugging)

## ⚙️ Configuración del Entorno

### Prerrequisitos

```bash
Node.js >= 18.0.0
npm >= 8.0.0
Git >= 2.0.0
```

### Setup Inicial

1. **Clonar y configurar**
```bash
git clone [repo-url]
cd PRACTICA_SOLATI_FRONTEND
npm install
```

2. **Variables de entorno**
```bash
# .env
VITE_API_URL=http://localhost:8000/api
```

3. **Extensiones recomendadas para VS Code**
```json
{
  "recommendations": [
    "bradlc.vscode-tailwindcss",
    "esbenp.prettier-vscode",
    "ms-vscode.vscode-eslint",
    "formulahendry.auto-rename-tag",
    "christian-kohler.path-intellisense"
  ]
}
```

## 📝 Estándares de Código

### ESLint Configuration

El proyecto usa ESLint con las siguientes reglas principales:

```javascript
// eslint.config.js
export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'react-refresh/only-export-components': 'warn',
    }
  }
]
```

### Prettier Configuration

```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": false,
  "printWidth": 100,
  "tabWidth": 2,
  "useTabs": false
}
```

## 📁 Estructura de Archivos

### Organización por Tipo

```
src/
├── components/          # Componentes reutilizables
│   ├── ui/             # Componentes base (Button, Input, etc.)
│   ├── forms/          # Componentes de formularios
│   └── layout/         # Componentes de layout
├── hooks/              # Custom hooks
├── services/           # Servicios de API
├── utils/              # Funciones utilitarias
├── config/             # Configuraciones
├── constants/          # Constantes de la app
├── types/              # Definiciones de tipos (futuro)
└── assets/             # Recursos estáticos
```

### Convención de Archivos

```
ComponentName.jsx       # Componentes React
serviceName.jsx         # Servicios
useSomething.js        # Custom hooks
utilityName.js         # Utilidades
ComponentName.test.jsx # Tests de componentes
```

## 🏷️ Convenciones de Nomenclatura

### Componentes

```javascript
// ✅ Correcto - PascalCase
const TaskCard = () => { }
const TaskManager = () => { }
const AlerError = () => { }

// ❌ Incorrecto
const taskCard = () => { }
const task_manager = () => { }
```

### Variables y Funciones

```javascript
// ✅ Correcto - camelCase
const activeFilter = 'all'
const handleEditTask = () => { }
const isModalOpen = true

// ❌ Incorrecto  
const ActiveFilter = 'all'
const handle_edit_task = () => { }
const is_modal_open = true
```

### Constantes

```javascript
// ✅ Correcto - UPPER_SNAKE_CASE
const API_BASE_URL = 'http://localhost:8000'
const TASK_STATUS = {
  PENDING: "0",
  COMPLETED: "1"
}

// ❌ Incorrecto
const apiBaseUrl = 'http://localhost:8000'
const taskStatus = { pending: "0" }
```

### Custom Hooks

```javascript
// ✅ Correcto - use + PascalCase
const useTaskManager = () => { }
const useTaskModal = () => { }
const useApiClient = () => { }

// ❌ Incorrecto
const taskManagerHook = () => { }
const UseTaskModal = () => { }
```

## 🧩 Guías de Componentes

### Estructura de Componente

```javascript
// 1. Imports
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

// 2. Component Definition
const ComponentName = ({ 
  prop1, 
  prop2 = defaultValue,
  onAction 
}) => {
  // 3. Hooks (en orden)
  const [state, setState] = useState(initialValue)
  
  useEffect(() => {
    // side effects
  }, [dependencies])
  
  // 4. Event Handlers
  const handleAction = () => {
    // handler logic
  }
  
  // 5. Render Logic
  if (loading) return <Loader />
  
  // 6. JSX Return
  return (
    <div className="component-container">
      {/* JSX content */}
    </div>
  )
}

// 7. PropTypes (opcional pero recomendado)
ComponentName.propTypes = {
  prop1: PropTypes.string.isRequired,
  prop2: PropTypes.number,
  onAction: PropTypes.func
}

// 8. Export
export default ComponentName
```

### Componente con Props Destructuradas

```javascript
// ✅ Recomendado - destructuring en parámetros
const TaskCard = ({ task, onEdit, onDelete }) => {
  return (
    <div className="task-card">
      <h3>{task.title}</h3>
      <button onClick={() => onEdit(task)}>Edit</button>
      <button onClick={() => onDelete(task.id)}>Delete</button>
    </div>
  )
}

// ❌ No recomendado - props sin destructuring
const TaskCard = (props) => {
  return (
    <div className="task-card">
      <h3>{props.task.title}</h3>
      <button onClick={() => props.onEdit(props.task)}>Edit</button>
    </div>
  )
}
```

### Conditional Rendering

```javascript
// ✅ Para condiciones simples
{isLoading && <Loader />}
{error && <ErrorMessage error={error} />}

// ✅ Para lógica más compleja
{status === 'loading' ? (
  <Loader />
) : status === 'error' ? (
  <ErrorMessage />
) : (
  <TaskList tasks={tasks} />
)}

// ✅ Para condiciones complejas - extraer a función
const renderContent = () => {
  if (isLoading) return <Loader />
  if (error) return <ErrorMessage error={error} />
  if (tasks.length === 0) return <EmptyState />
  return <TaskList tasks={tasks} />
}

return <div>{renderContent()}</div>
```

## 🔄 Manejo de Estado

### useState Guidelines

```javascript
// ✅ Estado simple
const [isOpen, setIsOpen] = useState(false)
const [count, setCount] = useState(0)

// ✅ Estado objeto - usar callback para updates
const [task, setTask] = useState({ title: '', description: '' })

const updateTask = (field, value) => {
  setTask(prev => ({
    ...prev,
    [field]: value
  }))
}

// ❌ Evitar mutación directa
task.title = 'New Title' // ¡NO!
setTask(task)
```

### Custom Hooks Guidelines

```javascript
// ✅ Hook bien estructurado
const useTaskManager = () => {
  // 1. Estado local
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(false)
  
  // 2. Efectos
  useEffect(() => {
    fetchTasks()
  }, [])
  
  // 3. Funciones del hook
  const fetchTasks = async () => {
    try {
      setLoading(true)
      const data = await taskService.getTasks()
      setTasks(data)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }
  
  // 4. Return objeto con API clara
  return {
    // Estado
    tasks,
    loading,
    
    // Acciones
    fetchTasks,
    addTask: taskService.createTask,
    updateTask: taskService.updateTask,
    deleteTask: taskService.deleteTask
  }
}
```

### Optimización de Performance

```javascript
// ✅ useMemo para cálculos pesados
const expensiveValue = useMemo(() => {
  return tasks.filter(task => 
    task.title.toLowerCase().includes(searchTerm.toLowerCase())
  )
}, [tasks, searchTerm])

// ✅ useCallback para funciones estables
const handleTaskEdit = useCallback((task) => {
  setEditingTask(task)
  setIsModalOpen(true)
}, []) // sin dependencias si no usa estado

// ✅ React.memo para componentes que no cambian frecuentemente
const TaskCard = React.memo(({ task, onEdit, onDelete }) => {
  return (
    <div className="task-card">
      {/* contenido */}
    </div>
  )
})
```

## 🎨 Estilos y CSS

### Tailwind CSS Conventions

```javascript
// ✅ Orden de clases recomendado:
// 1. Layout (display, position, flex, grid)
// 2. Box Model (margin, padding, width, height)
// 3. Typography
// 4. Visual (background, border, shadow)
// 5. Interactivity (hover, focus, transition)

<div className="
  flex flex-col items-center justify-center
  w-full max-w-md mx-auto p-6 
  text-center text-gray-800
  bg-white rounded-lg shadow-md
  hover:shadow-lg transition-shadow duration-200
">
```

### Component Styling

```javascript
// ✅ Clases condicionales
const buttonClass = `
  px-4 py-2 rounded font-medium transition-colors
  ${variant === 'primary' 
    ? 'bg-blue-500 text-white hover:bg-blue-600' 
    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
  }
  ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
`

// ✅ Utility para clases complejas
const getTaskCardClasses = (status, isSelected) => {
  const baseClasses = 'p-4 rounded-lg border transition-all duration-200'
  const statusClasses = status === '1' 
    ? 'bg-green-50 border-green-200' 
    : 'bg-white border-gray-200'
  const selectedClasses = isSelected ? 'ring-2 ring-blue-500' : ''
  
  return `${baseClasses} ${statusClasses} ${selectedClasses}`
}
```

## 🧪 Testing

### Estructura de Tests (Futuro)

```javascript
// TaskCard.test.jsx
import { render, screen, fireEvent } from '@testing-library/react'
import TaskCard from './TaskCard'

describe('TaskCard', () => {
  const mockTask = {
    id: 1,
    title: 'Test Task',
    description: 'Test Description',
    status: '0'
  }
  
  const mockOnEdit = jest.fn()
  const mockOnDelete = jest.fn()
  
  beforeEach(() => {
    jest.clearAllMocks()
  })
  
  it('renders task information', () => {
    render(
      <TaskCard 
        task={mockTask} 
        onEdit={mockOnEdit} 
        onDelete={mockOnDelete} 
      />
    )
    
    expect(screen.getByText('Test Task')).toBeInTheDocument()
    expect(screen.getByText('Test Description')).toBeInTheDocument()
  })
  
  it('calls onEdit when edit button is clicked', () => {
    render(
      <TaskCard 
        task={mockTask} 
        onEdit={mockOnEdit} 
        onDelete={mockOnDelete} 
      />
    )
    
    fireEvent.click(screen.getByText('Edit'))
    expect(mockOnEdit).toHaveBeenCalledWith(mockTask)
  })
})
```

## 🐛 Debugging

### Console Logging

```javascript
// ✅ Desarrollo - logs informativos
console.log('Tasks fetched:', tasks)
console.warn('API response format unexpected:', data)
console.error('Error fetching tasks:', error)

// ✅ Producción - solo errores críticos
if (process.env.NODE_ENV === 'development') {
  console.log('Debug info:', debugData)
}
```

### React Developer Tools

1. **Instalar extensión**: React Developer Tools para Chrome/Firefox
2. **Profiler**: Para identificar re-renders innecesarios
3. **Components**: Para inspeccionar props y estado

### Error Boundaries

```javascript
// ErrorBoundary.jsx (para implementar)
class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }
  
  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }
  
  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo)
    // Aquí podrías enviar el error a un servicio de logging
  }
  
  render() {
    if (this.state.hasError) {
      return (
        <div className="error-fallback">
          <h2>Algo salió mal</h2>
          <p>Por favor, recarga la página</p>
          <button onClick={() => window.location.reload()}>
            Recargar
          </button>
        </div>
      )
    }
    
    return this.props.children
  }
}
```

## 📋 Checklist de Desarrollo

### Antes de crear un PR

- [ ] Código sigue las convenciones de nomenclatura
- [ ] Componentes están bien estructurados
- [ ] No hay console.logs en producción
- [ ] Estilos siguen las convenciones de Tailwind
- [ ] Props tienen validación (PropTypes o TypeScript)
- [ ] Manejo de errores implementado
- [ ] Performance optimizada (memo, callback donde necesario)
- [ ] Accesibilidad básica (alt texts, labels)
- [ ] Tests escritos (cuando aplique)
- [ ] Documentación actualizada

### Comandos Útiles

```bash
# Linting
npm run lint
npm run lint:fix

# Build
npm run build
npm run preview

# Desarrollo
npm run dev

# Análisis de bundle (futuro)
npm install --save-dev @rollup/plugin-analyzer
```

## 🚀 Best Practices

### Performance

1. **Lazy Loading**: Cargar componentes cuando se necesiten
2. **Code Splitting**: Dividir el bundle por rutas
3. **Memoization**: Usar memo, useMemo, useCallback apropiadamente
4. **Debouncing**: Para inputs de búsqueda
5. **Virtualización**: Para listas largas (futuro)

### Accesibilidad

1. **Semantic HTML**: Usar elementos semánticos
2. **ARIA labels**: Para elementos interactivos
3. **Keyboard Navigation**: Asegurar navegación con teclado
4. **Color Contrast**: Cumplir estándares WCAG
5. **Screen Readers**: Texto alternativo para imágenes

### Seguridad

1. **Sanitización**: Sanitizar inputs de usuario
2. **HTTPS**: Usar siempre HTTPS en producción
3. **Validación**: Validar datos tanto en frontend como backend
4. **Secrets**: Nunca hardcodear API keys o secrets
