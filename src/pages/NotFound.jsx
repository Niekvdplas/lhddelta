import { Link } from "react-router-dom";
import Seo from "../components/Seo";
import PageHero from "../components/PageHero";

export default function NotFound() {
  return (
    <>
      <Seo title="Niet gevonden" noindex />
      <PageHero eyebrow="404" title="Deze pagina bestaat niet" subtitle="Misschien is hij geschroefd.">
        <Link to="/" className="btn btn--primary">
          Terug naar home
        </Link>
      </PageHero>
    </>
  );
}
