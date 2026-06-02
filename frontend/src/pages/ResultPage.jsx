import React, { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { ArrowLeft, Download, CheckCircle2, AlertCircle, TrendingUp, Target } from 'lucide-react'
import api from '../api'
import { toast } from 'react-toastify'


function ResultPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [analysis, setAnalysis] = useState(null)
  const [loading, setLoading] = useState(true)
  const [downloadingPDF, setDownloadingPDF] = useState(false)
  const [downloadingDOCX, setDownloadingDOCX] = useState(false)


  useEffect(() => {
    async function fetchAnalysis() {
      try {
        const res = await api.get(`/api/analyses/${id}/`)
        setAnalysis(res.data)
      } catch (err) {
        toast.error('Failed to load analysis')
      } finally {
        setLoading(false)
      }
    }
    fetchAnalysis()
  }, [id])


  async function handleDownloadPDF() {
    setDownloadingPDF(true)
    try {
      const res = await api.get(`/api/analyses/${id}/download/pdf/`, { responseType: 'blob' })
      const url = window.URL.createObjectURL(new Blob([res.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', 'improved-resume.pdf')
      document.body.appendChild(link)
      link.click()
      link.remove()
      toast.success('PDF downloaded!')
    } catch (err) {
      toast.error('Failed to download PDF')
    } finally {
      setDownloadingPDF(false)
    }
  }


  async function handleDownloadDOCX() {
    setDownloadingDOCX(true)
    try {
      const res = await api.get(`/api/analyses/${id}/download/docx/`, { responseType: 'blob' })
      const url = window.URL.createObjectURL(new Blob([res.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', 'improved-resume.docx')
      document.body.appendChild(link)
      link.click()
      link.remove()
      toast.success('DOCX downloaded!')
    } catch (err) {
      toast.error('Failed to download DOCX')
    } finally {
      setDownloadingDOCX(false)
    }
  }


  if (loading) return <div className="loading">Loading analysis...</div>


  return (
    <div className="results-section">
      <button className="back-btn" onClick={() => navigate('/dashboard')}>
        <ArrowLeft size={20} /> Back to Dashboard
      </button>


      {/* Score Card */}
      <div className="results-card score-card">
        <div className="score-display">
          <div className="score-circle">
            <div className="score-value">{analysis?.ats_score || 0}</div>
            <div className="score-label">ATS Score</div>
          </div>
          <div className="score-meta">
            <div className="score-badge">
              <TrendingUp size={20} /> Analysis Complete
            </div>
            <div className="score-summary">
              Comprehensive ATS evaluation with domain-specific insights
            </div>
          </div>
        </div>
        <div className="score-breakdown">
          <h3>Score Breakdown</h3>
          <div className="breakdown-grid">
            {Object.entries(analysis?.score_breakdown || {}).map(([k, v]) => (
              <div key={k} className="breakdown-item">
                <div className="breakdown-header">
                  <span>{k}</span>
                  <span>{v}</span>
                </div>
                <div className="breakdown-bar">
                  <div
                    className="breakdown-fill"
                    style={{ width: `${v}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>


      {/* Strengths */}
      <div className="results-card">
        <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '1.5rem', fontWeight: '800', marginBottom: '1rem' }}>
          <CheckCircle2 style={{ color: 'var(--success)' }} />
          Strengths
        </h3>
        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {(analysis?.strengths || []).map((s, i) => (
            <li key={i} style={{
              padding: '1.25rem',
              background: 'rgba(16,185,129,0.1)',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid rgba(16,185,129,0.3)'
            }}>
              <CheckCircle2 style={{ color: 'var(--success)', float: 'left', marginRight: '1rem', marginTop: '0.1rem' }} />
              {s}
            </li>
          ))}
        </ul>
      </div>


      {/* Weaknesses */}
      <div className="results-card">
        <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '1.5rem', fontWeight: '800', marginBottom: '1rem' }}>
          <AlertCircle style={{ color: 'var(--warning)' }} />
          Areas for Improvement
        </h3>
        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {(analysis?.weaknesses || []).map((w, i) => (
            <li key={i} style={{
              padding: '1.25rem',
              background: 'rgba(245,158,11,0.1)',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid rgba(245,158,11,0.3)'
            }}>
              <AlertCircle style={{ color: 'var(--warning)', float: 'left', marginRight: '1rem', marginTop: '0.1rem' }} />
              {w}
            </li>
          ))}
        </ul>
      </div>


      {/* Missing Keywords */}
      <div className="results-card">
        <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '1.5rem', fontWeight: '800', marginBottom: '1rem' }}>
          <Target style={{ color: 'var(--accent-primary)' }} />
          Missing ATS Keywords
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {(analysis?.missing_kw || []).map((kw, i) => (
            <div key={i} style={{
              padding: '1.25rem',
              background: 'var(--card-secondary)',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--border-color)'
            }}>
              <h4 style={{
                fontSize: '1.1rem', fontWeight: '800', marginBottom: '0.5rem',
                background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text'
              }}>
                {kw.keyword}
              </h4>
              <p style={{ color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                <strong>Why it matters:</strong> {kw.why_it_matters}
              </p>
              <p style={{ color: 'var(--text-secondary)' }}>
                <strong>Example bullet:</strong> {kw.example_bullet}
              </p>
            </div>
          ))}
        </div>
      </div>


      {/* AI Suggestions */}
      <div className="results-card suggestions-section">
        <h3>
          <Target size={24} />
          Improvement Suggestions
        </h3>
        <ul>
          {(analysis?.ai_suggestions || []).map((s, i) => (
            <li key={i}>
              <Target size={20} className="suggestion-icon" />
              {s}
            </li>
          ))}
        </ul>
      </div>


      {/* Improved Resume */}
      <div className="results-card improve-section">
        <div className="improve-header">
          <h3>
            <Download size={24} />
            Improved Resume
          </h3>
          <div className="improved-actions">
            <button
              className="btn-primary"
              onClick={handleDownloadPDF}
              disabled={downloadingPDF}
              style={{ fontSize: '0.9rem', padding: '0.6rem 1.2rem' }}
            >
              {downloadingPDF ? 'Downloading...' : 'Download PDF'}
            </button>
            <button
              className="btn-secondary"
              onClick={handleDownloadDOCX}
              disabled={downloadingDOCX}
              style={{ fontSize: '0.9rem', padding: '0.6rem 1.2rem' }}
            >
              {downloadingDOCX ? 'Downloading...' : 'Download DOCX'}
            </button>
          </div>
        </div>
        <div className="improved-resume">
          <div className="resume-content">
            {analysis?.improved_resume || 'Generating improved resume...'}
          </div>
        </div>
      </div>
    </div>
  )
}


export default ResultPage
