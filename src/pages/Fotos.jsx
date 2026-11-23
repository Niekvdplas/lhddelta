import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Seo from "../components/Seo";
import PageHero from "../components/PageHero";
import { ErrorState, Reveal, Skeleton } from "../components/ui";
import { getPhotos } from "../lib/api";
import { useAsync } from "../lib/useAsync";

export default function Fotos() {
  const { data, loading, error } = useAsync(getPhotos);
  const [index, setIndex] = useState(-1);

  return (
    <>
      <Seo title="Foto's" description="Foto's van L.H.D. Delta." />
      <PageHero eyebrow="Galerij" title="Foto's" subtitle={data ? `${data.length} herinneringen` : "Een greep uit de mooiste momenten."} />
      <section className="section section--tight">
        <div className="container">
          {error && <ErrorState>Foto's konden niet geladen worden.</ErrorState>}
          <div className="masonry">
            {loading && <Skeleton count={9} className="skeleton-photo" />}
            {data?.map((src, i) => (
              <Reveal key={src} delay={(i % 4) * 60} className="masonry__item">
                <button className="photo" onClick={() => setIndex(i)} aria-label={`Open foto ${i + 1}`}>
                  <img src={src} alt="" loading="lazy" />
                </button>
              </Reveal>
            ))}
          </div>
          {data && !data.length && <p className="empty">Nog geen foto's geüpload.</p>}
        </div>
      </section>
      <Lightbox
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
        slides={(data || []).map((src) => ({ src }))}
      />
    </>
  );
}
