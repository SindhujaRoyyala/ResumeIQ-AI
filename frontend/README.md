# ResumeIQ-AI Frontend

This frontend is a React application built with Create React App. It provides authentication pages and a dashboard for uploading resumes, receiving ATS scores, and displaying AI-generated suggestions.

## Setup

1. Install dependencies:
   ```bash
   cd frontend
   npm install
   ```
2. Start the development server:
   ```bash
   npm start
   ```
3. Build for production:
   ```bash
   npm run build
   ```

## Configuration

The frontend proxies API requests to the backend using the `proxy` field in `frontend/package.json`.

The app uses these main routes:

- `/login` — login page
- `/signup` — registration page
- `/dashboard` — user dashboard for uploading resumes

## API details

The frontend expects the backend API base path to be `http://localhost:8000/api` and uses the following endpoints:

- `POST /api/register/`
- `POST /api/login/`
- `POST /api/logout/`
- `POST /api/upload/`
- `GET /api/analyses/`
- `GET /api/analyses/<id>/`

## Notes

- The dashboard uploads resume files as `file` in `FormData`.
- The backend returns `ats_score`, `matched_kw`, `missing_kw`, and `ai_suggestions`.
- The frontend stores authentication tokens in `localStorage`.
