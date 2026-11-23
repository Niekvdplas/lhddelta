import { MapPin, PlayCircle, Users } from "lucide-react";
import Seo from "../components/Seo";
import PageHero from "../components/PageHero";
import Video from "../components/Video";
import { Reveal, Skeleton, Tabs } from "../components/ui";
import { getGalaAanwezigen } from "../lib/api";
import { useAsync } from "../lib/useAsync";

const load = async () => {
  const now = new Date().getFullYear();
  return (await getGalaAanwezigen())
    .filter((g) => {
      const created = +String(g.createdAt).slice(0, 4);
      return created > now - 4 && created <= now;
    })
    .map((g) => ({ ...g, list: g.names.split(";").filter(Boolean) }));
};

export default function Gala() {
  const { data, loading } = useAsync(load);
  return (
    <>
      <Seo title="Lustrumgala" />
      <PageHero eyebrow="Lustrum" title="Lustrumgala" subtitle="White tie · Kasteel Oud-Wassenaar" />
      <section className="section section--tight">
        <div className="container container--narrow">
          <Reveal className="letter glass">
            <p className="letter__salutation">Hooggeacht Erelid,</p>
            <p>
              Van harte proficiat met het lustrum van ons aller L.H.D. Delta! Al jaren lang staat ons dispuut bekend
              als hét dispuut van Quintus, en niet zonder reden. Delta steekt met kop en schouders uit boven de rest en
              schittert eenzaam aan de top van de spreekwoordelijke apenrots.
            </p>
            <p>
              Het lustrumjaar staat in het teken van verscheidene activiteiten om het lustrum van ons dispuut op
              spectaculaire wijze te vieren. Eén van deze activiteiten is het lustrumgala, waar zowel oudere als jongere
              Deltanen samenkomen om geheel in Deltaanse stijl het dispuut haar verjaardag te beklinken.
            </p>
            <p>
              De dresscode is White Tie, wat inhoudt dat verwacht wordt dat de Deltanen in rokkostuum op het gala zullen
              verschijnen. Voor vragen kunt U altijd contact opnemen met de lustrumgalacommissie.
            </p>
            <p className="letter__sign">
              Hopende U op het lustrumgala te mogen treffen,
              <br />
              <em>Delendum</em>
            </p>
          </Reveal>
          <Reveal>
            <Tabs
              tabs={[
                {
                  label: "Locatie",
                  icon: MapPin,
                  content: (
                    <p className="prose">
                      Het lustrumgala vindt plaats in{" "}
                      <a href="https://kasteeloudwassenaar.eu/" target="_blank" rel="noopener noreferrer">
                        Kasteel Oud-Wassenaar te Wassenaar
                      </a>
                      . Nog geen twintig minuten verwijderd van Leiden, doch volledig afgesloten van de Randstad, waant
                      elke Deltaan zich één nacht koning in deze 19e-eeuwse villa.
                    </p>
                  ),
                },
                {
                  label: "Aanmeldingen",
                  icon: Users,
                  content: (
                    <div className="grid grid--cards">
                      {loading && <Skeleton count={3} />}
                      {data?.map((g) => (
                        <div key={g.id} className="card glass year-card">
                          <div className="year-card__head">
                            <span className="year-card__year">{g.year}</span>
                            <span className="pill">{g.list.length}</span>
                          </div>
                          <ul className="year-card__list">
                            {g.list.map((n) => (
                              <li key={n}>{n}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                      {data && !data.length && <p className="empty">Nog geen aanmeldingen.</p>}
                    </div>
                  ),
                },
                {
                  label: "Video",
                  icon: PlayCircle,
                  content: <Video src="https://www.youtube.com/watch?v=c45Q1ClXKR0" />,
                },
              ]}
            />
          </Reveal>
        </div>
      </section>
    </>
  );
}
