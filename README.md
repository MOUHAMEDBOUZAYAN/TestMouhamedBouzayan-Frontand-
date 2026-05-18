# Task Management Client

A modern React frontend for a Task Management (Todo) application. The app provides authentication, protected routes, and a clean dashboard for creating, updating, deleting, and tracking tasks.

## Features

- User registration and login
- JWT authentication with `localStorage`
- Protected dashboard route
- Create, update, delete, and list tasks
- Task status management: `pending`, `in-progress`, `done`
- Global state management with Zustand
- Form validation with React Hook Form
- Axios API layer with request interceptors
- Clean responsive UI with Tailwind CSS

## Tech Stack

- React + Vite
- Tailwind CSS
- Axios
- React Router
- Zustand
- React Hook Form

## Project Structure

```text
src/
├── components/
│   ├── auth/
│   │   ├── LoginForm.jsx
│   │   └── RegisterForm.jsx
│   ├── tasks/
│   │   ├── TaskCard.jsx
│   │   ├── TaskForm.jsx
│   │   └── TaskList.jsx
│   └── ui/
│       ├── Button.jsx
│       ├── Input.jsx
│       ├── Modal.jsx
│       └── Spinner.jsx
├── hooks/
├── pages/
│   ├── DashboardPage.jsx
│   ├── LoginPage.jsx
│   └── RegisterPage.jsx
├── routes/
│   ├── AppRouter.jsx
│   ├── ProtectedRoute.jsx
│   └── PublicRoute.jsx
├── services/
│   ├── api.js
│   ├── auth.service.js
│   └── task.service.js
├── store/
│   ├── authStore.js
│   └── taskStore.js
├── utils/
│   └── helpers.js
├── App.jsx
├── index.css
└── main.jsx
```

## Getting Started

### Prerequisites

- Node.js
- npm
- Running backend API

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env` file from the example:

```bash
cp .env.example .env
```

For Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

Default frontend API configuration:

```env
VITE_API_URL=http://localhost:3000/api
```

Update this value if your backend runs on another port.

## Running the App

Start the development server:

```bash
npm run dev
```

The app will be available at:

```text
http://localhost:5173
```

## Build

Create a production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Backend Requirements

The frontend expects the backend API to expose the following endpoints:

| Method | Endpoint |
| --- | --- |
| POST | `/api/auth/register` |
| POST | `/api/auth/login` |
| POST | `/api/auth/logout` |
| GET | `/api/tasks` |
| POST | `/api/tasks` |
| PUT | `/api/tasks/:id` |
| DELETE | `/api/tasks/:id` |

Protected task routes require the following header:

```text
Authorization: Bearer <token>
```

Expected successful auth response format:

```json
{
  "success": true,
  "message": "Connexion réussie",
  "data": {
    "user": {
      "id": "user_id",
      "name": "User Name",
      "email": "user@example.com"
    },
    "token": "jwt_token"
  }
}
```

## Authentication Flow

1. User registers or logs in.
2. Backend returns a JWT token.
3. Token is stored in `localStorage`.
4. Axios automatically attaches the token to protected requests.
5. Protected routes redirect unauthenticated users to `/login`.

## Available Routes

| Route | Description |
| --- | --- |
| `/login` | Login page |
| `/register` | Register page |
| `/dashboard` | Protected task dashboard |
| `/` | Redirects based on authentication state |

## Task Statuses

Tasks support the following statuses:

- `pending`
- `in-progress`
- `done`

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |

## Notes

- The frontend runs on `http://localhost:5173` by default.
- The backend API runs separately and is configured through `VITE_API_URL`.
- Do not commit `.env` files containing local or sensitive configuration.

