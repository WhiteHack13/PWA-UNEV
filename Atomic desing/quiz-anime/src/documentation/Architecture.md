# Estructura de carpetas sugerida: 
### Arquitectura por capas (Layered Frontend Architecture)
src/  
│
├── assets/  
├── data/  
│   └── questions.js  
│
├── context/  
│   ├── AuthContext.jsx  
│   └── QuizContext.jsx  
│
├── pages/  
│   ├── Login.jsx  
│   ├── Register.jsx  
│   ├── Home.jsx  
│   ├── Quiz.jsx  
│   └── Results.jsx  
│  
├── components/  
│   ├── Navbar.jsx  
│   ├── ProtectedRoute.jsx  
│   ├── QuestionCard.jsx  
│   └── CategoryCard.jsx  
│
├── App.jsx  
└── main.jsx  


---

# Descripción Arquitectónica

Este proyecto sigue una arquitectura basada en componentes con separación por responsabilidades. La aplicación está organizada en capas claras: presentación, estado y datos.

---

# 1. Carpeta `assets/`

Contiene recursos estáticos utilizados por la interfaz.

Ejemplos:
- Imágenes
- Íconos
- Ilustraciones
- Logos

Responsabilidad:
Proveer recursos visuales. No contiene lógica ni estado.

---

# 2. Carpeta `data/`

Contiene datos simulados que reemplazan temporalmente un backend.

Archivo principal:
- `questions.js` → banco de preguntas del quiz.

Responsabilidad:
Simular persistencia y fuente de datos. Puede reemplazarse posteriormente por llamadas a una API REST o GraphQL sin modificar la estructura de la aplicación.

---

# 3. Carpeta `context/`

Implementa el manejo de estado global usando React Context.

## AuthContext.jsx

Responsabilidad:
- Gestión de sesión
- Login
- Registro
- Logout
- Usuario autenticado

Equivalente conceptual:
Controlador de autenticación en un sistema backend.

---

## QuizContext.jsx

Responsabilidad:
- Estado del examen activo
- Preguntas seleccionadas
- Respuestas del usuario
- Puntaje acumulado

Equivalente conceptual:
Controlador del dominio del quiz.

---

# 4. Carpeta `pages/`

Contiene las pantallas completas que representan rutas.

Archivos:

- `Login.jsx` → Pantalla de inicio de sesión
- `Register.jsx` → Pantalla de registro
- `Home.jsx` → Selección de categorías
- `Quiz.jsx` → Vista del examen
- `Results.jsx` → Resultados y estadísticas

Responsabilidad:
Composición de la interfaz principal. Aquí se integran componentes reutilizables y estado global.

Cada archivo en esta carpeta corresponde a una ruta declarada en `App.jsx`.

---

# 5. Carpeta `components/`

Contiene componentes reutilizables.

Archivos:

- `Navbar.jsx` → Barra de navegación
- `ProtectedRoute.jsx` → Control de acceso por autenticación
- `QuestionCard.jsx` → Componente visual de pregunta
- `CategoryCard.jsx` → Tarjeta de selección de categoría

Responsabilidad:
Componentes desacoplados reutilizables que encapsulan comportamiento visual y lógica mínima.

---

# 6. Archivo `App.jsx`

Responsabilidad:
- Configuración del sistema de rutas
- Integración de los proveedores globales
- Protección de rutas privadas

Estructura general:

AuthProvider  
└── QuizProvider  
└── BrowserRouter  
└── Routes  

Actúa como punto de orquestación lógica de la aplicación.

---

# 7. Archivo `main.jsx`

Responsabilidad:
Punto de entrada técnico de React.

Funciones principales:
- Crear el root del DOM
- Renderizar la aplicación
- Envolver en `React.StrictMode`

No contiene lógica de negocio.

---

# Flujo Arquitectónico
main.jsx  
↓  
App.jsx  
↓  
Context Providers  
↓  
Pages  
↓  
Components  
↓  
Data  


---

# Clasificación Arquitectónica

Esta estructura corresponde a una arquitectura:

- Basada en componentes
- Separada por capas
- Orientada a SPA (Single Page Application)

No es MVC tradicional. Se aproxima más a:

- Arquitectura por capas
- Arquitectura modular frontend
- Component-based architecture

---

# Separación de Responsabilidades

| Capa | Carpeta | Responsabilidad |
|------|----------|----------------|
| Presentación | pages / components | Interfaz y renderizado |
| Estado | context | Lógica y control de estado |
| Datos | data | Fuente de información |
| Infraestructura | App / main | Enrutamiento y arranque |

---

# Evolución Profesional Posible

Escalamiento hacia arquitectura modular por feature:

src/  
├── features/  
│ ├── auth/  
│ ├── quiz/  
│ ├── results/  
├── shared/  
│ ├── components/  
│ ├── utils/  
│ ├── services/  


Esto permitiría:

- Mayor mantenibilidad
- Mejor escalabilidad
- Separación por dominio
- Integración sencilla de backend

---

La estructura implementada:

- Está correctamente separada por responsabilidades
- Permite integrar backend sin reestructuración profunda
- Sigue principios de desacoplamiento
- Es adecuada para proyectos académicos y profesionales

Representa una arquitectura moderna de frontend basada en componentes y gestión de estado centralizada.