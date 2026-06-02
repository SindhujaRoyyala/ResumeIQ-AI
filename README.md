<div align="center">
  <h1 align="center">
    <br>
    <img src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=200&q=80" alt="ResumeIQ AI" width="200">
    <br>
    ResumeIQ AI
  </h1>
  <p align="center">
    <b>AI-Powered Resume Analysis and ATS Optimization Platform</b>
  </p>
  <p align="center">
    <a href="#features">Features</a> •
    <a href="#tech-stack">Tech Stack</a> •
    <a href="#installation">Installation</a> •
    <a href="#usage">Usage</a>
  </p>
</div>

---

## 📌 Features

<table>
  <tr>
    <td align="center">📄<br><b>Resume Upload</b><br>Supports PDF and DOCX formats</td>
    <td align="center">📊<br><b>ATS Scoring</b><br>Domain-specific resume scoring</td>
    <td align="center">🔍<br><b>Keyword Detection</b><br>Identifies missing job keywords</td>
  </tr>
  <tr>
    <td align="center">✨<br><b>Resume Improvement</b><br>AI-powered suggestions</td>
    <td align="center">📥<br><b>PDF Download</b><br>Export the optimized resume as PDF</td>
    <td align="center">📥<br><b>DOCX Download</b><br>Export the optimized resume as DOCX</td>
  </tr>
  <tr>
    <td align="center">🔐<br><b>Authentication</b><br>Secure sign up and login</td>
    <td align="center">📈<br><b>Dashboard Analytics</b><br>Track your progress</td>
    <td align="center">🌙<br><b>Dark Theme</b><br>Modern and elegant UI</td>
  </tr>
</table>

---

## 🛠️ Tech Stack

### Frontend
- **React** - Modern UI library
- **React Router** - Client-side routing
- **Lucide React** - Icons and UI elements
- **Axios** - HTTP client

### Backend
- **Django** - Web framework
- **Django REST Framework** - API development
- **ReportLab** - PDF generation
- **python-docx** - DOCX generation

### Database
- **SQLite** (development)
- **MySQL** (production-ready)

---

## 🚀 Installation

### Prerequisites
- Python 3.11+
- Node.js 18+
- npm

### Backend Setup

1. Open a terminal and navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   venv\Scripts\activate
   ```
3. Install backend dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Create or update your `.env` file with database settings and the Django secret key.
5. Apply database migrations:
   ```bash
   python manage.py migrate
   ```
6. Start the backend server:
   ```bash
   python manage.py runserver 8000
   ```

Backend will be available at `http://localhost:8000`

### Frontend Setup

1. Open a new terminal and navigate to the frontend folder:
   ```bash
   cd frontend
   ```
2. Install frontend dependencies:
   ```bash
   npm install
   ```
3. Start the frontend development server:
   ```bash
   npm start
   ```

Frontend will be available at `http://localhost:3000`

---

## 📁 Project Structure

```
ResumeIQ-AI/
├── backend/
│   ├── config/         # Django project configuration
│   ├── resumeiq/       # Main application
│   ├── media/          # Uploaded files storage
│   └── requirements.txt
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   ├── api.js
│   │   └── index.js
│   └── package.json
└── README.md
```

---

## 💡 Usage

1. **Sign Up or Log In** - Create an account or log in to your existing account.
2. **Upload Your Resume** - Add your PDF or DOCX resume.
3. **Add Job Description** (Optional) - Paste the job description for better matching.
4. **View Analysis** - Review your ATS score, keyword analysis, and suggestions.
5. **Generate Improved Resume** - Preview the optimized, ATS-friendly resume.
6. **Download** - Save the improved resume as PDF or DOCX.

---

## 📌 Future Enhancements

- **AI Resume Rewriter** - Complete AI-based resume rewriting
- **Cover Letter Generator** - AI-powered cover letter creation
- **Job Matching** - Match your resume to relevant jobs
- **Analytics Dashboard** - Advanced analytics and progress tracking
- **Collaboration** - Share resumes and feedback with peers

---

## 📝 License

This project is open source and available for personal and educational use.

---

<div align="center">
  Made with ❤️ using React & Django
</div>
