# iMath 😇😇

iMath is a web application for practicing and improving mathematical skills through interactive challenges and progressive levels.

## Live Demo

**Try iMath:** https://imath-lime.vercel.app

## Features

- 🧮 Interactive math challenges
- 🎯 Multiple difficulty levels
- ⏱️ Timed challenges
- 📈 Career progression system
- 🏆 Level and stage progression
- 📝 Review completed challenges
- 📱 Responsive design for desktop and mobile

## 🛠️ Tech Stack

### Frontend

- React
- Vite
- Tailwind CSS
- Axios

### Backend

- FastAPI
- SQLAlchemy
- PostgreSQL
- Neon
- uv

## 📁 Project Structure

```text
imath/
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── ...
│
├── backend/
│   ├── ...
│   ├── pyproject.toml
│   └── ...
│
├── README.md
└── .gitignore
```

## 💻 Running Locally

### 1. Run the Frontend

```bash
cd frontend
npm install
npm run dev
```

### 2. Run the Backend

Open a new terminal and navigate to the backend:

```bash
cd backend
```

Sync the backend dependencies:

```bash
uv sync
```

Start the FastAPI development server:

```bash
uv run fastapi dev
```

## 📌 About

iMath was built to provide a simple and interactive way to practice mathematics while tracking progress through different levels and stages.

The application consists of a React frontend and a FastAPI backend. The backend handles application logic, authentication, challenges, user progression, and database operations.

The production database is hosted using Neon PostgreSQL.
