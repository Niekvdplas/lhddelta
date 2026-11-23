import { useMemo, useState } from "react";
import { LogOut, Search, Users } from "lucide-react";
import Seo from "../components/Seo";
import PageHero from "../components/PageHero";
import { ErrorState, Reveal, Skeleton } from "../components/ui";
import { getJaren } from "../lib/api";
import { lock } from "../lib/auth";
import { useAsync } from "../lib/useAsync";
import bg from "../assets/img/bg7.jpg";

export default function Leden() {
  const { data, loading, error } = useAsync(getJaren);
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    if (!data) return [];
    const term = q.trim().toLowerCase();
    if (!term) return data;
    return data
      .map((j) => {
        const hitGroup = `${j.label} ${j.name || ""}`.toLowerCase().includes(term);
        const members = hitGroup ? j.memberList : j.memberList.filter((m) => m.toLowerCase().includes(term));
        return { ...j, memberList: members };
      })
      .filter((j) => j.memberList.length);
  }, [data, q]);

  const total = data?.reduce((n, j) => n + j.memberList.length, 0) ?? 0;

  return (
    <>
      <Seo title="Leden" noindex />
      <PageHero eyebrow="Alleen voor leden" title="Leden" image={bg} subtitle={data ? `${total} Deltanen verdeeld over ${data.length} lichtingen.` : "Alle lichtingen der L.H.D. Delta."}>
        <MembersToolbar q={q} setQ={setQ} placeholder="Zoek op naam, jaar of jaarclub…" />
      </PageHero>
      <section className="section section--tight">
        <div className="container">
          {error && <ErrorState />}
          <div className="grid grid--cards">
            {loading && <Skeleton count={9} />}
            {filtered.map((j, i) => (
              <Reveal key={j.id} delay={(i % 3) * 70} className="card glass year-card">
                <div className="year-card__head">
                  <span className="year-card__year">{j.label}</span>
                  <span className="pill">
                    <Users size={12} /> {j.memberList.length}
                  </span>
                </div>
                {j.name && <div className="year-card__name">{j.name}</div>}
                <ul className="year-card__list">
                  {j.memberList.map((m) => (
                    <li key={m}>{m}</li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
          {data && !filtered.length && <p className="empty">Niemand gevonden voor “{q}”.</p>}
        </div>
      </section>
    </>
  );
}

export function MembersToolbar({ q, setQ, placeholder }) {
  return (
    <div className="toolbar">
      <label className="search">
        <Search size={18} />
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder={placeholder} aria-label="Zoeken" />
      </label>
      <button
        className="btn btn--ghost btn--sm"
        onClick={() => {
          lock();
          window.location.reload();
        }}
      >
        <LogOut size={14} /> Vergrendel
      </button>
    </div>
  );
}
