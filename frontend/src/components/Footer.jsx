import { BookOpen, Mail, Github, Twitter, Linkedin, Heart } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__grid container">
        {/* Brand */}
        <div className="footer__brand">
          <div className="footer__logo-wrap">
            <div className="footer__logo">
              <BookOpen size={20} />
            </div>
            <div>
              <div className="footer__brand-name">FOSSEE Workshops</div>
              <div className="footer__brand-tagline">IIT Bombay</div>
            </div>
          </div>
          <p className="footer__desc">
            Free and Open Source Software for Education — empowering students and educators with open-source software workshops.
          </p>
          <div className="footer__socials">
            <a href="#" className="footer__social" aria-label="GitHub"><Github size={16} /></a>
            <a href="#" className="footer__social" aria-label="Twitter"><Twitter size={16} /></a>
            <a href="#" className="footer__social" aria-label="LinkedIn"><Linkedin size={16} /></a>
            <a href="mailto:contact@fossee.in" className="footer__social" aria-label="Email"><Mail size={16} /></a>
          </div>
        </div>

        {/* Links */}
        <div className="footer__col">
          <h4 className="footer__col-title">Navigation</h4>
          <ul className="footer__links">
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/types">Workshop Types</NavLink></li>
            <li><NavLink to="/dashboard">Dashboard</NavLink></li>
            <li><NavLink to="/propose">Propose Workshop</NavLink></li>
          </ul>
        </div>

        <div className="footer__col">
          <h4 className="footer__col-title">Account</h4>
          <ul className="footer__links">
            <li><NavLink to="/login">Login</NavLink></li>
            <li><NavLink to="/register">Register</NavLink></li>
            <li><NavLink to="/profile">Profile</NavLink></li>
          </ul>
        </div>

        <div className="footer__col">
          <h4 className="footer__col-title">Resources</h4>
          <ul className="footer__links">
            <li><a href="https://fossee.in" target="_blank" rel="noreferrer">FOSSEE Website</a></li>
            <li><a href="https://spoken-tutorial.org" target="_blank" rel="noreferrer">Spoken Tutorials</a></li>
            <li><a href="https://www.iitb.ac.in" target="_blank" rel="noreferrer">IIT Bombay</a></li>
          </ul>
        </div>
      </div>

      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <span className="footer__copy">© 2026 FOSSEE, IIT Bombay. All rights reserved.</span>
          <span className="footer__credit">
            Made with <Heart size={12} fill="currentColor" /> by the FOSSEE Team
          </span>
        </div>
      </div>
    </footer>
  );
}
