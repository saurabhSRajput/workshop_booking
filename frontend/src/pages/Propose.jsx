import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Send, FileText, Calendar, Clock, Users, CheckCircle } from 'lucide-react';
import { mockWorkshopTypes } from '../data/mockData';
import './Propose.css';

export default function Propose() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    title: '', type: '', date: '', duration: '', maxParticipants: '',
    description: '', prerequisites: '', objectives: '',
  });
  const navigate = useNavigate();

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const steps = ['Workshop Details', 'Content & Goals', 'Review & Submit'];

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => navigate('/dashboard'), 2500);
  };

  return (
    <main className="propose">
      <div className="propose__bg" />
      <div className="propose__overlay" />

      <div className="container propose__container">
        {/* Header */}
        <div className="propose__header">
          <div className="propose__page-icon"><BookOpen size={28} /></div>
          <div>
            <h1 className="propose__title">Propose a Workshop</h1>
            <p className="propose__sub">Share your expertise with thousands of learners across India</p>
          </div>
        </div>

        {/* Step indicator */}
        <div className="propose__steps">
          {steps.map((s, i) => (
            <div
              key={s}
              className={`propose__step ${step === i + 1 ? 'propose__step--active' : ''} ${step > i + 1 ? 'propose__step--done' : ''}`}
              onClick={() => step > i + 1 && setStep(i + 1)}
            >
              <div className="propose__step-num">
                {step > i + 1 ? <CheckCircle size={16} /> : i + 1}
              </div>
              <span className="propose__step-label hide-mobile">{s}</span>
              {i < steps.length - 1 && <div className="propose__step-line" />}
            </div>
          ))}
        </div>

        {submitted ? (
          <div className="propose__success glass-panel">
            <div className="propose__success-icon"><CheckCircle size={52} /></div>
            <h2>Proposal Submitted!</h2>
            <p>Our team will review your proposal and get back to you within 3 business days.</p>
            <p className="propose__success-sub">Redirecting to dashboard...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="propose__form glass-panel">
            {step === 1 && (
              <div className="propose__form-step">
                <h2 className="propose__form-title">Workshop Details</h2>

                <div className="form-group">
                  <label className="form-label">Workshop Title *</label>
                  <input name="title" value={form.title} onChange={handle} placeholder="e.g., Introduction to Python for Science" className="form-input" required />
                </div>

                <div className="propose__row">
                  <div className="form-group" style={{ flex: 1 }}>
                    <label className="form-label">Workshop Type *</label>
                    <select name="type" value={form.type} onChange={handle} className="form-input" required>
                      <option value="">Select a type...</option>
                      {mockWorkshopTypes.map(t => <option key={t.id} value={t.name}>{t.icon} {t.name}</option>)}
                    </select>
                  </div>
                  <div className="form-group" style={{ flex: 1 }}>
                    <label className="form-label">Proposed Date *</label>
                    <input type="date" name="date" value={form.date} onChange={handle} className="form-input" required min={new Date().toISOString().split('T')[0]} />
                  </div>
                </div>

                <div className="propose__row">
                  <div className="form-group" style={{ flex: 1 }}>
                    <label className="form-label">Duration *</label>
                    <select name="duration" value={form.duration} onChange={handle} className="form-input" required>
                      <option value="">Select duration</option>
                      <option>Half day (4 hrs)</option>
                      <option>1 day</option>
                      <option>2 days</option>
                      <option>3 days</option>
                    </select>
                  </div>
                  <div className="form-group" style={{ flex: 1 }}>
                    <label className="form-label">Max Participants *</label>
                    <input type="number" name="maxParticipants" value={form.maxParticipants} onChange={handle} placeholder="e.g. 60" className="form-input" required min="10" max="500" />
                  </div>
                </div>

                <button type="button" className="btn btn-primary propose__next-btn" onClick={() => setStep(2)}>
                  Continue <CheckCircle size={16} />
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="propose__form-step">
                <h2 className="propose__form-title">Content & Learning Goals</h2>

                <div className="form-group">
                  <label className="form-label">Workshop Description *</label>
                  <textarea name="description" value={form.description} onChange={handle} rows={4} placeholder="Describe what this workshop covers..." className="form-input" required />
                </div>

                <div className="form-group">
                  <label className="form-label">Prerequisites</label>
                  <textarea name="prerequisites" value={form.prerequisites} onChange={handle} rows={3} placeholder="What should participants know beforehand? (optional)" className="form-input" />
                </div>

                <div className="form-group">
                  <label className="form-label">Learning Objectives *</label>
                  <textarea name="objectives" value={form.objectives} onChange={handle} rows={3} placeholder="List 3-5 specific learning outcomes..." className="form-input" required />
                </div>

                <div className="propose__step-btns">
                  <button type="button" className="btn btn-ghost" onClick={() => setStep(1)}>← Back</button>
                  <button type="button" className="btn btn-primary" onClick={() => setStep(3)}>Review Proposal →</button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="propose__form-step">
                <h2 className="propose__form-title">Review Your Proposal</h2>

                <div className="propose__review-grid">
                  {[
                    { icon: <BookOpen size={16} />, label: 'Title', value: form.title },
                    { icon: <FileText size={16} />, label: 'Type', value: form.type },
                    { icon: <Calendar size={16} />, label: 'Date', value: form.date ? new Date(form.date).toLocaleDateString('en-IN') : '—' },
                    { icon: <Clock size={16} />, label: 'Duration', value: form.duration },
                    { icon: <Users size={16} />, label: 'Max Participants', value: form.maxParticipants },
                  ].map((item) => (
                    <div key={item.label} className="propose__review-item">
                      <div className="propose__review-icon">{item.icon}</div>
                      <div>
                        <div className="propose__review-label">{item.label}</div>
                        <div className="propose__review-val">{item.value || '—'}</div>
                      </div>
                    </div>
                  ))}
                </div>

                {form.description && (
                  <div className="propose__review-block">
                    <div className="propose__review-label">Description</div>
                    <p className="propose__review-text">{form.description}</p>
                  </div>
                )}

                <div className="propose__step-btns">
                  <button type="button" className="btn btn-ghost" onClick={() => setStep(2)}>← Back</button>
                  <button type="submit" className="btn btn-primary">
                    <Send size={16} /> Submit Proposal
                  </button>
                </div>
              </div>
            )}
          </form>
        )}
      </div>
    </main>
  );
}
