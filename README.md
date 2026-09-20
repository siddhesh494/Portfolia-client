# Client — Business AI Assistant

React + Tailwind UI for uploading a business document and chatting with a grounded assistant.

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

1. `/try` asks for a business document (.txt / .doc / .docx).
2. Submit → loading state while `POST /api/index` runs (multipart upload).
3. On success, the app navigates to `/try/{uuid}` so the link can be shared.
4. Opening `/try/{uuid}` checks `GET /api/portfolio/{uuid}`. If the namespace was removed from Pinecone, an expired-assistant message is shown.
5. Questions go to `POST /api/chat` with the business UUID from the URL and a per-tab visitor `thread_id` for short-term conversation memory.

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
├── pages/
│   ├── LandingPage.jsx
│   └── TryItOutPage.jsx
├── services/
│   └── api.js
├── App.jsx
├── main.jsx
└── index.css
```
