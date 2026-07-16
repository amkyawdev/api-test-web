import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';

const Navbar: React.FC = () => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar navbar-expand-lg navbar-glass sticky-top">
      <div className="container">
        <Link className="navbar-brand navbar-brand-glass" to="/">
          <i className="bi bi-robot"></i>
          API Test Hub
        </Link>
        
        <button 
          className="navbar-toggler border-0" 
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <i className="bi bi-list text-light fs-4"></i>
        </button>
        
        <div className={`collapse navbar-collapse ${menuOpen ? 'show' : ''}`}>
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link 
                className={`nav-link nav-link-glass ${location.pathname === '/' ? 'active' : ''}`}
                to="/"
              >
                <i className="bi bi-grid me-1"></i> Servers
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                className={`nav-link nav-link-glass ${location.pathname === '/chat' ? 'active' : ''}`}
                to="/chat"
              >
                <i className="bi bi-chat-dots me-1"></i> Chat
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                className={`nav-link nav-link-glass ${location.pathname === '/about' ? 'active' : ''}`}
                to="/about"
              >
                <i className="bi bi-info-circle me-1"></i> About
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
