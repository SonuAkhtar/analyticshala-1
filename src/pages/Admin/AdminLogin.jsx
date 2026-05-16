import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { isSupabaseConfigured } from "../../lib/supabase";
import "./adminLogin.css";

const AdminLogin = () => {
  const [email, setEmail]     = useState("");
  const [password, setPassword] = useState("");
  const [error, setError]     = useState("");
  const [loading, setLoading] = useState(false);
  const { signIn }            = useAuth();
  const navigate              = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const { error: authError } = await signIn(email, password);
    setLoading(false);
    if (authError) {
      setError(authError.message);
    } else {
      navigate("/admin/dashboard");
    }
  };

  return (
    <div className="adm-login">
      {/* Background orbs */}
      <div className="adm-login__orb adm-login__orb--1" />
      <div className="adm-login__orb adm-login__orb--2" />

      <div className="adm-login__card">
        <div className="adm-login__logo">
          <i className="fas fa-chart-line" />
        </div>

        <h1 className="adm-login__title">Admin Portal</h1>
        <p className="adm-login__sub">AnalyticShala Control Centre</p>

        {!isSupabaseConfigured && (
          <div className="adm-login__warn">
            <i className="fas fa-exclamation-triangle" />
            <div>
              <strong>Supabase not configured</strong>
              <p>Add <code>VITE_SUPABASE_URL</code> and <code>VITE_SUPABASE_ANON_KEY</code> to your <code>.env.local</code> file.</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="adm-login__form" noValidate>
          <div className="adm-login__field">
            <label htmlFor="adm-email">Email</label>
            <div className="adm-login__input-wrap">
              <i className="fas fa-envelope" />
              <input
                id="adm-email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="admin@analyticshala.in"
                required
                autoComplete="email"
              />
            </div>
          </div>

          <div className="adm-login__field">
            <label htmlFor="adm-pass">Password</label>
            <div className="adm-login__input-wrap">
              <i className="fas fa-lock" />
              <input
                id="adm-pass"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                autoComplete="current-password"
              />
            </div>
          </div>

          {error && (
            <div className="adm-login__error">
              <i className="fas fa-exclamation-circle" />
              <span>{error}</span>
            </div>
          )}

          <button type="submit" className="adm-login__btn" disabled={loading || !isSupabaseConfigured}>
            {loading
              ? <><i className="fas fa-circle-notch fa-spin" /> Signing in…</>
              : <><i className="fas fa-sign-in-alt" /> Sign In to Dashboard</>
            }
          </button>
        </form>

        <a
          href="/"
          className="adm-login__back"
          onClick={e => { e.preventDefault(); navigate("/"); }}
        >
          <i className="fas fa-arrow-left" /> Back to website
        </a>
      </div>
    </div>
  );
};

export default AdminLogin;
