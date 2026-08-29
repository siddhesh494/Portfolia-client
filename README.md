# Client — Portfolio AI Assistant

React + Tailwind UI for indexing a portfolio and chatting with the grounded assistant.

## Setup

```bash
cd client
cp .env.example .env
npm install
```

Ensure `.env` contains:

```env
VITE_API_BASE_URL=http://localhost:8000
```

## Run

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Build

```bash
npm run build
npm run preview
```

## UX flow

1. Modal asks for portfolio URL on first visit (or when no UUID in `sessionStorage`).
2. Submit → loading state while `POST /api/index` runs.
3. On success, UUID is stored in React state + `sessionStorage`, modal closes, chat opens.
4. Questions go to `POST /api/chat` with the stored UUID.

## Structure

```text
src/
├── components/
│   ├── PortfolioModal.jsx
│   ├── ChatWindow.jsx
│   ├── ChatMessage.jsx
│   └── LoadingState.jsx
├── hooks/
│   └── usePortfolio.js
├── services/
│   └── api.js
├── App.jsx
├── main.jsx
└── index.css
```
