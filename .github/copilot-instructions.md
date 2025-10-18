# Copilot Instructions for senhasfront

## Project Overview
- **Stack:** React 19 + TypeScript + Vite (see `vite.config.ts`)
- **Purpose:** Frontend for a password/queue management system ("senhas").
- **Key Features:**
  - Authentication context with role-based logic (`src/auth/AuthContext.tsx`)
  - API integration via Axios (`src/api/apiConfig.ts`)
  - Type-safe domain models (`src/types/Senha.ts`)
  - React Router for navigation
  - Bootstrap for UI styling

## Architecture & Patterns
- **App Entry:** `src/main.tsx` wraps the app in `AuthProvider` and `BrowserRouter`.
- **Auth:**
  - Use `useAuth()` hook for authentication state and actions.
  - Roles are inferred from email ("atendente" or "paciente").
- **API:**
  - Use the default Axios instance from `src/api/apiConfig.ts` for all HTTP requests.
  - API base URL is `http://localhost:8080` (change as needed).
- **Types:**
  - All domain types (e.g., `SenhaAtendimento`) are defined in `src/types/`.
- **Component Structure:**
  - Pages/components go in `src/pages/` and `src/components/`.
  - Assets in `src/assets/`.

## Developer Workflows
- **Start Dev Server:**
  - `npm run dev` (Vite, hot reload enabled)
- **Build:**
  - `npm run build` (TypeScript build + Vite production build)
- **Preview Production Build:**
  - `npm run preview`
- **Lint:**
  - `npm run lint` (uses ESLint with TypeScript, React, and Vite plugins)

## Conventions & Tips
- **TypeScript strict mode** is enabled; fix all type errors before commit.
- **No persistent auth:** Auth state is in-memory only (not persisted across reloads).
- **Role logic:** To add new roles, update `decodeRoleFromEmail` in `AuthContext.tsx`.
- **API calls:** Always use the shared Axios instance for consistent headers/base URL.
- **Styling:** Use Bootstrap classes and/or custom CSS in `src/App.css` and `src/index.css`.
- **Routing:** All navigation should use React Router (`react-router-dom`).

## Key Files
- `src/main.tsx`: App bootstrap, provider setup
- `src/auth/AuthContext.tsx`: Auth logic, context, and hooks
- `src/api/apiConfig.ts`: Axios config for backend API
- `src/types/Senha.ts`: Domain types for queue/passwords
- `vite.config.ts`, `tsconfig.*.json`: Build and tooling config

---

For questions about project-specific patterns, see the above files for examples. If unsure about a workflow or convention, ask for clarification or check the README.
