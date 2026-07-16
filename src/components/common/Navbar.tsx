import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';

interface NavbarProps {
  toggleSidebar?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ toggleSidebar }) => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const isChatPage = location.pathname === '/chat';

  return (
    <nav className="navbar navbar-expand-lg navbar-custom sticky-top">
      <div className="container-fluid">
        {isChatPage && (
          <button 
            className="btn btn-sm btn-outline-custom me-2"
            onClick={toggleSidebar}
            aria-label="Toggle sidebar"
          >
            <i className="bi bi-list"></i>
          </button>
        )}
        
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <i className="bi bi-robot me-2"></i>
          API Test Hub
        </Link>
        
        <button 
          className="navbar-toggler border-0" 
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
        >
          <i className="bi bi-three-dots-vertical text-light"></i>
        </button>
        
        <div className={`collapse navbar-collapse ${menuOpen ? 'show' : ''}`}>
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link 
                className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
                to="/"
                onClick={() => setMenuOpen(false)}
              >
                <i className="bi bi-grid me-1"></i>
                Servers
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                className={`nav-link ${location.pathname === '/chat' ? 'active' : ''}`}
                to="/chat"
                onClick={() => setMenuOpen(false)}
              >
                <i className="bi bi-chat-dots me-1"></i>
                Chat
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`}
                to="/about"
                onClick={() => setMenuOpen(false)}
              >
                <i className="bi bi-info-circle me-1"></i>
                About
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
