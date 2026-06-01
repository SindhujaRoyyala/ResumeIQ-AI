# ResumeIQ-AI

ResumeIQ-AI is a polished resume intelligence web app built for modern job seekers. It combines a Django REST backend, a React frontend, and a simple ATS-style resume scanner so users can upload a resume and get actionable feedback instantly.

## Why ResumeIQ-AI?

ResumeIQ-AI helps candidates understand how their resume performs against common hiring criteria by estimating an ATS-style score and identifying keywords that are present or missing. The app also generates AI-style suggestions for improving resume content, making it easier to tailor resumes for real job descriptions.

## What makes it unique

- Upload PDF and DOCX resumes directly from the dashboard.
- Receive a clear ATS score with keyword match statistics.
- Get AI-driven content hints for missing resume keywords.
- Built as a full-stack project with a clean separation between frontend and backend.

## Project structure

- `backend/` — Django app, authentication, file uploads, analysis logic, and API endpoints.
- `frontend/` — React SPA with authentication, file upload UI, dashboard, and results display.
- `backend/db.sqlite3` — local database for development.
- `frontend/package.json` — frontend dependencies and build scripts.

## Key features

- Sign up and log in using token-based authentication.
- Upload resumes with a job description prompt.
- Track matched vs missing keywords.
- View AI suggestions for resume improvement.
- Responsive dashboard for quick feedback.

## Requirements

- Python 3.11+ for backend
- Node.js 18+ / npm for frontend
- Optional: MySQL if you want to switch from the local SQLite dev database

## Backend setup

1. Create and activate a virtual environment:
   ```bash
   cd backend
   python -m venv venv
   venv\Scripts\activate
   ```
2. Install backend dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Configure `.env` with your database settings and secret key.
4. Apply migrations:
   ```bash
   python manage.py migrate
   ```
5. Run the backend API server:
   ```bash
   python manage.py runserver 
   ```

Backend API base URL: `http://localhost:8000/api/`

## Frontend setup

1. Install frontend dependencies:
   ```bash
   cd frontend
   npm install
   ```
2. Start the development server:
   ```bash
   npm start
   ```

Frontend URL: `http://localhost:3000/`

## API endpoints

- `POST /api/register/` — user registration
- `POST /api/login/` — user login and token issuance
- `POST /api/logout/` — logout and revoke token
- `POST /api/upload/` — upload resume file and job description
- `GET /api/analyses/` — list resume analysis results
- `GET /api/analyses/<id>/` — detailed analysis record

## How to use

1. Start the backend server.
2. Start the frontend app.
3. Register a new account or log in.
4. Open the dashboard and upload a PDF or DOCX resume.
5. Optionally paste a job description to improve keyword matching.
6. Review the score, matched keywords, missing keywords, and AI suggestions.

## Notes

- The backend uses Django Token Authentication and stores user tokens in the frontend's `localStorage`.
- Resume parsing currently supports `pdf` and `docx` files.
- Suggestions are generated from missing keyword detection and resume structure analysis.

## Future ideas

- add personalized resume rewrite suggestions
- support more file formats such as plain text and RTF
- add analytics history for past uploads
- connect a real AI service for deeper resume insights

## License

This project is available for exploration and improvement. Use it to learn, customize, and extend resume analysis capabilities.
