import React, { useState, useContext } from 'react';
import { AuthContext } from './App';
import { toast } from 'react-toastify';
import api from './api';
import { Upload, FileText, CheckCircle } from 'lucide-react';

export default function Dashboard() {
  const { user } = useContext(AuthContext);
  const [file, setFile] = useState(null);
  const [jobDesc, setJobDesc] = useState('');
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const validTypes = ['application/pdf', 'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!validTypes.includes(selectedFile.type)) {
        toast.error('Please upload a PDF or Word document.');
        return;
      }
      setFile(selectedFile);
      setAnalysisResult(null);
    }
  };

  const handleAnalyze = async () => {
    if (!file) {
      toast.error('Please select a resume file first.');
      return;
    }
    setIsAnalyzing(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('job_desc', jobDesc);
      const res = await api.post('/upload/', formData);
      setAnalysisResult(res.data);
      toast.success('Resume analyzed successfully!');
    } catch (err) {
      const message = err.response?.data?.error || err.message || 'Analysis failed. Please try again.';
      toast.error(message);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const scoreLabel = analysisResult?.ats_score >= 70
    ? 'Strong fit'
    : analysisResult?.ats_score >= 40
    ? 'Moderate fit'
    : 'Needs improvement';

  const matchedCount = analysisResult?.matched_kw?.length || 0;
  const missingCount = analysisResult?.missing_kw?.length || 0;
  const keywordTotal = matchedCount + missingCount;
  const keywordSummary = keywordTotal
    ? `${matchedCount} of ${keywordTotal} key keywords matched`
    : '';

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Welcome, {user?.username}!</h1>
        <p>Upload your resume for AI-powered analysis and feedback.</p>
      </div>

      <div className="upload-section">
        <div className="upload-card">
          <div className="upload-area">
            <Upload size={48} className="upload-icon" />
            <h3>Upload Resume</h3>
            <p>Drag & drop or click to select (PDF, DOC, DOCX)</p>
            <input
              type="file"
              id="resume-upload"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
              className="file-input"
            />
            <label htmlFor="resume-upload" className="file-label">
              Choose File
            </label>
            {file && (
              <div className="file-info">
                <FileText size={16} />
                <span>{file.name}</span>
              </div>
            )}
          </div>
          <div className="job-desc-section">
            <label htmlFor="job-desc">Job Description (optional)</label>
            <textarea
              id="job-desc"
              value={jobDesc}
              onChange={(e) => setJobDesc(e.target.value)}
              placeholder="Paste the job description here..."
            />
          </div>
          <button
            className="analyze-btn"
            onClick={handleAnalyze}
            disabled={!file || isAnalyzing}
          >
            {isAnalyzing ? 'Analyzing...' : 'Analyze Resume'}
          </button>
        </div>
      </div>

      {analysisResult && (
        <div className="results-section">
          <h2>Analysis Results</h2>
          <div className="results-card">
            {analysisResult.ats_score !== undefined && (
              <div className="score-display">
                <div className="score-circle">
                  <span className="score-value">{analysisResult.ats_score}</span>
                  <span className="score-label">/ 100</span>
                </div>
                <div className="score-meta">
                  <span className="score-badge">{scoreLabel}</span>
                  {keywordSummary && <span className="score-summary">{keywordSummary}</span>}
                </div>
              </div>
            )}

            {analysisResult.matched_kw && analysisResult.matched_kw.length > 0 && (
              <div className="kw-section">
                <h3>Matched Keywords</h3>
                <div className="kw-tags">
                  {analysisResult.matched_kw.map((kw) => (
                    <span key={kw} className="tag tag-green">{kw}</span>
                  ))}
                </div>
              </div>
            )}

            {analysisResult.missing_kw && analysisResult.missing_kw.length > 0 && (
              <div className="kw-section">
                <h3>Missing Keywords</h3>
                <p className="kw-description">These keywords are not present in your resume but are important for this role.</p>
                <div className="kw-tags">
                  {analysisResult.missing_kw.map((kw) => (
                    <span key={kw} className="tag tag-red">{kw}</span>
                  ))}
                </div>
              </div>
            )}

            {analysisResult.ai_suggestions && analysisResult.ai_suggestions.length > 0 && (
              <div className="suggestions-section">
                <h3>AI Suggestions</h3>
                <p className="suggestions-summary">Focus on the top missing skills and update your resume with concrete examples.</p>
                <ul>
                  {analysisResult.ai_suggestions.map((suggestion, index) => (
                    <li key={index}>
                      <CheckCircle size={16} className="suggestion-icon" />
                      <span>{suggestion}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
