# FAQAI - Frontend

React + Vite frontend for the FAQAI chatbot.

This folder contains the UI for asking questions and viewing chatbot replies. The frontend connects to the backend API using the URL configured in `frontend/.env`.

Full project documentation, backend setup, and deployment notes are available in the [root README](../README.md).

## Quick start

```bash
npm install
cp .env.example .env
npm run dev
```

For Windows PowerShell:

```powershell
npm install
Copy-Item .env.example .env
npm run dev
```

The app runs at `http://localhost:5173` by default.

## Environment

Copy `frontend/.env.example` to `frontend/.env` and set:

```bash
VITE_API_BASE_URL=http://127.0.0.1:8001
```

Update the URL if your backend is running on a different host or port.

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the Vite development server |
| `npm run build` | Create a production build in `dist/` |
| `npm run preview` | Preview the production build locally |
