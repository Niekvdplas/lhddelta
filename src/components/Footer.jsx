import { Link } from "react-router-dom";
import Instagram from "./InstagramIcon";
import logo from "../assets/img/logo.png";
import { FOUNDED, INSTAGRAM_URL } from "../lib/config";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <img src={logo} alt="" width="44" height="44" />
          <div>
            <div className="footer__name">Leidsch Heerendispuut Delta</div>
            <div className="footer__motto">Hét dispuut van Quintus · sinds {FOUNDED}</div>
          </div>
        </div>
        <nav className="footer__links" aria-label="Footer">
          <Link to="/dpb">Playback Show</Link>
          <Link to="/vap">VAP</Link>
          <Link to="/fotos">Foto's</Link>
          <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">
            <Instagram size={16} /> Instagram
          </a>
        </nav>
      </div>
      <div className="container footer__legal">
        © {new Date().getFullYear()} L.H.D. Delta · <em>Delendum</em>
      </div>
    </footer>
  );
}
