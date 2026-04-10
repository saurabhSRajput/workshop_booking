import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, ArrowRight, BookOpen, Users } from 'lucide-react';
import WorkshopCard from '../components/WorkshopCard';
import { mockWorkshops, mockWorkshopTypes } from '../data/mockData';
import './WorkshopTypes.css';

export default function WorkshopTypes() {
  const [activeType, setActiveType] = useState('all');
  const [search, setSearch] = useState('');

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const filtered = mockWorkshops.filter((w) => {
    const matchType = activeType === 'all' || w.type === activeType;
    const matchSearch = w.title.toLowerCase().includes(search.toLowerCase()) ||
      w.description.toLowerCase().includes(search.toLowerCase());
    return matchType && matchSearch;
  });

  return (
    <main className="wt-page">
      {/* Page hero */}
      <section className="wt-hero">
        <div className="wt-hero__bg" />
        <div className="wt-hero__overlay" />
        <div className="container wt-hero__content">
          <p className="wt-hero__eyebrow">
            <BookOpen size={14} /> Workshop Catalogue
          </p>
          <h1 className="wt-hero__title">All Workshop Types</h1>
          <p className="wt-hero__sub">Choose from {mockWorkshops.length}+ hands-on workshops led by IIT Bombay experts</p>

          {/* Search bar */}
          <div className="wt-search">
            <Search size={18} className="wt-search__icon" />
            <input
              type="text"
              placeholder="Search workshops..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="wt-search__input"
              aria-label="Search workshops"
            />
          </div>
        </div>
      </section>

      <div className="container">
        {/* Type filter pills */}
        <div className="wt-type-pills">
          <button
            className={`wt-pill ${activeType === 'all' ? 'wt-pill--active' : ''}`}
            onClick={() => setActiveType('all')}
          >
            All Types
          </button>
          {mockWorkshopTypes.map((t) => (
            <button
              key={t.id}
              className={`wt-pill ${activeType === t.name ? 'wt-pill--active' : ''}`}
              style={activeType === t.name ? { borderColor: t.color, color: t.color, background: `${t.color}15` } : {}}
              onClick={() => setActiveType(t.name)}
            >
              <span>{t.icon}</span> {t.name}
            </button>
          ))}
        </div>

        {/* Type cards overview */}
        {activeType === 'all' && search === '' && (
          <div className="wt-types-grid">
            {mockWorkshopTypes.map((type) => (
              <div
                key={type.id}
                className="wt-type-hero-card"
                onClick={() => setActiveType(type.name)}
                style={{ '--tcolor': type.color }}
              >
                <div className="wt-type-hero-card__icon-wrap" style={{ background: `${type.color}18`, color: type.color }}>
                  <span style={{ fontSize: '2rem' }}>{type.icon}</span>
                </div>
                <div className="wt-type-hero-card__body">
                  <h3 className="wt-type-hero-card__name">{type.name}</h3>
                  <p className="wt-type-hero-card__desc">{type.description}</p>
                  <div className="wt-type-hero-card__meta">
                    <span className="wt-type-hero-card__count">
                      <BookOpen size={13} /> {type.workshops} workshops
                    </span>
                    <span className="wt-type-hero-card__link">
                      Browse <ArrowRight size={13} />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Results count */}
        <div className="wt-results-bar">
          <span className="wt-results-count">{filtered.length} workshop{filtered.length !== 1 ? 's' : ''} found</span>
          {(activeType !== 'all' || search) && (
            <button className="wt-clear" onClick={() => { setActiveType('all'); setSearch(''); }}>
              Clear filters
            </button>
          )}
        </div>

        {/* Workshops grid */}
        {filtered.length > 0 ? (
          <div className="wt-workshops-grid">
            {filtered.map((w, i) => (
              <WorkshopCard key={w.id} workshop={w} index={i} />
            ))}
          </div>
        ) : (
          <div className="wt-empty">
            <span style={{ fontSize: '3rem' }}>🔍</span>
            <h3>No workshops found</h3>
            <p>Try adjusting your search or filter.</p>
          </div>
        )}

        {/* Propose CTA */}
        <div className="wt-propose-cta">
          <h3>Don't see what you're looking for?</h3>
          <p>Instructors can propose new workshops for any open-source tool they're passionate about.</p>
          <Link to="/propose" className="btn btn-primary">
            Propose a Workshop <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </main>
  );
}
