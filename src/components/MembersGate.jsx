import { useState } from "react";
import { Eye, EyeOff, KeyRound, Lock } from "lucide-react";
import logo from "../assets/img/logo.png";
import Seo from "./Seo";
import { isUnlocked, unlock } from "../lib/auth";

/**
 * Wraps members-only pages. Nothing inside renders (and no member data is
 * fetched) until the correct password has been entered.
 */
export default function MembersGate({ title, children }) {
  const [ok, setOk] = useState(isUnlocked);
  const [pw, setPw] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState(false);
  const [busy, setBusy] = useState(false);

  if (ok) return children;

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    const good = await unlock(pw);
    setBusy(false);
    if (good) setOk(true);
    else {
      setError(true);
      setPw("");
    }
  };

  return (
    <section className="gate">
      <Seo title={title} noindex />
      <div className="gate__glow" aria-hidden />
      <form className={`gate__card glass ${error ? "shake" : ""}`} onSubmit={submit} onAnimationEnd={() => setError(false)}>
        <div className="gate__badge">
          <img src={logo} alt="" width="56" height="56" />
          <span className="gate__lock">
            <Lock size={14} />
          </span>
        </div>
        <div className="eyebrow">Alleen voor leden</div>
        <h1 className="display display--sm">{title}</h1>
        <p className="muted">Deze pagina is afgeschermd. Voer het ledenwachtwoord in om verder te gaan.</p>

        <label className="field">
          <span className="field__label">Wachtwoord</span>
          <span className="field__control">
            <KeyRound size={18} className="field__icon" />
            <input
              type={show ? "text" : "password"}
              value={pw}
              onChange={(e) => setPw(e.target.value)}
              autoComplete="current-password"
              autoFocus
              placeholder="••••••••"
              aria-invalid={error}
            />
            <button
              type="button"
              className="field__btn"
              onClick={() => setShow((s) => !s)}
              aria-label={show ? "Verberg wachtwoord" : "Toon wachtwoord"}
            >
              {show ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </span>
        </label>
        {error && <div className="gate__error">Onjuist wachtwoord.</div>}

        <button className="btn btn--primary btn--block" disabled={!pw || busy}>
          {busy ? "Controleren…" : "Ontgrendel"}
        </button>
      </form>
    </section>
  );
}
