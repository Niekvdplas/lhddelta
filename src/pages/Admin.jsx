import { useEffect, useState } from "react";
import {
  CalendarPlus,
  Check,
  Film,
  ImagePlus,
  KeyRound,
  LogOut,
  Pencil,
  PartyPopper,
  Plus,
  Sparkles,
  Trash2,
  Trophy,
  UserPlus,
  Users,
} from "lucide-react";
import Seo from "../components/Seo";
import * as m from "../graphql/mutations";
import * as q from "../graphql/queries";
import { gql, uploadPublic } from "../lib/api";
import { sha } from "../lib/auth";
import { ADMIN_PASSWORD_HASH, FOUNDED, PHOTO_UPLOAD_PASSWORD_HASH } from "../lib/config";

/* ----------------------------------------------------------------- helpers */

const uuid = () => crypto.randomUUID();

// Only send fields that exist on the GraphQL input types.
const FIELDS = {
  Jaren: ["id", "members", "name", "year"],
  Vaps: ["id", "num", "location", "date", "name", "description"],
  Pbs: ["id", "movieurl", "location", "date", "movieyear", "history"],
  GalaAanwezigen: ["id", "year", "names"],
};
const pick = (obj, model) => Object.fromEntries(FIELDS[model].map((k) => [k, obj[k]]).filter(([, v]) => v !== undefined));

function romanize(num) {
  const key = ["", "C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM", "", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC", "", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"];
  const digits = String(+num).split("");
  let roman = "";
  let i = 3;
  while (i--) roman = (key[+digits.pop() + i * 10] || "") + roman;
  return "M".repeat(+digits.join("") || 0) + roman;
}

// "A.B. Jansen (Piet)" -> "jansen"
const lastNameKey = (s) => s.replace(/\s*\(.*\)\s*$/, "").trim().split(/\s+/).pop().toLowerCase();
const memberString = (members) =>
  members
    .map((s) => s.trim())
    .filter(Boolean)
    .sort((a, b) => lastNameKey(a).localeCompare(lastNameKey(b)))
    .join(";") + ";";

const ext = (file) => (file?.name?.split(".").pop() || "png").toLowerCase();

/* -------------------------------------------------------------- primitives */

function Field({ label, hint, ...props }) {
  const Tag = props.rows ? "textarea" : "input";
  return (
    <label className="field">
      <span className="field__label">{label}</span>
      <span className="field__control">
        <Tag {...props} />
      </span>
      {hint && <span className="field__hint">{hint}</span>}
    </label>
  );
}

function FileField({ label, onChange, file }) {
  const preview = file ? URL.createObjectURL(file) : null;
  return (
    <label className="file">
      {preview ? <img src={preview} alt="" /> : <ImagePlus size={20} />}
      <span>{file ? file.name : label}</span>
      <input type="file" accept="image/*" onChange={(e) => onChange(e.target.files[0])} hidden />
    </label>
  );
}

function Panel({ title, description, children, onSubmit, submitLabel, busy }) {
  return (
    <form
      className="admin__panel glass"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      <h2 className="display display--sm">{title}</h2>
      {description && <p className="muted">{description}</p>}
      <div className="admin__fields">{children}</div>
      {submitLabel && (
        <div className="admin__submit">
          <button className="btn btn--primary" disabled={busy}>
            {busy ? "Bezig…" : submitLabel}
          </button>
        </div>
      )}
    </form>
  );
}

/* ------------------------------------------------------------------ panels */

function NieuwJaar({ run, busy }) {
  const empty = { firstname: "", lastname: "", initials: "" };
  const [year, setYear] = useState(new Date().getFullYear());
  const [name, setName] = useState("sjaerzen");
  const [leden, setLeden] = useState([{ ...empty }]);
  const set = (i, k, v) => setLeden((l) => l.map((x, j) => (j === i ? { ...x, [k]: v } : x)));

  return (
    <Panel
      title="Nieuw jaar"
      description="Voeg een nieuwe lichting toe aan de ledenlijst."
      submitLabel="Voeg jaar toe"
      busy={busy}
      onSubmit={() =>
        run(async () => {
          const valid = leden.filter((l) => l.lastname.trim());
          for (const l of valid) {
            await gql(m.createLeden, {
              input: { id: uuid(), full_name: l.firstname, last_name: l.lastname, initials: l.initials },
            });
          }
          const members = valid.map((l) => `${l.initials} ${l.lastname} (${l.firstname})`);
          await gql(m.createJaren, { input: { id: uuid(), members: memberString(members), year: +year, name } });
          setLeden([{ ...empty }]);
        }, `Jaar ${year} toegevoegd`)
      }
    >
      <div className="admin__row">
        <Field label="Jaar van toelating" type="number" value={year} onChange={(e) => setYear(e.target.value)} required />
        <Field label="Naam jaarclub" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      {leden.map((l, i) => (
        <div className="admin__row admin__row--member" key={i}>
          <Field label="Voor-/roepnaam" value={l.firstname} onChange={(e) => set(i, "firstname", e.target.value)} />
          <Field label="Volledige achternaam" value={l.lastname} onChange={(e) => set(i, "lastname", e.target.value)} />
          <Field label="Initialen" value={l.initials} onChange={(e) => set(i, "initials", e.target.value)} />
          <button
            type="button"
            className="icon-btn"
            disabled={leden.length === 1}
            onClick={() => setLeden((x) => x.filter((_, j) => j !== i))}
            aria-label="Verwijder lid"
          >
            <Trash2 size={16} />
          </button>
        </div>
      ))}
      <button type="button" className="btn btn--ghost btn--sm" onClick={() => setLeden((x) => [...x, { ...empty }])}>
        <Plus size={14} /> Lid toevoegen
      </button>
    </Panel>
  );
}

function VeranderJaar({ run, busy }) {
  const [jaren, setJaren] = useState([]);
  const [sel, setSel] = useState(null);

  useEffect(() => {
    gql(q.listJarens, { limit: 1000 }).then((d) =>
      setJaren(d.listJarens.items.sort((a, b) => b.year - a.year || new Date(a.createdAt) - new Date(b.createdAt)))
    );
  }, []);

  const choose = (id) => {
    const j = jaren.find((x) => x.id === id);
    setSel(j ? { ...j, list: j.members.split(";").filter(Boolean) } : null);
  };
  const setMember = (i, v) => setSel((s) => ({ ...s, list: s.list.map((x, j) => (j === i ? v : x)) }));

  return (
    <Panel
      title="Verander jaar"
      description="Pas de naam of leden van een bestaande lichting aan. Laat een veld leeg om dat lid te verwijderen."
      submitLabel={sel ? "Sla jaar op" : null}
      busy={busy}
      onSubmit={() =>
        run(async () => {
          const input = pick({ ...sel, members: memberString(sel.list) }, "Jaren");
          await gql(m.updateJaren, { input });
          setJaren((js) => js.map((j) => (j.id === sel.id ? { ...j, ...input } : j)));
        }, `Jaar ${sel.year} bijgewerkt`)
      }
    >
      <label className="field">
        <span className="field__label">Kies jaar</span>
        <span className="field__control">
          <select value={sel?.id || ""} onChange={(e) => choose(e.target.value)}>
            <option value="">— selecteer —</option>
            {jaren.map((j) => (
              <option key={j.id} value={j.id}>
                {j.year} · {j.name || "zonder naam"}
              </option>
            ))}
          </select>
        </span>
      </label>
      {sel && (
        <>
          <Field label="Naam jaarclub" value={sel.name || ""} onChange={(e) => setSel({ ...sel, name: e.target.value })} />
          <div className="admin__members">
            {sel.list.map((x, i) => (
              <Field key={i} label={`Lid ${i + 1}`} value={x} onChange={(e) => setMember(i, e.target.value)} />
            ))}
          </div>
          <button type="button" className="btn btn--ghost btn--sm" onClick={() => setSel({ ...sel, list: [...sel.list, ""] })}>
            <Plus size={14} /> Lid toevoegen
          </button>
        </>
      )}
    </Panel>
  );
}

function FotoUpload({ run, busy }) {
  const [files, setFiles] = useState([]);
  return (
    <Panel
      title="Foto's uploaden"
      description="Geüploade foto's verschijnen direct op de publieke Foto's-pagina."
      submitLabel={files.length ? `Upload ${files.length} foto${files.length > 1 ? "'s" : ""}` : null}
      busy={busy}
      onSubmit={() =>
        run(async () => {
          for (const f of files) await uploadPublic(`${uuid()}.${ext(f)}`, f);
          setFiles([]);
        }, "Foto's geüpload")
      }
    >
      <label className="dropzone">
        <ImagePlus size={28} />
        <span>Klik om foto's te kiezen</span>
        <input type="file" accept="image/*" multiple hidden onChange={(e) => setFiles([...e.target.files])} />
      </label>
      {!!files.length && (
        <div className="thumbs">
          {files.map((f) => (
            <img key={f.name + f.size} src={URL.createObjectURL(f)} alt={f.name} />
          ))}
        </div>
      )}
    </Panel>
  );
}

function NieuwBestuur({ run, busy }) {
  const init = () => ({ praeses: "", quaestor: "", abactis: "", assessor: "", abmail: "", seq_num: new Date().getFullYear() - FOUNDED });
  const [b, setB] = useState(init);
  const [files, setFiles] = useState({});
  const set = (k) => (e) => setB({ ...b, [k]: e.target.value });
  const surname = b.praeses.slice(b.praeses.indexOf(" ") + 1);
  const name = `${romanize(+b.seq_num + 1)}ste Bestuur ${surname}`;

  const roles = [
    ["praeses", "pfoto", "Praeses", "bijv. G.A. Heunen"],
    ["quaestor", "qfoto", "Quaestor"],
    ["abactis", "abfoto", "Abactis"],
    ["assessor", "assfoto", "Assessor"],
  ];

  return (
    <Panel
      title="Nieuw bestuur"
      description={b.praeses ? `Wordt opgeslagen als: ${name}` : "Het nieuwe bestuur verschijnt direct op de homepage."}
      submitLabel="Installeer bestuur"
      busy={busy}
      onSubmit={() =>
        run(async () => {
          const input = { ...b, id: uuid(), name, seq_num: +b.seq_num };
          for (const [, foto] of roles) {
            if (files[foto]) input[foto] = await uploadPublic(`${uuid().replace(/-/g, "")}.${ext(files[foto])}`, files[foto]);
          }
          await gql(m.createBesturen, { input });
          setB(init());
          setFiles({});
        }, "Nieuw bestuur geïnstalleerd")
      }
    >
      <div className="admin__grid">
        {roles.map(([k, foto, label, ph]) => (
          <div key={k} className="admin__person">
            <Field label={label} placeholder={ph} value={b[k]} onChange={set(k)} required={k !== "assessor"} />
            <FileField label={`Foto ${label.toLowerCase()}`} file={files[foto]} onChange={(f) => setFiles({ ...files, [foto]: f })} />
          </div>
        ))}
      </div>
      <div className="admin__row">
        <Field label="E-mailadres abactis" type="email" value={b.abmail} onChange={set("abmail")} />
        <Field label="Volgnummer (jaar − 1979)" type="number" value={b.seq_num} onChange={set("seq_num")} />
      </div>
    </Panel>
  );
}

function NieuweDkc({ run, busy }) {
  const init = () => ({ dkcpraeses: "", dkcpraesesemail: "", dkcpraesesnummer: "", dkcquaestor: "", dkcquaestoremail: "", dkcquaestornummer: "" });
  const [d, setD] = useState(init);
  const [files, setFiles] = useState({});
  const set = (k) => (e) => setD({ ...d, [k]: e.target.value });
  return (
    <Panel
      title="Nieuwe DKC"
      description="De DKC verschijnt op de VAP-pagina."
      submitLabel="Sla DKC op"
      busy={busy}
      onSubmit={() =>
        run(async () => {
          const input = { ...d, id: uuid() };
          for (const k of ["dkcpraesesfoto", "dkcquaestorfoto"]) {
            if (files[k]) input[k] = await uploadPublic(`${uuid().replace(/-/g, "")}.${ext(files[k])}`, files[k]);
          }
          await gql(m.createOverig, { input });
          setD(init());
          setFiles({});
        }, "DKC opgeslagen")
      }
    >
      <div className="admin__grid admin__grid--2">
        {[
          ["praeses", "Praeses"],
          ["quaestor", "Quaestor"],
        ].map(([k, label]) => (
          <div key={k} className="admin__person">
            <Field label={`DKC ${label}`} value={d[`dkc${k}`]} onChange={set(`dkc${k}`)} required />
            <Field label="E-mail" type="email" value={d[`dkc${k}email`]} onChange={set(`dkc${k}email`)} />
            <Field label="Telefoonnummer" value={d[`dkc${k}nummer`]} onChange={set(`dkc${k}nummer`)} />
            <FileField label="Foto" file={files[`dkc${k}foto`]} onChange={(f) => setFiles({ ...files, [`dkc${k}foto`]: f })} />
          </div>
        ))}
      </div>
    </Panel>
  );
}

function Gala({ run, busy }) {
  const [year, setYear] = useState("");
  const [naam, setNaam] = useState("");
  return (
    <Panel
      title="Gala-aanmeldingen"
      description="Voegt de naam toe aan het opgegeven jaar, of verwijdert hem als hij er al in staat."
      submitLabel="Toevoegen / verwijderen"
      busy={busy}
      onSubmit={() =>
        run(async () => {
          const { listGalaAanwezigens } = await gql(q.listGalaAanwezigens, { limit: 1000 });
          const entry = listGalaAanwezigens.items.find((g) => String(g.year) === String(year));
          if (!entry) {
            await gql(m.createGalaAanwezigen, { input: { id: uuid(), names: naam, year: +year } });
            return;
          }
          let names = entry.names.split(";").filter(Boolean);
          names = names.includes(naam) ? names.filter((n) => n !== naam) : [...names, naam];
          await gql(m.updateGalaAanwezigen, {
            input: pick({ ...entry, names: memberString(names).slice(0, -1) }, "GalaAanwezigen"),
          });
        }, "Gala-lijst bijgewerkt")
      }
    >
      <div className="admin__row">
        <Field label="Jaar" type="number" value={year} onChange={(e) => setYear(e.target.value)} required />
        <Field label="Achternaam" value={naam} onChange={(e) => setNaam(e.target.value)} required />
      </div>
    </Panel>
  );
}

function Vaps({ run, busy }) {
  const [vaps, setVaps] = useState(null);
  useEffect(() => {
    gql(q.listVapss, { limit: 100 }).then((d) => setVaps(d.listVapss.items.sort((a, b) => a.num - b.num)));
  }, []);
  const set = (i, k) => (e) => setVaps((vs) => vs.map((v, j) => (j === i ? { ...v, [k]: e.target.value } : v)));
  return (
    <Panel
      title="VAP's"
      description="Werk de naam, datum, locatie en beschrijving van de VAP's bij."
      submitLabel="Sla VAP's op"
      busy={busy}
      onSubmit={() =>
        run(async () => {
          for (const v of vaps) await gql(m.updateVaps, { input: pick(v, "Vaps") });
        }, "VAP's opgeslagen")
      }
    >
      {!vaps && <div className="skeleton skeleton-card" />}
      {vaps?.map((v, i) => (
        <fieldset key={v.id} className="admin__fieldset">
          <legend>VAP {i + 1}</legend>
          <div className="admin__row">
            <Field label="Naam" value={v.name} onChange={set(i, "name")} />
            <Field label="Datum" value={v.date} onChange={set(i, "date")} />
            <Field label="Locatie" value={v.location} onChange={set(i, "location")} />
          </div>
          <Field label="Beschrijving" rows={4} value={v.description} onChange={set(i, "description")} />
        </fieldset>
      ))}
    </Panel>
  );
}

function PlaybackInfo({ run, busy }) {
  const [pb, setPb] = useState(null);
  useEffect(() => {
    gql(q.listPbss, { limit: 100 }).then((d) =>
      setPb(d.listPbss.items.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0] || null)
    );
  }, []);
  const set = (k) => (e) => setPb({ ...pb, [k]: e.target.value });
  return (
    <Panel
      title="Playback-info"
      description="De film, datum, locatie en geschiedenis op de Playback-pagina."
      submitLabel={pb ? "Sla op" : null}
      busy={busy}
      onSubmit={() => run(() => gql(m.updatePbs, { input: pick(pb, "Pbs") }), "Playback-info opgeslagen")}
    >
      {!pb && <div className="skeleton skeleton-card" />}
      {pb && (
        <>
          <div className="admin__row">
            <Field label="Film-URL (YouTube/Vimeo)" value={pb.movieurl} onChange={set("movieurl")} />
            <Field label="Jaar van de film" value={pb.movieyear} onChange={set("movieyear")} />
          </div>
          <div className="admin__row">
            <Field label="Datum" value={pb.date} onChange={set("date")} />
            <Field label="Locatie" value={pb.location} onChange={set("location")} />
          </div>
          <Field label="Geschiedenis" rows={10} value={pb.history} onChange={set("history")} />
        </>
      )}
    </Panel>
  );
}

function DpbWinnaar({ run, busy }) {
  const [winner, setWinner] = useState("");
  const [year, setYear] = useState(new Date().getFullYear());
  return (
    <Panel
      title="Nieuwe DPB-winnaar"
      description="Typ 'afgelast' als de DPB niet is doorgegaan."
      submitLabel="Voeg winnaar toe"
      busy={busy}
      onSubmit={() =>
        run(async () => {
          const cancelled = winner.trim().toLowerCase() === "afgelast" ? "t" : "f";
          await gql(m.createPlayback, { input: { id: uuid(), cancelled, winner, year: +year } });
          setWinner("");
        }, "Winnaar toegevoegd")
      }
    >
      <div className="admin__row">
        <Field label="Winnaar" value={winner} onChange={(e) => setWinner(e.target.value)} required />
        <Field label="Jaar" type="number" value={year} onChange={(e) => setYear(e.target.value)} required />
      </div>
    </Panel>
  );
}

/* -------------------------------------------------------------------- page */

const PANELS = [
  { id: "jaar", label: "Nieuw jaar", icon: CalendarPlus, C: NieuwJaar },
  { id: "editjaar", label: "Verander jaar", icon: Pencil, C: VeranderJaar },
  { id: "bestuur", label: "Nieuw bestuur", icon: Users, C: NieuwBestuur },
  { id: "dkc", label: "Nieuwe DKC", icon: UserPlus, C: NieuweDkc },
  { id: "vaps", label: "VAP's", icon: PartyPopper, C: Vaps },
  { id: "pb", label: "Playback-info", icon: Film, C: PlaybackInfo },
  { id: "winnaar", label: "DPB-winnaar", icon: Trophy, C: DpbWinnaar },
  { id: "gala", label: "Gala", icon: Sparkles, C: Gala },
  { id: "foto", label: "Foto's uploaden", icon: ImagePlus, C: FotoUpload, photo: true },
];

export default function Admin() {
  const [role, setRole] = useState(null); // "admin" | "photo"
  const [pw, setPw] = useState("");
  const [err, setErr] = useState(false);
  const [active, setActive] = useState("jaar");
  const [busy, setBusy] = useState(false);
  const [toast, setToast] = useState(null);

  const login = async (e) => {
    e.preventDefault();
    const h = await sha("SHA-512", pw);
    if (h === ADMIN_PASSWORD_HASH) setRole("admin");
    else if (h === PHOTO_UPLOAD_PASSWORD_HASH) {
      setRole("photo");
      setActive("foto");
    } else setErr(true);
  };

  const run = async (fn, success) => {
    setBusy(true);
    try {
      await fn();
      setToast({ ok: true, text: success });
    } catch (e) {
      console.error(e);
      setToast({ ok: false, text: "Er ging iets mis: " + (e?.errors?.[0]?.message || e?.message || "onbekende fout") });
    } finally {
      setBusy(false);
      setTimeout(() => setToast(null), 4000);
    }
  };

  if (!role) {
    return (
      <section className="gate">
        <Seo title="Beheer" noindex />
        <div className="gate__glow" aria-hidden />
        <form className={`gate__card glass ${err ? "shake" : ""}`} onSubmit={login} onAnimationEnd={() => setErr(false)}>
          <div className="eyebrow">Beheer</div>
          <h1 className="display display--sm">Admin panel</h1>
          <label className="field">
            <span className="field__label">Wachtwoord</span>
            <span className="field__control">
              <KeyRound size={18} className="field__icon" />
              <input type="password" value={pw} onChange={(e) => setPw(e.target.value)} autoFocus />
            </span>
          </label>
          <button className="btn btn--primary btn--block" disabled={!pw}>
            Inloggen
          </button>
        </form>
      </section>
    );
  }

  const panels = PANELS.filter((p) => role === "admin" || p.photo);
  const Current = (panels.find((p) => p.id === active) || panels[0]).C;

  return (
    <section className="section admin">
      <Seo title="Beheer" noindex />
      <div className="container admin__layout">
        <aside className="admin__nav glass">
          <div className="eyebrow">Beheer</div>
          {panels.map((p) => (
            <button key={p.id} className={`admin__navbtn ${active === p.id ? "is-active" : ""}`} onClick={() => setActive(p.id)}>
              <p.icon size={16} /> {p.label}
            </button>
          ))}
          <button className="admin__navbtn admin__logout" onClick={() => setRole(null)}>
            <LogOut size={16} /> Uitloggen
          </button>
        </aside>
        <div className="admin__main">
          <Current key={active} run={run} busy={busy} />
        </div>
      </div>
      {toast && (
        <div className={`toast ${toast.ok ? "toast--ok" : "toast--err"}`} role="status">
          {toast.ok && <Check size={16} />} {toast.text}
        </div>
      )}
    </section>
  );
}
