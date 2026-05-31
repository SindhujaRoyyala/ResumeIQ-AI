"""
AI Service – extracts text from resume, computes ATS score,
and generates improvement suggestions via the Claude API.
"""
import os, re, json
import PyPDF2
import docx as python_docx
 
 
# ── Text Extraction ──────────────────────────────────────────────────────
 
def extract_text_from_file(file_path: str) -> str:
    """Extract plain text from a PDF or DOCX file."""
    ext = file_path.rsplit('.', 1)[-1].lower()
    if ext == 'pdf':
        return _extract_pdf(file_path)
    elif ext == 'docx':
        return _extract_docx(file_path)
    return ''
 
 
def _extract_pdf(path: str) -> str:
    text = []
    with open(path, 'rb') as f:
        reader = PyPDF2.PdfReader(f)
        for page in reader.pages:
            text.append(page.extract_text() or '')
    return '\n'.join(text)
 
 
def _extract_docx(path: str) -> str:
    doc = python_docx.Document(path)
    return '\n'.join(para.text for para in doc.paragraphs if para.text.strip())
 
 
# ── ATS Scoring ──────────────────────────────────────────────────────────
 
ATS_KEYWORDS = [
    'python','java','javascript','react','node','django','sql','mysql',
    'postgresql','mongodb','aws','azure','docker','kubernetes','git',
    'agile','scrum','rest api','graphql','machine learning','data analysis',
    'communication','teamwork','leadership','problem solving','project management',
]
 
 
def compute_ats_score(resume_text: str, job_desc: str = '') -> dict:
    text_lower = resume_text.lower()
    jd_lower   = job_desc.lower() if job_desc else ''
 
    # Keywords to check (merge ATS defaults + job-desc words)
    base_kw  = set(ATS_KEYWORDS)
    extra_kw = set(re.findall(r'\b[a-z]{4,}\b', jd_lower)) if jd_lower else set()
    all_kw   = base_kw | extra_kw
 
    matched = [kw for kw in all_kw if kw in text_lower]
    missing = [kw for kw in all_kw if kw not in text_lower]
 
    # Simple weighted score
    section_bonus  = _section_score(resume_text)
    keyword_score  = int((len(matched) / max(len(all_kw), 1)) * 70)
    total_score    = min(100, keyword_score + section_bonus)
 
    return {
        'ats_score':  total_score,
        'matched_kw': sorted(matched)[:20],
        'missing_kw': sorted(missing)[:20],
    }
 
 
def _section_score(text: str) -> int:
    """Award bonus points for having expected resume sections."""
    sections = ['experience','education','skills','projects',
                'summary','objective','certifications']
    found    = sum(1 for s in sections if s in text.lower())
    return int((found / len(sections)) * 30)
