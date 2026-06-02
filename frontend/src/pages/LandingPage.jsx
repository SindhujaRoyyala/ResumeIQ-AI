import React, { useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Brain, FileText, Zap, Target, Sparkles, Download } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

const LandingPage = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  if (user) {
    return null;
  }

  return (
    <div className="landing-container">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <Brain size={80} color="white" style={{ marginBottom: '1.5rem' }} />
          <h1>Welcome to ResumeIQ AI</h1>
          <p className="hero-subtitle">
            AI-Powered Resume Analysis and ATS Optimization Platform
          </p>
          <div className="hero-actions">
            <Link to="/signup" className="btn-primary">
              Get Started Free
            </Link>
            <Link to="/login" className="btn-secondary">
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <h2>Powerful Features</h2>
        <p className="features-subtitle">
          Everything you need to land your dream job
        </p>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <FileText size={40} color="white" />
            </div>
            <h3>Smart Resume Analysis</h3>
            <p>
              Upload your resume and get instant feedback on formatting, content, and ATS compatibility.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <Target size={40} color="white" />
            </div>
            <h3>ATS Score Breakdown</h3>
            <p>
              See exactly how your resume performs with detailed scoring on every important aspect.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <Sparkles size={40} color="white" />
            </div>
            <h3>AI-Powered Improvements</h3>
            <p>
              Get actionable suggestions to optimize your resume and stand out to recruiters.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <Zap size={40} color="white" />
            </div>
            <h3>Optimized Resume Generator</h3>
            <p>
              Let AI rewrite your resume for maximum impact and ATS compatibility.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <Download size={40} color="white" />
            </div>
            <h3>Download in Any Format</h3>
            <p>
              Export your improved resume as PDF or DOCX with a single click.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <Brain size={40} color="white" />
            </div>
            <h3>Domain-Specific Keywords</h3>
            <p>
              Get relevant keyword suggestions based on your industry and job role.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
