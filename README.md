# ResumeIQ-AI

ResumeIQ-AI is a full-stack resume analysis application with a Django REST backend and a React frontend. The app allows users to register, login, upload resumes, and receive ATS scoring plus AI-driven resume suggestions.

## Project structure

- `backend/` — Django REST API, authentication, resume upload, and analysis logic.
- `frontend/` — React application with login, signup, and dashboard UI.
- `.env` — environment configuration for the backend.

## Requirements

- Python 3.11+ (backend)
- Node.js 18+ / npm (frontend)
- MySQL server for the Django database

## Backend setup

1. Create and activate a Python virtual environment:
   ```bash
   cd backend
   python -m venv venv
   venv\Scripts\activate
   ```
2. Install backend dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Configure `.env` with your database credentials and keys.
4. Apply migrations:
   ```bash
   python manage.py migrate
   ```
5. Start the server:
   ```bash
   python manage.py runserver 8000
   ```

The backend API will be available at `http://localhost:8000/api/`.

## Frontend setup

1. Navigate to the frontend folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the React app:
   ```bash
   npm start
   ```

The frontend will run at `http://localhost:3000/` and proxy API requests to the backend.

## API endpoints

- `POST /api/register/` — create a new user
- `POST /api/login/` — login and obtain a token
- `POST /api/logout/` — logout and delete the token
- `POST /api/upload/` — upload resume and analyze
- `GET /api/analyses/` — list user analyses
- `GET /api/analyses/<id>/` — retrieve one analysis

## Notes

- The backend uses Django Token Authentication.
- The frontend stores the token in `localStorage`.
- Ensure the backend server is running before using the frontend upload flow.
