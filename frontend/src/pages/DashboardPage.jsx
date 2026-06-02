import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FileText, Calendar, TrendingUp, Upload } from 'lucide-react';
import api from '../api';

const DashboardPage = () => {
  const [analyses, setAnalyses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalyses();
  }, []);

  const fetchAnalyses = async () => {
    try {
      const response = await api.get('/api/analyses/');
      setAnalyses(response.data);
    } catch (error) {
      console.error('Error fetching analyses:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div>
          <h1>Your Dashboard</h1>
          <p>View your resume analyses and track your progress</p>
        </div>
        <Link to="/upload" className="btn-upload">
          <Upload size={20} />
          Upload New Resume
        </Link>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon blue">
            <FileText size={24} />
          </div>
          <div>
            <div className="stat-value">{analyses.length}</div>
            <div className="stat-label">Total Analyses</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon green">
            <TrendingUp size={24} />
          </div>
          <div>
            <div className="stat-value">
              {analyses.length > 0
                ? Math.round(analyses.reduce((acc, a) => acc + (a.ats_score || 0), 0) / analyses.length)
                : 0}
            </div>
            <div className="stat-label">Avg ATS Score</div>
          </div>
        </div>
      </div>

      <div className="recent-analyses">
        <h2>Recent Analyses</h2>
        {loading ? (
          <div className="loading">Loading...</div>
        ) : analyses.length === 0 ? (
          <div className="empty-state">
            <FileText size={64} style={{ color: '#cbd5e1' }} />
            <h3>No resumes analyzed yet</h3>
            <p>Upload your first resume to get started</p>
            <Link to="/upload" className="btn-primary">
              Upload Resume
            </Link>
          </div>
        ) : (
          <div className="analyses-list">
            {analyses.map((analysis) => (
              <Link
                key={analysis.id}
                to={`/results/${analysis.id}`}
                className="analysis-card"
              >
                <div className="analysis-header">
                  <div className="analysis-icon">
                    <FileText size={24} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div className="analysis-filename">{analysis.filename}</div>
                    <div className="analysis-date">
                      <Calendar size={14} />
                      {new Date(analysis.created_at).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="score-badge">
                    <span>{analysis.ats_score || 0}</span>/100
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
