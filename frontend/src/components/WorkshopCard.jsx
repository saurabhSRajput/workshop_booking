import { Calendar, MapPin, Clock, Users, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './WorkshopCard.css';

export default function WorkshopCard({ workshop, index = 0 }) {
  const navigate = useNavigate();

  const statusMap = {
    upcoming: { label: 'Upcoming', cls: 'badge-upcoming' },
    completed: { label: 'Completed', cls: 'badge-completed' },
    pending: { label: 'Pending', cls: 'badge-pending' },
    rejected: { label: 'Rejected', cls: 'badge-rejected' },
  };

  const { label, cls } = statusMap[workshop.status] || { label: workshop.status, cls: 'badge-upcoming' };
  const fillPct = Math.round((workshop.participants / workshop.maxParticipants) * 100);

  return (
    <div
      className="wcard"
      style={{ animationDelay: `${index * 0.08}s` }}
      onClick={() => navigate(`/workshop/${workshop.id}`)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && navigate(`/workshop/${workshop.id}`)}
    >
      {/* Color accent bar */}
      <div className="wcard__accent" style={{ background: workshop.color }} />

      <div className="wcard__body">
        <div className="wcard__top">
          <span className={`badge ${cls}`}>{label}</span>
          <div className="wcard__type-chip" style={{ color: workshop.color, background: `${workshop.color}18` }}>
            {workshop.type}
          </div>
        </div>

        <h3 className="wcard__title">{workshop.title}</h3>
        <p className="wcard__desc">{workshop.description}</p>

        <div className="wcard__meta">
          <div className="wcard__meta-item">
            <Calendar size={13} />
            <span>{new Date(workshop.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
          </div>
          <div className="wcard__meta-item">
            <Clock size={13} />
            <span>{workshop.duration}</span>
          </div>
          <div className="wcard__meta-item">
            <MapPin size={13} />
            <span>{workshop.location}</span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="wcard__capacity">
          <div className="wcard__cap-row">
            <span className="wcard__cap-label">
              <Users size={12} /> {workshop.participants} / {workshop.maxParticipants} Participants
            </span>
            <span className="wcard__cap-pct">{fillPct}%</span>
          </div>
          <div className="wcard__progress-bg">
            <div
              className="wcard__progress-fill"
              style={{ width: `${fillPct}%`, background: workshop.color }}
            />
          </div>
        </div>

        {/* Tags */}
        <div className="wcard__tags">
          {workshop.tags?.slice(0, 3).map((tag) => (
            <span key={tag} className="wcard__tag">{tag}</span>
          ))}
        </div>

        <div className="wcard__footer">
          <span className="wcard__instructor">{workshop.instructor}</span>
          <button className="wcard__cta">
            View Details <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
