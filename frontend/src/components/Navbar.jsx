import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Brain, User, LogOut, Upload, FileText } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <Brain className="logo-icon" size={28} />
          ResumeIQ<span className="ai-badge">AI</span>
        </Link>
        
        {user && (
          <div className="navbar-menu">
            <Link to="/dashboard" className="nav-link">
              <FileText size={18} />
              Dashboard
            </Link>
            <Link to="/upload" className="nav-link">
              <Upload size={18} />
              Upload
            </Link>
            <div className="user-dropdown">
              <div className="user-info">
                <User size={18} />
                {user.username}
              </div>
              <button onClick={logout} className="logout-btn">
                <LogOut size={16} />
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
