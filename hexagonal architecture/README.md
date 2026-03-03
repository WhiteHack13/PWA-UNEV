# Anime Quiz Backend (Node.js + PostgreSQL + Hexagonal)

## Ejecutar
1) npm install
2) Copiar .env.example a .env y completar valores
3) npm run dev

## Endpoints
- POST /api/auth/register
- POST /api/auth/login
- POST /api/auth/refresh
- POST /api/auth/logout
- GET  /api/me
- GET  /api/auth/oauth/:provider/start
- GET  /api/auth/oauth/:provider/callback
- GET  /api/categorias
- GET  /api/preguntas?slug=...&limite=15
- POST /api/intentos
- GET  /api/intentos/historial
