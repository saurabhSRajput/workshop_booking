import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BookOpen, Eye, EyeOff, Mail, Lock, User, ArrowRight, CheckCircle } from 'lucide-react';
import './Auth.css';

export default function Login() {
  const [mode, setMode] = useState('login');
  const [showPass, setShowPass] = useState(false);
  const [form, setForm] = useState({ email: '', password: '', name: '', confirm: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => navigate('/dashboard'), 1500);
    }, 1200);
  };

  return (
    <main className="auth">
      {/* Background */}
      <div className="auth__bg" />
      <div className="auth__overlay" />

      <div className="auth__container">
        {/* Left — branding */}
        <div className="auth__left">
          <Link to="/" className="auth__logo-wrap">
            <div className="auth__logo"><BookOpen size={24} /></div>
            <div>
              <div className="auth__logo-text">FOSSEE</div>
              <div className="auth__logo-sub">Workshops</div>
            </div>
          </Link>

          <h2 className="auth__left-title">
            Open-source learning,<br />
            <span className="auth__left-accent">at IIT Bombay scale.</span>
          </h2>
          <p className="auth__left-desc">
            Access hundreds of hands-on workshops in Python, Scilab, OpenFOAM and more — completely free for students and educators across India.
          </p>

          <div className="auth__features">
            {['Free access to all workshops', 'Certified by IIT Bombay faculty', 'Learn industry-standard open-source tools'].map((f) => (
              <div key={f} className="auth__feature">
                <CheckCircle size={15} color="var(--accent-success)" />
                <span>{f}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right — form */}
        <div className="auth__right">
          <div className="auth__card glass-panel">
            {/* Tabs */}
            <div className="auth__tabs">
              <button
                className={`auth__tab ${mode === 'login' ? 'auth__tab--active' : ''}`}
                onClick={() => setMode('login')}
              >
                Sign In
              </button>
              <button
                className={`auth__tab ${mode === 'register' ? 'auth__tab--active' : ''}`}
                onClick={() => setMode('register')}
              >
                Register
              </button>
            </div>

            {success ? (
              <div className="auth__success">
                <div className="auth__success-icon"><CheckCircle size={40} /></div>
                <h3>Welcome back!</h3>
                <p>Redirecting to your dashboard...</p>
              </div>
            ) : (
              <form onSubmit={submit} className="auth__form">
                <h2 className="auth__form-title">
                  {mode === 'login' ? 'Welcome back 👋' : 'Create your account'}
                </h2>
                <p className="auth__form-sub">
                  {mode === 'login' ? 'Sign in to your FOSSEE account' : 'Join thousands of learners on FOSSEE'}
                </p>

                {mode === 'register' && (
                  <div className="form-group">
                    <label className="form-label">Full Name</label>
                    <div className="auth__input-wrap">
                      <User size={16} className="auth__input-icon" />
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handle}
                        placeholder="e.g. Avani Dewan"
                        className="form-input auth__input"
                        required
                      />
                    </div>
                  </div>
                )}

                <div className="form-group">
                  <label className="form-label">Email Address</label>
                  <div className="auth__input-wrap">
                    <Mail size={16} className="auth__input-icon" />
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handle}
                      placeholder="you@iitb.ac.in"
                      className="form-input auth__input"
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Password</label>
                  <div className="auth__input-wrap">
                    <Lock size={16} className="auth__input-icon" />
                    <input
                      type={showPass ? 'text' : 'password'}
                      name="password"
                      value={form.password}
                      onChange={handle}
                      placeholder="••••••••"
                      className="form-input auth__input auth__input--pass"
                      required
                    />
                    <button
                      type="button"
                      className="auth__eye"
                      onClick={() => setShowPass(!showPass)}
                      aria-label={showPass ? 'Hide password' : 'Show password'}
                    >
                      {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </div>
                </div>

                {mode === 'register' && (
                  <div className="form-group">
                    <label className="form-label">Confirm Password</label>
                    <div className="auth__input-wrap">
                      <Lock size={16} className="auth__input-icon" />
                      <input
                        type="password"
                        name="confirm"
                        value={form.confirm}
                        onChange={handle}
                        placeholder="••••••••"
                        className="form-input auth__input"
                        required
                      />
                    </div>
                  </div>
                )}

                {mode === 'login' && (
                  <div className="auth__forgot">
                    <Link to="/forgot-password" className="auth__forgot-link">Forgot password?</Link>
                  </div>
                )}

                <button type="submit" className={`btn btn-primary auth__submit ${loading ? 'auth__submit--loading' : ''}`} disabled={loading}>
                  {loading ? <span className="auth__spinner" /> : null}
                  {loading ? 'Signing in...' : mode === 'login' ? 'Sign In' : 'Create Account'}
                  {!loading && <ArrowRight size={16} />}
                </button>

                <p className="auth__switch">
                  {mode === 'login' ? "Don't have an account?" : 'Already have an account?'}
                  {' '}
                  <button type="button" className="auth__switch-btn" onClick={() => setMode(mode === 'login' ? 'register' : 'login')}>
                    {mode === 'login' ? 'Register' : 'Sign In'}
                  </button>
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
