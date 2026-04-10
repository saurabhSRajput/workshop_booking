import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, BookOpen, Mail, MapPin, Edit2, Award, Users, CheckCircle, Clock } from 'lucide-react';
import { mockUser, mockDashboardWorkshops } from '../data/mockData';
import './Profile.css';

export default function Profile() {
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({ 
    name: localStorage.getItem('mockUserName') || mockUser.name, 
    email: localStorage.getItem('mockUserEmail') || mockUser.email, 
    institution: mockUser.institution, 
    department: mockUser.department 
  });

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const statusIcon = { upcoming: <CheckCircle size={13} />, completed: <CheckCircle size={13} />, pending: <Clock size={13} />, rejected: <Clock size={13} /> };
  const statusCls = { upcoming: 'badge-upcoming', completed: 'badge-completed', pending: 'badge-pending', rejected: 'badge-rejected' };

  return (
    <main className="profile">
      <div className="container">
        {/* Banner */}
        <div className="profile__banner">
          <div className="profile__banner-bg" />
          <div className="profile__banner-content">
            <div className="profile__avatar">
              {form.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div className="profile__identity">
              <h1 className="profile__name">{form.name}</h1>
              <p className="profile__role">{mockUser.role}</p>
              <div className="profile__meta-row">
                <span className="profile__meta-item"><Mail size={13} /> {form.email}</span>
                <span className="profile__meta-item"><MapPin size={13} /> {form.institution}</span>
                <span className="profile__meta-item"><BookOpen size={13} /> {form.department}</span>
              </div>
            </div>
            <button
              className={`btn profile__edit-btn ${editMode ? 'btn-primary' : 'btn-ghost'}`}
              onClick={() => setEditMode(!editMode)}
            >
              <Edit2 size={14} /> {editMode ? 'Save Changes' : 'Edit Profile'}
            </button>
          </div>
        </div>

        <div className="profile__cols">
          {/* Left */}
          <div className="profile__left">
            {/* Edit form or info */}
            <div className="profile__card">
              <h2 className="profile__card-title">Personal Information</h2>
              {editMode ? (
                <div className="profile__edit-form">
                  {[
                    { label: 'Full Name', name: 'name' },
                    { label: 'Email', name: 'email', type: 'email' },
                    { label: 'Institution', name: 'institution' },
                    { label: 'Department', name: 'department' },
                  ].map((f) => (
                    <div key={f.name} className="form-group">
                      <label className="form-label">{f.label}</label>
                      <input
                        type={f.type || 'text'}
                        value={form[f.name]}
                        onChange={(e) => setForm({ ...form, [f.name]: e.target.value })}
                        className="form-input"
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="profile__info-grid">
                  {[
                    { label: 'Full Name', value: form.name },
                    { label: 'Email Address', value: form.email },
                    { label: 'Institution', value: form.institution },
                    { label: 'Department', value: form.department },
                    { label: 'Member Since', value: new Date(mockUser.joinedDate).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' }) },
                    { label: 'Role', value: mockUser.role },
                  ].map((item) => (
                    <div key={item.label} className="profile__info-item">
                      <div className="profile__info-label">{item.label}</div>
                      <div className="profile__info-value">{item.value}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Activity summary */}
            <div className="profile__card">
              <h2 className="profile__card-title">Activity Summary</h2>
              <div className="profile__stats-grid">
                {[
                  { label: 'Proposed', value: mockUser.workshopsProposed, icon: <BookOpen size={18} />, color: '#4f8ef7' },
                  { label: 'Attended', value: mockUser.workshopsAttended, icon: <Users size={18} />, color: '#10b981' },
                  { label: 'Active', value: mockUser.activeWorkshops, icon: <Award size={18} />, color: '#7c3aed' },
                ].map((s) => (
                  <div key={s.label} className="profile__stat">
                    <div className="profile__stat-icon" style={{ background: `${s.color}18`, color: s.color }}>{s.icon}</div>
                    <div className="profile__stat-val">{s.value}</div>
                    <div className="profile__stat-label">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right — workshops */}
          <div className="profile__right">
            <div className="profile__card">
              <div className="profile__card-header">
                <h2 className="profile__card-title">My Workshops</h2>
                <Link to="/dashboard" className="profile__card-link">View All</Link>
              </div>

              <div className="profile__ws-list">
                {mockDashboardWorkshops.map((w) => (
                  <div key={w.id} className="profile__ws-item">
                    <div className="profile__ws-icon">
                      <BookOpen size={16} />
                    </div>
                    <div className="profile__ws-body">
                      <div className="profile__ws-title">{w.title}</div>
                      <div className="profile__ws-date">
                        <Calendar size={11} />
                        {new Date(w.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </div>
                    </div>
                    <span className={`badge ${statusCls[w.status]}`}>
                      {statusIcon[w.status]}
                      {w.status.charAt(0).toUpperCase() + w.status.slice(1)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Propose CTA */}
            <div className="profile__card profile__cta-card">
              <h3 className="profile__cta-title">Propose a New Workshop</h3>
              <p className="profile__cta-desc">
                Share your expertise in an open-source tool with students across India.
              </p>
              <Link to="/propose" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
