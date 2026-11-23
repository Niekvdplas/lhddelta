import { useEffect, useRef, useState } from "react";
import { AlertTriangle } from "lucide-react";

/** Fades/slides children in when they scroll into view. */
export function Reveal({ as: Tag = "div", delay = 0, className = "", children, ...rest }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) return setShown(true);
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <Tag
      ref={ref}
      className={`reveal ${shown ? "is-shown" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

export function SectionTitle({ eyebrow, title, children, center = true }) {
  return (
    <Reveal className={`section-title ${center ? "is-center" : ""}`}>
      {eyebrow && <div className="eyebrow">{eyebrow}</div>}
      <h2 className="display display--md">{title}</h2>
      <div className="divider" aria-hidden>
        <span />
      </div>
      {children && <p className="muted">{children}</p>}
    </Reveal>
  );
}

export function Skeleton({ count = 6, className = "skeleton-card" }) {
  return Array.from({ length: count }, (_, i) => <div key={i} className={`skeleton ${className}`} />);
}

export function ErrorState({ children = "Er ging iets mis bij het ophalen van de gegevens." }) {
  return (
    <div className="error-state">
      <AlertTriangle size={20} />
      <span>{children}</span>
    </div>
  );
}

export function Tabs({ tabs, initial = 0 }) {
  const [active, setActive] = useState(initial);
  const current = tabs[Math.min(active, tabs.length - 1)];
  return (
    <div className="tabs">
      <div className="tabs__list" role="tablist">
        {tabs.map((t, i) => {
          const Icon = t.icon;
          return (
            <button
              key={t.label}
              role="tab"
              aria-selected={i === active}
              className={`tabs__tab ${i === active ? "is-active" : ""}`}
              onClick={() => setActive(i)}
            >
              {Icon && <Icon size={16} />}
              {t.label}
            </button>
          );
        })}
      </div>
      <div className="tabs__panel" role="tabpanel" key={active}>
        {current?.content}
      </div>
    </div>
  );
}

export function Avatar({ src, name, size = 160 }) {
  const initials = (name || "?")
    .split(/\s+/)
    .filter(Boolean)
    .map((p) => p[0])
    .slice(-2)
    .join("")
    .toUpperCase();
  const [failed, setFailed] = useState(false);
  return (
    <div className="avatar" style={{ width: size, height: size }}>
      {src && !failed ? (
        <img src={src} alt={name || ""} loading="lazy" onError={() => setFailed(true)} />
      ) : (
        <span>{initials}</span>
      )}
    </div>
  );
}
