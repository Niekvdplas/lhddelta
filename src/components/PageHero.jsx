import fallback from "../assets/img/profile-bg.jpg";

export default function PageHero({ eyebrow, title, subtitle, image = fallback, children }) {
  return (
    <section className="hero hero--page">
      <div className="hero__bg" style={{ backgroundImage: `url(${image})` }} aria-hidden />
      <div className="hero__shade" aria-hidden />
      <div className="container hero__content">
        {eyebrow && <div className="eyebrow">{eyebrow}</div>}
        <h1 className="display">{title}</h1>
        {subtitle && <p className="lead">{subtitle}</p>}
        {children}
      </div>
    </section>
  );
}
