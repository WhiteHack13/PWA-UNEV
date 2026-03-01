# Anime Quiz Pro (Frontend only)

React 19 + Vite + Tailwind. No backend. Everything uses local JSON + localStorage.

## Run
```bash
npm install
npm run dev
```

## What’s included
- Login / Register (localStorage users)
- Home (category picker)
- Quiz (15 random questions, single-choice, progress)
- Results (charts + history per user in localStorage)
- Ready for backend integration later (Auth + Results + Questions services are isolated)

## Backend-ready notes
- Replace `src/services/authService.js` with API calls
- Replace `src/services/questionsService.js` with API calls
- Replace `src/services/resultsService.js` with API calls
