# Task Manager Frontend

Una aplicación frontend desarrollada con React, Vite y Tailwind CSS para gestionar tareas. Esta aplicación permite crear, editar, eliminar y filtrar tareas con una interfaz moderna y responsiva.

## 🚀 Características

- **Gestión completa de tareas**: Crear, editar, eliminar y marcar como completadas
- **Filtros inteligentes**: Filtrar por todas las tareas, pendientes o completadas
- **Interfaz moderna**: Diseño limpio con Tailwind CSS
- **Responsive**: Adaptada para diferentes dispositivos
- **Estado en tiempo real**: Actualizaciones automáticas del estado de las tareas
- **Manejo de errores**: Notificaciones de error con sistema de alertas
- **Loading states**: Indicadores de carga para mejor UX

## 🛠️ Tecnologías

- **React 19.1.1**: Biblioteca principal para la UI
- **Vite 7.1.6**: Herramienta de build rápida
- **Tailwind CSS 4.1.13**: Framework CSS para estilos
- **Axios 1.12.2**: Cliente HTTP para comunicación con la API
- **ESLint**: Linting y calidad de código

## 📁 Estructura del Proyecto

```
src/
├── components/          # Componentes React
│   ├── TaskManager.jsx    # Componente principal
│   ├── TaskCard.jsx      # Tarjeta individual de tarea
│   ├── TaskModal.jsx     # Modal para crear/editar tareas
│   ├── Sidebar.jsx       # Barra lateral con filtros
│   ├── Loader.jsx        # Componente de loading
│   └── AlerError.jsx     # Componente de alertas de error
├── hooks/               # Custom hooks
│   ├── useTaskManager.js # Hook principal para gestión de tareas
│   └── useTaskModal.js   # Hook para el modal de tareas
├── services/            # Servicios para API
│   └── taskService.jsx   # Servicio de tareas (CRUD)
├── config/              # Configuraciones
│   └── api.jsx          # Configuración de API y autenticación
├── utils/               # Utilidades
│   └── request.jsx      # Cliente HTTP personalizado
└── assets/              # Recursos estáticos
    └── react.svg
```

## 🚦 Instalación y Configuración

### Prerrequisitos

- Node.js 18+ 
- npm o yarn
- Servidor backend corriendo (por defecto en localhost:8000)

### Instalación

1. **Clonar el repositorio**
```bash
git clone https://github.com/Rrosso27/PRACTICA_SOLATI_FRONTEND.git
cd PRACTICA_SOLATI_FRONTEND
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno**
Crear un archivo `.env` en la raíz del proyecto:
```env
VITE_API_URL=http://localhost:8000/api
```

4. **Ejecutar en modo desarrollo**
```bash
npm run dev
```

5. **Abrir en el navegador**
La aplicación estará disponible en `http://localhost:5173`

## 🎯 Scripts Disponibles

```bash
npm run dev      # Ejecuta la aplicación en modo desarrollo
npm run build    # Construye la aplicación para producción
npm run preview  # Vista previa de la build de producción
npm run lint     # Ejecuta ESLint para verificar código
```

## 🏗️ Arquitectura

### Componentes Principales

#### TaskManager
- **Ubicación**: `src/components/TaskManager.jsx`
- **Propósito**: Componente principal que orquesta toda la aplicación
- **Funcionalidades**: 
  - Manejo del estado global de tareas
  - Renderizado de sidebar, tarjetas y modal
  - Gestión de filtros y acciones

#### TaskCard  
- **Ubicación**: `src/components/TaskCard.jsx`
- **Propósito**: Representación individual de cada tarea
- **Props**: 
  - `task`: Objeto con datos de la tarea
  - `onEdit`: Función para editar tarea
  - `onDelete`: Función para eliminar tarea

#### TaskModal
- **Ubicación**: `src/components/TaskModal.jsx`
- **Propósito**: Modal para crear y editar tareas
- **Props**:
  - `isOpen`: Estado de visibilidad del modal
  - `onClose`: Función para cerrar modal
  - `onSave`: Función para guardar tarea
  - `editingTask`: Tarea en edición (null para nueva)

#### Sidebar
- **Ubicación**: `src/components/Sidebar.jsx`  
- **Propósito**: Navegación y filtros de tareas
- **Props**:
  - `activeFilter`: Filtro actualmente seleccionado
  - `onFilterChange`: Función para cambiar filtro
  - `taskCounts`: Contadores de tareas por estado

### Custom Hooks

#### useTaskManager
- **Ubicación**: `src/hooks/useTaskManager.js`
- **Propósito**: Hook principal para gestión de estado de tareas
- **Funcionalidades**:
  - CRUD de tareas
  - Filtrado por estado
  - Manejo de loading y errores
  - Estado del modal

#### useTaskModal
- **Ubicación**: `src/hooks/useTaskModal.js`
- **Propósito**: Hook para gestión del modal de tareas
- **Funcionalidades**:
  - Validación de formularios
  - Estado de loading del modal
  - Manejo de datos del formulario

### Servicios

#### taskService
- **Ubicación**: `src/services/taskService.jsx`
- **Propósito**: Abstracción de operaciones CRUD con la API
- **Métodos**:
  - `getTasks()`: Obtiene todas las tareas
  - `createTask(taskData)`: Crea nueva tarea
  - `updateTask(taskId, taskData)`: Actualiza tarea existente
  - `deleteTask(taskId)`: Elimina tarea

### Configuración

#### API Config
- **Ubicación**: `src/config/api.jsx`
- **Propósito**: Configuración centralizada de API y autenticación
- **Configuraciones**:
  - URL base de la API
  - Endpoints disponibles
  - Timeout de requests
  - Configuración de tokens de autenticación

#### Request Utils
- **Ubicación**: `src/utils/request.jsx`
- **Propósito**: Cliente HTTP personalizado con manejo de errores
- **Características**:
  - Interceptores de request/response
  - Manejo automático de headers de autenticación
  - Manejo centralizado de errores

## 🎨 Diseño y UX

- **Tema**: Diseño minimalista con esquema de colores grises y acentos azules
- **Responsividad**: Layout adaptativo para desktop, tablet y móvil
- **Iconografía**: Iconos SVG personalizados para acciones
- **Estados**: Loading spinners y mensajes de error informativos
- **Animaciones**: Transiciones suaves en modales y hover effects

## 🔧 API Integration

La aplicación se conecta a un backend REST que debe proporcionar los siguientes endpoints:

```
GET    /api/tasks       # Obtener todas las tareas
POST   /api/tasks       # Crear nueva tarea
PUT    /api/tasks/{id}  # Actualizar tarea
DELETE /api/tasks/{id}  # Eliminar tarea
```

### Estructura de Datos

```javascript
// Estructura de tarea
{
  id: number,
  title: string,
  description: string,
  status: "0" | "1", // "0" = pendiente, "1" = completada
  created_at: string,
  updated_at: string
}
```

## 🚀 Despliegue

### Build para Producción

1. **Crear build optimizada**
```bash
npm run build
```

2. **Los archivos se generan en la carpeta `dist/`**

3. **Servir archivos estáticos** (ejemplo con nginx, Apache, o servicio de hosting)

### Variables de Entorno para Producción

```env
VITE_API_URL=https://tu-api-produccion.com/api
```

## 🧪 Testing

Para agregar tests al proyecto (configuración futura):

```bash
# Instalar dependencias de testing
npm install --save-dev @testing-library/react @testing-library/jest-dom vitest
```

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto es parte de una práctica técnica para Solati.

## 👨‍💻 Desarrollador

**Nicolas Romaña Ross**
- GitHub: [@Rrosso27](https://github.com/Rrosso27)

---

## 🔍 Troubleshooting

### Problemas Comunes

1. **Error de conexión con API**
   - Verificar que el backend esté corriendo
   - Comprobar la variable `VITE_API_URL` en `.env`
   - Revisar CORS en el backend

2. **Página en blanco**
   - Verificar console del navegador para errores
   - Comprobar que todas las dependencias estén instaladas

3. **Estilos no se aplican**
   - Verificar que Tailwind CSS esté configurado correctamente
   - Comprobar que los archivos CSS se estén importando

### Performance Tips

- La aplicación usa React.memo en componentes que lo requieren
- Los estados se manejan de forma eficiente para evitar re-renders innecesarios
- Las requests a la API incluyen timeout para evitar cuelgues
