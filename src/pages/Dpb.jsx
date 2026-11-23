import { CalendarDays, History, MapPin, Trophy } from "lucide-react";
import Seo from "../components/Seo";
import PageHero from "../components/PageHero";
import Video from "../components/Video";
import { ErrorState, Reveal, Skeleton, Tabs } from "../components/ui";
import { getPbInfo, getPlaybacks } from "../lib/api";
import { useAsync } from "../lib/useAsync";

const load = () => Promise.all([getPbInfo(), getPlaybacks()]);

export default function Dpb() {
  const { data, loading, error } = useAsync(load);
  const [pb, winners] = data || [];

  return (
    <>
      <Seo title="Delta Playback Show" description="De Delta Playback Show: de film, de geschiedenis en alle winnaars." />
      <PageHero eyebrow="Manifestatie" title="Delta Playback Show" subtitle="Elk jaar het podium van Quintus. Elk jaar een nieuwe film." />
      <section className="section section--tight">
        <div className="container container--narrow">
          {error && <ErrorState />}
          <Reveal className="video-wrap">
            {loading ? <div className="skeleton video" /> : <Video src={pb?.movieurl} />}
          </Reveal>

          {pb && (
            <Reveal className="info-row">
              <div className="info glass">
                <CalendarDays size={20} />
                <div>
                  <div className="info__label">Datum</div>
                  <div className="info__value">{pb.date || "Volgt"}</div>
                </div>
              </div>
              <div className="info glass">
                <MapPin size={20} />
                <div>
                  <div className="info__label">Locatie</div>
                  <div className="info__value">{pb.location || "Volgt"}</div>
                </div>
              </div>
            </Reveal>
          )}

          {pb && (
            <Reveal as="p" className="prose center">
              Elk jaar wordt er bij onze manifestatie, de Playbackshow, een filmpje gemaakt. Dit filmpje is speciaal
              gemaakt voor de editie van onze show in {pb.movieyear}.
            </Reveal>
          )}

          <Reveal>
            <Tabs
              tabs={[
                {
                  label: "Geschiedenis",
                  icon: History,
                  content: loading ? <Skeleton count={3} className="skeleton-line" /> : <p className="prose prose--pre">{pb?.history}</p>,
                },
                {
                  label: "Winnaars",
                  icon: Trophy,
                  content: (
                    <div className="winners">
                      {loading && <Skeleton count={6} className="skeleton-row" />}
                      {winners?.map((w, i) => (
                        <div key={w.id} className={`winner glass ${w.cancelled === "t" ? "is-cancelled" : ""} ${i === 0 ? "is-latest" : ""}`}>
                          <span className="winner__year">{w.year}</span>
                          <span className="winner__name">{w.winner}</span>
                          {i === 0 && w.cancelled !== "t" && <Trophy size={16} className="winner__icon" />}
                        </div>
                      ))}
                    </div>
                  ),
                },
              ]}
            />
          </Reveal>
        </div>
      </section>
    </>
  );
}
