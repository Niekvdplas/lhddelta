import { Link } from "react-router-dom";
import { ArrowRight, Camera, Mail, PartyPopper, Play, Trophy } from "lucide-react";
import heroImg from "../assets/img/landing-bg.jpg";
import logo from "../assets/img/logo.png";
import Seo from "../components/Seo";
import { Avatar, ErrorState, Reveal, SectionTitle, Skeleton } from "../components/ui";
import { getHuidigBestuur } from "../lib/api";
import { useAsync } from "../lib/useAsync";
import { FOUNDED } from "../lib/config";

const roles = [
  ["praeses", "pfoto", "Praeses"],
  ["quaestor", "qfoto", "Quaestor"],
  ["abactis", "abfoto", "Abactis"],
  ["assessor", "assfoto", "Assessor"],
];

const features = [
  {
    to: "/dpb",
    icon: Trophy,
    title: "Delta Playback Show",
    text: "Onze jaarlijkse manifestatie. Bekijk de film, de geschiedenis en alle winnaars.",
  },
  {
    to: "/vap",
    icon: PartyPopper,
    title: "VAP's",
    text: "Eerstejaars? Ontdek de wereldberoemde VAP's en maak kennis met de DKC.",
  },
  {
    to: "/fotos",
    icon: Camera,
    title: "Foto's",
    text: "Een greep uit de mooiste momenten van het dispuut.",
  },
];

export default function Home() {
  const { data: bestuur, loading, error } = useAsync(getHuidigBestuur);
  const years = new Date().getFullYear() - FOUNDED;

  return (
    <>
      <Seo />
      <section className="hero hero--home">
        <div className="hero__bg hero__bg--zoom" style={{ backgroundImage: `url(${heroImg})` }} aria-hidden />
        <div className="hero__shade" aria-hidden />
        <div className="container hero__content hero__content--center">
          <Reveal>
            <div className="hero__logo">
              <img src={logo} alt="Wapen van L.H.D. Delta" width="140" height="140" />
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="eyebrow">Leidsch Heerendispuut · sinds {FOUNDED}</div>
          </Reveal>
          <Reveal delay={200}>
            <h1 className="display display--xl">
              L.H.D. <span className="text-accent">Delta</span>
            </h1>
          </Reveal>
          <Reveal delay={300}>
            <p className="lead">Hét dispuut van Quintus.</p>
          </Reveal>
          <Reveal delay={400} className="hero__actions">
            <Link to="/dpb" className="btn btn--primary">
              <Play size={16} fill="currentColor" /> Bekijk de Playback-film
            </Link>
            <Link to="/vap" className="btn btn--ghost">
              Naar de VAP's <ArrowRight size={16} />
            </Link>
          </Reveal>
        </div>
      </section>

      <section id="welkom" className="section">
        <div className="container">
          <Reveal className="stats glass">
            <div className="stat">
              <div className="stat__num">{FOUNDED}</div>
              <div className="stat__label">Opgericht</div>
            </div>
            <div className="stat">
              <div className="stat__num">{years}</div>
              <div className="stat__label">Jaar Delta</div>
            </div>
            <div className="stat">
              <div className="stat__num">{bestuur?.seq_num ? bestuur.seq_num + 1 : "—"}</div>
              <div className="stat__label">Besturen</div>
            </div>
            <div className="stat">
              <div className="stat__num stat__num--italic">Delendum</div>
              <div className="stat__label">Devies</div>
            </div>
          </Reveal>

          <SectionTitle eyebrow="Welkom" title={bestuur ? `Het h.t. zetelende ${bestuur.name}` : "Het h.t. zetelende bestuur"}>
            Welkom op de site van het Leidsch Heerendispuut Delta. Hier vindt u alle informatie over onze
            bezigheden en ons actief ledenbestand.
          </SectionTitle>

          {error && <ErrorState />}
          <div className="board">
            {loading && <Skeleton count={4} className="skeleton-person" />}
            {bestuur &&
              roles.map(([key, foto, label], i) =>
                bestuur[key] ? (
                  <Reveal key={key} delay={i * 90} className="person">
                    <Avatar src={bestuur[foto]} name={bestuur[key]} />
                    <div className="person__name">{bestuur[key]}</div>
                    <div className="person__role">{label}</div>
                  </Reveal>
                ) : null
              )}
          </div>

          {bestuur?.abactis && (
            <Reveal className="contact glass">
              <div>
                <div className="eyebrow">Contact</div>
                <h3 className="display display--sm">Abactiaat der L.H.D. Delta</h3>
                <p className="muted">{bestuur.abactis}</p>
              </div>
              {bestuur.abmail && (
                <a className="btn btn--primary" href={`mailto:${bestuur.abmail}`}>
                  <Mail size={16} /> {bestuur.abmail}
                </a>
              )}
            </Reveal>
          )}
        </div>
      </section>

      <section className="section section--alt">
        <div className="container">
          <SectionTitle eyebrow="Ontdek" title="Wat Delta doet" />
          <div className="features">
            {features.map((f, i) => (
              <Reveal key={f.to} delay={i * 100}>
                <Link to={f.to} className="feature glass">
                  <span className="feature__icon">
                    <f.icon size={22} />
                  </span>
                  <h3>{f.title}</h3>
                  <p>{f.text}</p>
                  <span className="feature__more">
                    Meer <ArrowRight size={14} />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
