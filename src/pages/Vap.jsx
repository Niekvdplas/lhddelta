import { CalendarDays, Mail, MapPin, Phone, Users } from "lucide-react";
import Seo from "../components/Seo";
import PageHero from "../components/PageHero";
import { Avatar, ErrorState, Reveal, SectionTitle, Skeleton } from "../components/ui";
import { getDkc, getHuidigBestuur, getVaps } from "../lib/api";
import { useAsync } from "../lib/useAsync";

const load = () => Promise.all([getHuidigBestuur(), getDkc(), getVaps()]);

export default function Vap() {
  const { data, loading, error } = useAsync(load);
  const [bestuur, dkc, vaps] = data || [];
  const bestuurNaam = bestuur?.name?.slice(0, bestuur.name.lastIndexOf(" "));

  return (
    <>
      <Seo title="VAP's" description="De VAP's van L.H.D. Delta: de Tiroler, American Fratparty, de Traditiones en meer." />
      <PageHero eyebrow="Voor eerstejaars" title="De VAP's van Delta" subtitle="Bij het mooiste dispuut van Leiden horen de mooiste VAP's." />

      <section className="section section--tight">
        <div className="container container--narrow">
          <Reveal className="letter glass">
            <p className="letter__salutation">Beste vapper,</p>
            <p>
              Nu jij de KMT of de NKT hebt afgerond en je als eerstejaars Quint het komende jaar zal rondlopen op ons
              aller geliefde sociëteit, is de VAP-periode aangebroken. Om het maximale uit je tijd op Quintus te halen
              staan de komende weken in het teken van jouw dispuutskeuze. Niet geheel onbelangrijk, want uiteindelijk
              bepaalt het dispuut waar je bij gaat hoe jij je studentenleven in Leiden invult, en nog belangrijker: met
              wie je het invult.
            </p>
            <p>
              Om deze belangrijke keuze goed te kunnen maken zullen alle disputen komende weken activiteiten en feesten
              organiseren, om te laten zien waar zij voor staan. Delta blijft hierin niet achter en organiseert
              wereldberoemde VAP's, zoals de Tiroler, American Fratparty, de Traditiones en nog veel meer geweldige
              activiteiten, om aan iedereen in Leiden te laten zien dat het Delta is wat de norm op Quintus stelt. Want
              bij het mooiste dispuut van Leiden horen de mooiste VAP's.
            </p>
            <p>
              De DKC, oftewel de Delta Kennismakingscommissie, verzorgt alle VAP's. Voor vragen, goede gesprekken of
              inschrijven voor VAP's dient met hen contact opgenomen te worden. Hieronder vind je hun gegevens en alle
              VAP's met uitleg over de activiteit, datum en plaats.
            </p>
            <p className="letter__sign">
              Met Deltaanse groet,
              <br />
              <strong>{bestuur?.abactis || "De Abactis"}</strong>
              <br />
              <span className="muted">
                Abactis van het {bestuurNaam || "bestuur"} der L.H.D. Delta
              </span>
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section section--alt">
        <div className="container">
          <SectionTitle eyebrow="Kalender" title="De VAP's">
            Schrijf je in via de DKC en zet deze data alvast in je agenda.
          </SectionTitle>
          {error && <ErrorState />}
          <div className="vaps">
            {loading && <Skeleton count={5} className="skeleton-card" />}
            {vaps?.map((v, i) => (
              <Reveal key={v.id} delay={(i % 3) * 80} className="vap glass">
                <div className="vap__num">{String(i + 1).padStart(2, "0")}</div>
                <h3 className="vap__title">{v.name} VAP</h3>
                <div className="vap__meta">
                  <span>
                    <CalendarDays size={14} /> {v.date}
                  </span>
                  <span>
                    <MapPin size={14} /> {v.location}
                  </span>
                </div>
                <p className="vap__desc">{v.description}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionTitle eyebrow={`DKC ${new Date().getFullYear()}`} title="Delta Kennismakingscommissie">
            Voor vragen of contact over de VAP's, het dispuut of aangelegenheden waar geschroefd wordt: schroom niet
            om te bellen of mailen.
          </SectionTitle>
          <div className="dkc">
            {loading && <Skeleton count={2} className="skeleton-person" />}
            {dkc &&
              [
                ["Praeses", dkc.dkcpraeses, dkc.dkcpraesesfoto, dkc.dkcpraesesnummer, dkc.dkcpraesesemail],
                ["Quaestor", dkc.dkcquaestor, dkc.dkcquaestorfoto, dkc.dkcquaestornummer, dkc.dkcquaestoremail],
              ].map(([role, name, foto, tel, mail], i) => (
                <Reveal key={role} delay={i * 100} className="dkc__card glass">
                  <Avatar src={foto} name={name} size={128} />
                  <div className="person__name">{name}</div>
                  <div className="person__role">
                    <Users size={12} /> DKC {role}
                  </div>
                  <div className="dkc__actions">
                    {tel && (
                      <a className="btn btn--ghost btn--sm" href={`tel:${tel.replace(/[^+\d]/g, "")}`}>
                        <Phone size={14} /> {tel}
                      </a>
                    )}
                    {mail && (
                      <a className="btn btn--ghost btn--sm" href={`mailto:${mail}`}>
                        <Mail size={14} /> {mail}
                      </a>
                    )}
                  </div>
                </Reveal>
              ))}
          </div>
        </div>
      </section>
    </>
  );
}
