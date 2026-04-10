import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Users, BookOpen, Award, ChevronDown, Play, Zap, Globe, Shield } from 'lucide-react';
import WorkshopCard from '../components/WorkshopCard';
import { mockWorkshops, mockStats, mockWorkshopTypes } from '../data/mockData';
import './Home.css';

export default function Home() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
    window.scrollTo(0, 0);
  }, []);

  const filters = ['all', 'upcoming', 'completed'];
  const filtered = activeFilter === 'all'
    ? mockWorkshops
    : mockWorkshops.filter(w => w.status === activeFilter);

  return (
    <main className="home">
      {/* ======== HERO ======== */}
      <section className="hero">
        <div className="hero__bg" />
        <div className="hero__overlay" />

        <div className={`hero__content container ${visible ? 'hero__content--visible' : ''}`}>
          <div className="hero__badge">
            <Zap size={13} />
            <span>FOSSEE — IIT Bombay Initiative</span>
          </div>
          <h1 className="hero__title">
            Advance Your Skills with<br />
            <span className="hero__title-accent">Open Source Workshops</span>
          </h1>
          <p className="hero__subtitle">
            Join thousands of students and educators in mastering Python, Scilab, OpenFOAM, and other powerful open-source tools — structured, hands-on, and completely free.
          </p>
          <div className="hero__cta">
            <Link to="/types" className="btn btn-primary hero__btn-main">
              Explore Workshops <ArrowRight size={18} />
            </Link>
            <Link to="/register" className="btn btn-ghost hero__btn-secondary">
              Get Started Free
            </Link>
          </div>

          {/* Stats row */}
          <div className="hero__stats">
            {[
              { label: 'Workshops Conducted', value: `${mockStats.totalWorkshops}+`, icon: <BookOpen size={18} /> },
              { label: 'Participants Trained', value: `${(mockStats.totalParticipants / 1000).toFixed(1)}K+`, icon: <Users size={18} /> },
              { label: 'Expert Instructors', value: `${mockStats.totalInstructors}+`, icon: <Star size={18} /> },
              { label: 'Satisfaction Rate', value: `${mockStats.satisfactionRate}%`, icon: <Award size={18} /> },
            ].map((stat) => (
              <div key={stat.label} className="hero__stat">
                <div className="hero__stat-icon">{stat.icon}</div>
                <div className="hero__stat-val">{stat.value}</div>
                <div className="hero__stat-label">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="hero__scroll-hint">
            <ChevronDown size={20} />
          </div>
        </div>
      </section>

      {/* ======== FEATURES ======== */}
      <section className="section features">
        <div className="container">
          <p className="section-subtitle" style={{ textAlign: 'center', margin: '0 auto 48px' }}>Why choose FOSSEE workshops?</p>
          <h2 className="section-title" style={{ textAlign: 'center', marginBottom: 8 }}>Built for Learners, by Educators</h2>
          <div className="features__grid">
            {[
              { icon: <Globe size={28} />, title: 'Open Source First', desc: 'All tools covered are free and open-source, so you keep using them after the workshop ends.' },
              { icon: <Shield size={28} />, title: 'Expert Led', desc: 'Sessions conducted by IIT faculty and research scholars with deep domain expertise.' },
              { icon: <Zap size={28} />, title: 'Hands-On Learning', desc: 'No slide-heavy lectures — every workshop is structured around practical exercises.' },
              { icon: <Award size={28} />, title: 'Recognized Certificates', desc: 'Earn certificates from IIT Bombay to recognize your skill development.' },
            ].map((f) => (
              <div key={f.title} className="feature-card">
                <div className="feature-card__icon">{f.icon}</div>
                <h3 className="feature-card__title">{f.title}</h3>
                <p className="feature-card__desc">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======== WORKSHOPS ======== */}
      <section className="section workshops-section">
        <div className="container">
          <div className="workshops-section__header">
            <div>
              <h2 className="section-title">Available Workshops</h2>
              <p className="section-subtitle" style={{ margin: 0 }}>Curated programs designed to upskill you in open-source tools</p>
            </div>
            <div className="workshops-section__filters">
              {filters.map((f) => (
                <button
                  key={f}
                  className={`filter-btn ${activeFilter === f ? 'filter-btn--active' : ''}`}
                  onClick={() => setActiveFilter(f)}
                >
                  {f.charAt(0).toUpperCase() + f.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="workshops-grid">
            {filtered.map((w, i) => (
              <WorkshopCard key={w.id} workshop={w} index={i} />
            ))}
          </div>

          <div className="workshops-section__more">
            <Link to="/types" className="btn btn-outline">
              View All Workshop Types <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ======== WORKSHOP TYPES STRIP ======== */}
      <section className="section types-strip">
        <div className="container">
          <h2 className="section-title" style={{ textAlign: 'center', marginBottom: 8 }}>Workshop Categories</h2>
          <p className="section-subtitle" style={{ textAlign: 'center', margin: '0 auto 48px' }}>Choose from a range of open-source tools and domains</p>

          <div className="types-grid">
            {mockWorkshopTypes.map((type, i) => (
              <Link to="/types" key={type.id} className="type-card" style={{ animationDelay: `${i * 0.07}s` }}>
                <div className="type-card__icon" style={{ background: `${type.color}20`, color: type.color }}>
                  <span style={{ fontSize: '1.8rem' }}>{type.icon}</span>
                </div>
                <div className="type-card__name">{type.name}</div>
                <div className="type-card__count">{type.workshops} workshops</div>
                <p className="type-card__desc">{type.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ======== CTA BANNER ======== */}
      <section className="section cta-banner-wrap">
        <div className="container">
          <div className="cta-banner">
            <div className="cta-banner__bg" />
            <div className="cta-banner__content">
              <h2 className="cta-banner__title">Ready to Conduct a Workshop?</h2>
              <p className="cta-banner__desc">
                If you're an educator or researcher with expertise in open-source tools, propose a workshop and reach thousands of eager learners.
              </p>
              <div className="cta-banner__btns">
                <Link to="/propose" className="btn btn-primary">Propose a Workshop <ArrowRight size={16} /></Link>
                <Link to="/register" className="btn btn-ghost">Register as Instructor</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
