import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Users, CheckCircle, XCircle, Clock, ArrowRight, TrendingUp, BookOpen, Activity } from 'lucide-react';
import { mockDashboardWorkshops, mockStats, mockUser } from '../data/mockData';
import './Dashboard.css';

export default function Dashboard() {
  const userName = localStorage.getItem('mockUserName') || 'User';
  const initials = userName.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() || 'U';

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const statusIcon = {
    upcoming: <CheckCircle size={14} />,
    completed: <CheckCircle size={14} />,
    pending: <Clock size={14} />,
    rejected: <XCircle size={14} />,
  };

  const statusCls = {
    upcoming: 'badge-upcoming',
    completed: 'badge-completed',
    pending: 'badge-pending',
    rejected: 'badge-rejected',
  };

  return (
    <main className="dash">
      <div className="container">
        {/* Header */}
        <div className="dash__header">
          <div>
            <h1 className="dash__title">Dashboard</h1>
            <p className="dash__sub">Welcome back, {userName} 👋</p>
          </div>
          <div className="dash__header-actions">
            <Link to="/propose" className="btn btn-primary">
              + Propose Workshop
            </Link>
          </div>
        </div>

        {/* Stat cards */}
        <div className="dash__stats">
          {[
            { label: 'Total Workshops', value: mockStats.totalWorkshops, icon: <BookOpen size={22} />, color: '#4f8ef7', delta: '+12% this month' },
            { label: 'Total Participants', value: `${(mockStats.totalParticipants / 1000).toFixed(1)}K`, icon: <Users size={22} />, color: '#10b981', delta: '+8% this month' },
            { label: 'Instructors', value: mockStats.totalInstructors, icon: <Activity size={22} />, color: '#7c3aed', delta: '+5 new' },
            { label: 'Satisfaction Rate', value: `${mockStats.satisfactionRate}%`, icon: <TrendingUp size={22} />, color: '#f59e0b', delta: '+2% this quarter' },
          ].map((s) => (
            <div key={s.label} className="dash__stat-card">
              <div className="dash__stat-icon" style={{ background: `${s.color}18`, color: s.color }}>
                {s.icon}
              </div>
              <div className="dash__stat-body">
                <div className="dash__stat-value">{s.value}</div>
                <div className="dash__stat-label">{s.label}</div>
                <div className="dash__stat-delta" style={{ color: s.color }}>{s.delta}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="dash__columns">
          {/* Main table */}
          <div className="dash__main">
            <div className="dash__table-header">
              <h2 className="dash__section-title">Workshop Status</h2>
              <div className="dash__table-filters">
                <button className="filter-btn filter-btn--active">All</button>
                <button className="filter-btn">Upcoming</button>
                <button className="filter-btn">Pending</button>
              </div>
            </div>

            <div className="dash__table-wrap">
              <table className="dash__table">
                <thead>
                  <tr>
                    <th>Workshop</th>
                    <th>Date</th>
                    <th>Proposer</th>
                    <th>Participants</th>
                    <th>Status</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {mockDashboardWorkshops.map((w) => (
                    <tr key={w.id} className="dash__table-row">
                      <td>
                        <div className="dash__ws-title">{w.title}</div>
                      </td>
                      <td>
                        <div className="dash__table-date">
                          <Calendar size={13} />
                          {new Date(w.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </div>
                      </td>
                      <td>
                        <span className="dash__proposer">{w.proposer}</span>
                      </td>
                      <td>
                        <div className="dash__participants">
                          <Users size={13} /> {w.participants}
                        </div>
                      </td>
                      <td>
                        <span className={`badge ${statusCls[w.status]}`}>
                          {statusIcon[w.status]}
                          {w.status.charAt(0).toUpperCase() + w.status.slice(1)}
                        </span>
                      </td>
                      <td>
                        <button className="dash__action-btn">
                          <ArrowRight size={15} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Side panel */}
          <div className="dash__sidebar">
            {/* User info */}
            <div className="dash__profile-card">
              <div className="dash__profile-avatar">
                {initials}
              </div>
              <div className="dash__profile-info">
                <div className="dash__profile-name">{userName}</div>
                <div className="dash__profile-role">{mockUser.role}</div>
                <div className="dash__profile-inst">{mockUser.institution}</div>
              </div>
              <div className="dash__profile-stats">
                <div className="dash__profile-stat">
                  <div className="dash__profile-stat-val">{mockUser.workshopsProposed}</div>
                  <div className="dash__profile-stat-label">Proposed</div>
                </div>
                <div className="dash__profile-stat">
                  <div className="dash__profile-stat-val">{mockUser.workshopsAttended}</div>
                  <div className="dash__profile-stat-label">Attended</div>
                </div>
                <div className="dash__profile-stat">
                  <div className="dash__profile-stat-val">{mockUser.activeWorkshops}</div>
                  <div className="dash__profile-stat-label">Active</div>
                </div>
              </div>
              <Link to="/profile" className="btn btn-ghost" style={{ width: '100%', justifyContent: 'center', fontSize: '0.85rem', padding: '10px' }}>
                View Full Profile
              </Link>
            </div>

            {/* Quick actions */}
            <div className="dash__quick">
              <div className="dash__section-title" style={{ marginBottom: 14 }}>Quick Actions</div>
              {[
                { label: 'Propose Workshop', href: '/propose', icon: <BookOpen size={16} /> },
                { label: 'Browse Types', href: '/types', icon: <Activity size={16} /> },
                { label: 'View Profile', href: '/profile', icon: <Users size={16} /> },
              ].map((a) => (
                <Link key={a.label} to={a.href} className="dash__quick-item">
                  <span className="dash__quick-icon">{a.icon}</span>
                  {a.label}
                  <ArrowRight size={13} style={{ marginLeft: 'auto' }} />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
