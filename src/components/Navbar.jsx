import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Lock, Menu, X } from "lucide-react";
import Instagram from "./InstagramIcon";
import logo from "../assets/img/logo.png";
import { INSTAGRAM_URL, isLustrumYear } from "../lib/config";

const links = [
  { to: "/leden", label: "Leden", locked: true },
  { to: "/besturen", label: "Besturen", locked: true },
  { to: "/dpb", label: "Playback Show" },
  { to: "/vap", label: "VAP" },
  ...(isLustrumYear() ? [{ to: "/gala", label: "Lustrumgala" }] : []),
  { to: "/fotos", label: "Foto's" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <header className={`nav ${scrolled || open ? "nav--solid" : ""}`}>
      <div className="nav__inner">
        <Link to="/" className="nav__brand" aria-label="L.H.D. Delta — home">
          <img src={logo} alt="" width="34" height="34" />
          <span>
            L.H.D. <strong>Delta</strong>
          </span>
        </Link>

        <nav className={`nav__links ${open ? "is-open" : ""}`} aria-label="Hoofdmenu">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              rel={l.locked ? "nofollow" : undefined}
              className={({ isActive }) => `nav__link ${isActive ? "is-active" : ""}`}
            >
              {l.label}
              {l.locked && <Lock size={12} className="nav__lock" aria-label="alleen voor leden" />}
            </NavLink>
          ))}
          <a
            className="nav__link nav__ig"
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Volg ons op Instagram"
          >
            <Instagram size={18} />
            <span className="nav__ig-label">Instagram</span>
          </a>
        </nav>

        <button
          className="nav__toggle"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Sluit menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
    </header>
  );
}
