import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { BookOpen, LayoutDashboard, List, User, LogIn, Menu, X, ChevronDown, Bell, Search } from 'lucide-react';
import './Navbar.css';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();
  const isLoggedIn = true; // mock state

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navbar__inner container">
        {/* Logo */}
        <NavLink to="/" className="navbar__brand">
          <div className="navbar__logo">
            <BookOpen size={22} />
          </div>
          <div className="navbar__brand-text">
            <span className="navbar__brand-main">FOSSEE</span>
            <span className="navbar__brand-sub">Workshops</span>
          </div>
        </NavLink>

        {/* Desktop nav links */}
        <ul className="navbar__links">
          <li>
            <NavLink to="/" className={({ isActive }) => `navbar__link ${isActive ? 'navbar__link--active' : ''}`} end>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/types" className={({ isActive }) => `navbar__link ${isActive ? 'navbar__link--active' : ''}`}>
              Workshop Types
            </NavLink>
          </li>
          {isLoggedIn && (
            <li>
              <NavLink to="/dashboard" className={({ isActive }) => `navbar__link ${isActive ? 'navbar__link--active' : ''}`}>
                Dashboard
              </NavLink>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <NavLink to="/propose" className={({ isActive }) => `navbar__link ${isActive ? 'navbar__link--active' : ''}`}>
                Propose Workshop
              </NavLink>
            </li>
          )}
        </ul>

        {/* Right section */}
        <div className="navbar__actions">
          {isLoggedIn ? (
            <>
              <button className="navbar__icon-btn" aria-label="Notifications">
                <Bell size={18} />
                <span className="navbar__notif-dot" />
              </button>
              <div className="navbar__user" onClick={() => setDropdownOpen(!dropdownOpen)}>
                <div className="navbar__avatar">AD</div>
                <span className="navbar__user-name hide-mobile">Avani Dewan</span>
                <ChevronDown size={14} className={`navbar__chevron ${dropdownOpen ? 'navbar__chevron--open' : ''}`} />
                {dropdownOpen && (
                  <div className="navbar__dropdown">
                    <NavLink to="/profile" className="navbar__dropdown-item">
                      <User size={14} /> Profile
                    </NavLink>
                    <NavLink to="/login" className="navbar__dropdown-item navbar__dropdown-item--danger">
                      <LogIn size={14} /> Logout
                    </NavLink>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <NavLink to="/login" className="btn btn-ghost" style={{ padding: '8px 18px', fontSize: '0.875rem' }}>Login</NavLink>
              <NavLink to="/register" className="btn btn-primary" style={{ padding: '8px 18px', fontSize: '0.875rem' }}>Register</NavLink>
            </>
          )}

          {/* Hamburger */}
          <button className="navbar__hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="navbar__mobile-menu">
          <NavLink to="/" className="navbar__mobile-link" end>Home</NavLink>
          <NavLink to="/types" className="navbar__mobile-link">Workshop Types</NavLink>
          {isLoggedIn && <NavLink to="/dashboard" className="navbar__mobile-link">Dashboard</NavLink>}
          {isLoggedIn && <NavLink to="/propose" className="navbar__mobile-link">Propose Workshop</NavLink>}
          {isLoggedIn && <NavLink to="/profile" className="navbar__mobile-link">Profile</NavLink>}
          <div className="navbar__mobile-divider" />
          {isLoggedIn
            ? <NavLink to="/login" className="navbar__mobile-link navbar__mobile-link--danger">Logout</NavLink>
            : <>
                <NavLink to="/login" className="navbar__mobile-link">Login</NavLink>
                <NavLink to="/register" className="btn btn-primary" style={{ margin: '8px 0', justifyContent: 'center' }}>Register</NavLink>
              </>
          }
        </div>
      )}
    </nav>
  );
}
