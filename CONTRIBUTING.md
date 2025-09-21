# Guía de Contribución - Task Manager Frontend

## 📋 Índice

1. [Cómo Contribuir](#cómo-contribuir)
2. [Configuración del Entorno](#configuración-del-entorno)
3. [Flujo de Trabajo](#flujo-de-trabajo)
4. [Estándares de Código](#estándares-de-código)
5. [Proceso de Review](#proceso-de-review)
6. [Despliegue](#despliegue)

---

## 🤝 Cómo Contribuir

### Tipos de Contribuciones

Bienvenidas son las siguientes contribuciones:

- 🐛 **Bug fixes**: Corrección de errores
- ✨ **Features**: Nuevas funcionalidades
- 📚 **Documentation**: Mejoras en documentación
- 🎨 **UI/UX**: Mejoras en diseño e interfaz
- ⚡ **Performance**: Optimizaciones de rendimiento
- 🧪 **Tests**: Adición de tests unitarios/integración
- ♻️ **Refactoring**: Mejoras en estructura de código

### Antes de Contribuir

1. **Revisar issues existentes**: Verificar que no haya un issue similar
2. **Crear issue**: Para features nuevos, crear issue para discusión
3. **Fork del repositorio**: Hacer fork para trabajar en cambios
4. **Leer documentación**: Familiarizarse con la arquitectura y estándares

---

## ⚙️ Configuración del Entorno

### Prerrequisitos

```bash
Node.js >= 18.0.0
npm >= 8.0.0
Git >= 2.0.0
VS Code (recomendado)
```

### Setup Inicial

```bash
# 1. Fork del repositorio
# 2. Clonar tu fork
git clone https://github.com/tu-usuario/PRACTICA_SOLATI_FRONTEND.git
cd PRACTICA_SOLATI_FRONTEND

# 3. Agregar upstream remote
git remote add upstream https://github.com/Rrosso27/PRACTICA_SOLATI_FRONTEND.git

# 4. Instalar dependencias
npm install

# 5. Configurar variables de entorno
cp .env.example .env
# Editar .env con tus configuraciones

# 6. Verificar que todo funcione
npm run dev
```

### Extensiones Recomendadas

```json
{
  "recommendations": [
    "bradlc.vscode-tailwindcss",
    "esbenp.prettier-vscode", 
    "ms-vscode.vscode-eslint",
    "formulahendry.auto-rename-tag",
    "christian-kohler.path-intellisense",
    "ms-vscode.vscode-json"
  ]
}
```

### Configuración de VS Code

```json
// .vscode/settings.json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "tailwindCSS.includeLanguages": {
    "javascript": "javascript",
    "html": "HTML"
  }
}
```

---

## 🔄 Flujo de Trabajo

### 1. Crear Feature Branch

```bash
# Actualizar main
git checkout main
git pull upstream main

# Crear nueva rama
git checkout -b feature/nombre-descriptivo
# o
git checkout -b bugfix/descripcion-del-bug
# o  
git checkout -b docs/actualizacion-documentacion
```

### 2. Convenciones de Nombres de Rama

```bash
# Features
feature/add-task-search
feature/dark-mode
feature/export-tasks

# Bug fixes
bugfix/task-modal-validation
bugfix/sidebar-responsive-issue

# Documentation
docs/update-readme
docs/add-api-documentation

# Performance
perf/optimize-task-rendering
perf/reduce-bundle-size

# Refactoring
refactor/extract-custom-hooks
refactor/simplify-state-management
```

### 3. Desarrollo

```bash
# Durante el desarrollo
git add .
git commit -m "feat: add task search functionality"

# Push frecuente para backup
git push origin feature/nombre-descriptivo
```

### 4. Antes del Pull Request

```bash
# Actualizar desde upstream
git fetch upstream
git rebase upstream/main

# Verificar que todo funcione
npm run lint
npm run build
npm run test # cuando se implementen

# Push final
git push origin feature/nombre-descriptivo --force-with-lease
```

### 5. Pull Request

- Crear PR desde tu fork al repositorio original
- Usar template de PR (ver más abajo)
- Asignar reviewers apropiados
- Vincular issues relacionados

---

## 📝 Estándares de Código

### Mensajes de Commit

Seguimos [Conventional Commits](https://www.conventionalcommits.org/):

```bash
# Formato
<type>[optional scope]: <description>

# Ejemplos
feat: add task search functionality
fix: resolve modal closing issue
docs: update component documentation
style: improve task card visual hierarchy
refactor: extract task validation logic
perf: optimize task list rendering
test: add TaskCard component tests
```

### Tipos de Commit

- **feat**: Nueva funcionalidad
- **fix**: Corrección de bugs
- **docs**: Cambios en documentación
- **style**: Cambios de estilo (formatting, CSS)
- **refactor**: Refactoring sin cambio de funcionalidad
- **perf**: Mejoras de performance
- **test**: Adición o modificación de tests
- **chore**: Tareas de mantenimiento

### Estructura de Archivos

```bash
# Al agregar nuevos archivos, seguir la estructura:
src/
├── components/
│   ├── ui/           # Componentes base reutilizables
│   ├── forms/        # Componentes de formularios
│   └── layout/       # Componentes de layout
├── hooks/            # Custom hooks
├── services/         # Servicios de API
├── utils/            # Funciones utilitarias
├── constants/        # Constantes de la app
└── types/            # Definiciones de tipos (futuro TypeScript)
```

### Nomenclatura

```javascript
// Componentes - PascalCase
const TaskCard = () => {}
const TaskModal = () => {}

// Variables y funciones - camelCase
const activeFilter = 'all'
const handleTaskEdit = () => {}

// Constantes - UPPER_SNAKE_CASE
const API_BASE_URL = 'http://localhost:8000'
const TASK_STATUS = { PENDING: '0', COMPLETED: '1' }

// Custom hooks - use + PascalCase
const useTaskManager = () => {}
const useLocalStorage = () => {}

// Archivos
ComponentName.jsx       # Componentes React
serviceName.jsx         # Servicios
useSomething.js        # Custom hooks  
utilityName.js         # Utilidades
ComponentName.test.jsx # Tests
```

### Code Style

```javascript
// ✅ Preferir arrow functions para componentes
const TaskCard = ({ task, onEdit }) => {
  return <div>{task.title}</div>
}

// ✅ Destructuring en props
const TaskCard = ({ task, onEdit, onDelete }) => {}

// ❌ Evitar props sin destructuring
const TaskCard = (props) => {
  return <div>{props.task.title}</div>
}

// ✅ Use early returns
const TaskCard = ({ task }) => {
  if (!task) return null
  
  return <div>{task.title}</div>
}

// ✅ Prefer template literals
const message = `Task "${task.title}" was updated`

// ❌ Avoid string concatenation
const message = 'Task "' + task.title + '" was updated'
```

---

## 🔍 Proceso de Review

### Checklist para PR Author

Antes de crear el PR, verificar:

- [ ] ✅ **Funcionalidad**: El feature/fix funciona como se espera
- [ ] 🎨 **UI/UX**: La interfaz es consistente con el diseño existente
- [ ] 📱 **Responsive**: Funciona en diferentes tamaños de pantalla
- [ ] ♿ **Accesibilidad**: Elementos tienen labels y alt texts apropiados
- [ ] ⚡ **Performance**: No introduce lentitud perceptible
- [ ] 🧹 **Código limpio**: Sigue los estándares del proyecto
- [ ] 📚 **Documentación**: Actualizada si es necesario
- [ ] 🧪 **Tests**: Agregados o actualizados (cuando aplique)
- [ ] 🚫 **Console logs**: Removidos antes del commit
- [ ] 🔧 **Lint**: Sin errores de ESLint

### Template de Pull Request

```markdown
## 📝 Descripción

Brief description of what this PR does.

## 🎯 Tipo de cambio

- [ ] 🐛 Bug fix (cambio que corrige un issue)
- [ ] ✨ Feature (cambio que agrega funcionalidad)
- [ ] 💥 Breaking change (fix o feature que causa que funcionalidad existente no funcione como se esperaba)
- [ ] 📚 Documentation update (cambios solo en documentación)

## 🧪 Cómo se ha probado

Describe the tests that you ran to verify your changes.

- [ ] ✅ Pruebas manuales
- [ ] 🤖 Tests automatizados
- [ ] 📱 Tests en diferentes dispositivos/navegadores

## 📷 Screenshots (si aplica)

Add screenshots to help explain your changes.

## 📋 Checklist

- [ ] Mi código sigue los estándares del proyecto
- [ ] He realizado una auto-revisión de mi código
- [ ] He comentado mi código, particularmente en áreas difíciles de entender
- [ ] He hecho los cambios correspondientes a la documentación
- [ ] Mis cambios no generan nuevas advertencias
- [ ] He agregado tests que prueban que mi fix es efectivo o que mi feature funciona
- [ ] Tests nuevos y existentes pasan localmente con mis cambios

## 📎 Issues relacionados

Closes #(issue number)
```

### Criterios de Review

Los reviewers deben verificar:

1. **Funcionalidad**
   - El código hace lo que dice que hace
   - No hay bugs evidentes
   - Edge cases están manejados

2. **Calidad de Código**
   - Sigue los estándares del proyecto
   - Código es legible y mantenible
   - No hay duplicación innecesaria

3. **Performance**
   - No introduce lentitud perceptible
   - Uso eficiente de recursos
   - Optimizaciones apropiadas

4. **Seguridad**
   - No introduce vulnerabilidades
   - Input validation apropiada
   - Manejo seguro de datos

5. **UI/UX**
   - Consistente con el diseño existente
   - Responsive en diferentes dispositivos
   - Accesible para usuarios con discapacidades

---

## 🚀 Despliegue

### Proceso de Release

1. **Merge a Main**
   ```bash
   # Después de review aprobado
   git checkout main
   git pull upstream main
   git merge --no-ff feature/nombre
   ```

2. **Tag de Versión**
   ```bash
   # Seguir semantic versioning
   git tag -a v1.2.0 -m "Release version 1.2.0"
   git push upstream --tags
   ```

3. **Deploy automático** (cuando se configure CI/CD)

### Versionado Semántico

```
MAJOR.MINOR.PATCH

MAJOR: Breaking changes
MINOR: New features (backwards compatible)
PATCH: Bug fixes (backwards compatible)

Ejemplos:
1.0.0 -> 1.0.1 (bug fix)
1.0.1 -> 1.1.0 (new feature)
1.1.0 -> 2.0.0 (breaking change)
```

---

## 🏷️ Labels para Issues y PRs

### Priority
- `priority: critical` - Requiere atención inmediata
- `priority: high` - Alta prioridad
- `priority: medium` - Prioridad media
- `priority: low` - Baja prioridad

### Type
- `type: bug` - Bug reportado
- `type: feature` - Nueva funcionalidad
- `type: enhancement` - Mejora a funcionalidad existente
- `type: documentation` - Relacionado con documentación
- `type: question` - Pregunta o clarificación

### Status
- `status: needs-review` - Necesita review
- `status: needs-testing` - Necesita testing
- `status: blocked` - Bloqueado por dependencia
- `status: in-progress` - En desarrollo activo

### Area
- `area: ui` - Interfaz de usuario
- `area: api` - Integración con API
- `area: performance` - Performance relacionado
- `area: accessibility` - Accesibilidad
- `area: mobile` - Específico para mobile

---

## 📚 Recursos Adicionales

### Documentación del Proyecto
- [README.md](./README.md) - Información general del proyecto
- [ARCHITECTURE.md](./ARCHITECTURE.md) - Arquitectura y patrones
- [COMPONENTS.md](./COMPONENTS.md) - Documentación de componentes
- [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) - Documentación de API
- [DEVELOPMENT_GUIDE.md](./DEVELOPMENT_GUIDE.md) - Guía de desarrollo

### Enlaces Útiles
- [React Documentation](https://react.dev/)
- [Vite Guide](https://vitejs.dev/guide/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [Semantic Versioning](https://semver.org/)

### Contacto

Si tienes preguntas sobre el proceso de contribución:

- **GitHub Issues**: Para preguntas técnicas
- **Discussions**: Para preguntas generales
- **Email**: [contacto del maintainer]

---

## 🙏 Agradecimientos

Gracias por contribuir al Task Manager Frontend. Tu ayuda hace que este proyecto sea mejor para todos.

### Contributors

<!-- Agregar lista de contributors cuando el proyecto crezca -->

### Reconocimientos

- React team por la excelente documentación
- Tailwind CSS por el framework de utilidades
- Vite por la herramienta de build rápida
- Comunidad open source por las mejores prácticas
