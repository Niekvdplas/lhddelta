import { useMemo, useState } from "react";
import Seo from "../components/Seo";
import PageHero from "../components/PageHero";
import { ErrorState, Reveal, Skeleton } from "../components/ui";
import { getBesturen } from "../lib/api";
import { useAsync } from "../lib/useAsync";
import { FOUNDED } from "../lib/config";
import { MembersToolbar } from "./Leden";
import bg from "../assets/img/bg7.jpg";

const roles = [
  ["praeses", "Praeses"],
  ["quaestor", "Quaestor"],
  ["abactis", "Abactis"],
  ["assessor", "Assessor"],
];

export default function Besturen() {
  const { data, loading, error } = useAsync(getBesturen);
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!data || !term) return data || [];
    return data.filter((b) =>
      [b.name, ...roles.map(([k]) => b[k]), b.seq_num != null ? FOUNDED + b.seq_num : ""]
        .join(" ")
        .toLowerCase()
        .includes(term)
    );
  }, [data, q]);

  return (
    <>
      <Seo title="Besturen" noindex />
      <PageHero eyebrow="Alleen voor leden" title="Besturen" image={bg} subtitle="Alle besturen der L.H.D. Delta, van het huidige tot het allereerste.">
        <MembersToolbar q={q} setQ={setQ} placeholder="Zoek op naam of bestuur…" />
      </PageHero>
      <section className="section section--tight">
        <div className="container">
          {error && <ErrorState />}
          <ol className="timeline">
            {loading && <Skeleton count={6} className="skeleton-row" />}
            {filtered.map((b, i) => (
              <Reveal as="li" key={b.id} className="timeline__item">
                <span className="timeline__dot" aria-hidden />
                <div className={`card glass bestuur ${i === 0 && !q ? "bestuur--current" : ""}`}>
                  <div className="bestuur__head">
                    <h3 className="display display--sm">{b.name}</h3>
                    {b.seq_num != null && (
                      <span className="pill">
                        {FOUNDED + b.seq_num}–{FOUNDED + b.seq_num + 1}
                      </span>
                    )}
                    {i === 0 && !q && <span className="pill pill--accent">h.t.</span>}
                  </div>
                  <dl className="bestuur__roles">
                    {roles.map(([k, label]) =>
                      b[k] ? (
                        <div key={k}>
                          <dt>{label}</dt>
                          <dd>{b[k]}</dd>
                        </div>
                      ) : null
                    )}
                  </dl>
                </div>
              </Reveal>
            ))}
          </ol>
          {data && !filtered.length && <p className="empty">Geen bestuur gevonden voor “{q}”.</p>}
        </div>
      </section>
    </>
  );
}
