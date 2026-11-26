"use client";

import { useEffect, useState, useSyncExternalStore, type FormEvent } from "react";

type ExperienceTopics = {
  lesen: string;
  hoeren: string;
  schreiben: string;
  sprechen: string;
};

type TasribatExperience = {
  id: string;
  name: string;
  center: string;
  examDate: string;
  topics: ExperienceTopics;
  rating: number;
  createdAt: string;
};

type ExperienceForm = {
  name: string;
  anonymous: boolean;
  center: string;
  examDate: string;
  topics: ExperienceTopics;
  rating: number;
};

const initialForm: ExperienceForm = {
  name: "",
  anonymous: false,
  center: "",
  examDate: "",
  topics: { lesen: "", hoeren: "", schreiben: "", sprechen: "" },
  rating: 0,
};

const topicLabels: { key: keyof ExperienceTopics; label: string }[] = [
  { key: "lesen", label: "Lesen" },
  { key: "hoeren", label: "Hören" },
  { key: "schreiben", label: "Schreiben" },
  { key: "sprechen", label: "Sprechen" },
];

const STORAGE_KEY = "mytelc-tasribat-experiences";
const STORAGE_UNAVAILABLE = "\u0000storage-unavailable";
const experienceSubscribers = new Set<() => void>();

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isExperience(value: unknown): value is TasribatExperience {
  if (!isRecord(value)) return false;
  const topics = value.topics;
  if (!isRecord(topics)) return false;
  return (
    typeof value.id === "string" &&
    typeof value.name === "string" &&
    typeof value.center === "string" &&
    typeof value.examDate === "string" &&
    typeof value.createdAt === "string" &&
    typeof value.rating === "number" &&
    topicLabels.every(({ key }) => typeof topics[key] === "string")
  );
}

function isExperienceList(value: unknown): value is TasribatExperience[] {
  return Array.isArray(value) && value.every(isExperience);
}

function subscribeToExperiences(listener: () => void) {
  if (typeof window === "undefined") return () => {};
  experienceSubscribers.add(listener);
  const onStorage = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY || event.key === null) listener();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    experienceSubscribers.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

function getExperienceSnapshot() {
  if (typeof window === "undefined") return "[]";
  try {
    return window.localStorage.getItem(STORAGE_KEY) ?? "[]";
  } catch {
    return STORAGE_UNAVAILABLE;
  }
}

function getServerExperienceSnapshot() {
  return "[]";
}

function storeExperiences(experiences: TasribatExperience[]) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(experiences));
  experienceSubscribers.forEach((listener) => listener());
}

function parseExperienceSnapshot(snapshot: string): { experiences: TasribatExperience[]; error: string } {
  if (snapshot === STORAGE_UNAVAILABLE) {
    return { experiences: [], error: "Le stockage local est inaccessible dans ce navigateur." };
  }
  try {
    const saved: unknown = JSON.parse(snapshot);
    if (!isExperienceList(saved)) {
      return { experiences: [], error: "Les expériences sauvegardées dans ce navigateur sont invalides." };
    }
    return { experiences: saved, error: "" };
  } catch {
    return { experiences: [], error: "Les expériences sauvegardées dans ce navigateur sont illisibles." };
  }
}

function displayDate(date: string): string {
  const parsed = new Date(`${date}T00:00:00.000Z`);
  return new Intl.DateTimeFormat("fr-FR", { dateStyle: "long", timeZone: "UTC" }).format(parsed);
}

export default function TasribatExperiences() {
  const snapshot = useSyncExternalStore(
    subscribeToExperiences,
    getExperienceSnapshot,
    getServerExperienceSnapshot,
  );
  const { experiences, error: storageError } = parseExperienceSnapshot(snapshot);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState<ExperienceForm>(initialForm);
  const [formError, setFormError] = useState("");

  useEffect(() => {
    if (!isModalOpen) return;
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setIsModalOpen(false);
    }
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [isModalOpen]);

  function submitExperience(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError("");
    if (storageError) {
      setFormError(storageError);
      return;
    }
    if (!form.rating) {
      setFormError("Choisis une note entre 1 et 5 étoiles.");
      return;
    }
    if (topicLabels.every(({ key }) => !form.topics[key].trim())) {
      setFormError("Ajoute au moins un détail sur les épreuves.");
      return;
    }

    try {
      const experience: TasribatExperience = {
        id: crypto.randomUUID(),
        name: form.anonymous ? "Anonyme" : form.name.trim(),
        center: form.center.trim(),
        examDate: form.examDate,
        topics: {
          lesen: form.topics.lesen.trim(),
          hoeren: form.topics.hoeren.trim(),
          schreiben: form.topics.schreiben.trim(),
          sprechen: form.topics.sprechen.trim(),
        },
        rating: form.rating,
        createdAt: new Date().toISOString(),
      };
      storeExperiences([experience, ...experiences]);
      setForm(initialForm);
      setIsModalOpen(false);
    } catch (error) {
      setFormError(
        error instanceof DOMException && error.name === "QuotaExceededError"
          ? "Le stockage du navigateur est plein. Libère de l’espace puis réessaie."
          : "Impossible de sauvegarder l’expérience dans ce navigateur.",
      );
    }
  }

  return (
    <section
      id="partage-experience"
      className="mx-auto w-full max-w-[1080px] scroll-mt-28 px-6 py-16 sm:py-20"
    >
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-sm font-black uppercase tracking-[0.18em] text-violet-700">
          COMMUNAUTÉ MYTELC
        </p>
        <h1 className="mt-4 text-3xl font-black tracking-tight text-[#0A2540] sm:text-4xl">
          Partage ton expérience TELC B1
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
          Raconte ce qui est tombé à ton examen pour aider les prochains candidats.
        </p>
        <button
          type="button"
          onClick={() => {
            setFormError("");
            setIsModalOpen(true);
          }}
          className="mt-7 inline-flex min-h-14 items-center justify-center rounded-2xl bg-gradient-to-r from-[#f97316] to-[#e11d48] px-7 py-4 text-base font-black text-white shadow-[0_12px_30px_rgba(225,29,72,0.24)] transition hover:-translate-y-0.5 hover:shadow-[0_16px_36px_rgba(225,29,72,0.32)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-600"
        >
          شارك معنا تجربتك
        </button>
      </div>

      <div className="mx-auto mt-10 max-w-5xl">
        {storageError ? (
          <p role="alert" className="rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-800">
            {storageError}
          </p>
        ) : experiences.length > 0 ? (
          <div className="grid gap-5">
            {experiences.map((experience) => (
              <article
                key={experience.id}
                className="rounded-3xl border border-amber-100 bg-white p-6 shadow-[0_14px_38px_rgba(15,23,42,0.07)] sm:p-8"
              >
                <div className="flex flex-col gap-4 border-b border-slate-100 pb-5 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h3 className="text-xl font-black text-[#0A2540]">{experience.name}</h3>
                    <p className="mt-1 text-sm font-semibold text-slate-600">
                      {experience.center} <span className="mx-1 text-slate-300">·</span> {displayDate(experience.examDate)}
                    </p>
                  </div>
                  <div
                    className="inline-flex w-fit items-center gap-1 rounded-full bg-amber-50 px-3 py-1.5 text-lg leading-none text-amber-500"
                    role="img"
                    aria-label={`${experience.rating} sur 5 étoiles`}
                  >
                    {Array.from({ length: 5 }, (_, index) => (
                      <span key={index} aria-hidden="true" className={index < experience.rating ? "" : "text-slate-200"}>
                        ★
                      </span>
                    ))}
                  </div>
                </div>
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  {topicLabels.map(({ key, label }) => (
                    <div key={key} className="rounded-2xl bg-[#faf9f6] p-4">
                      <h4 className="text-xs font-black uppercase tracking-[0.12em] text-violet-700">{label}</h4>
                      <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-slate-700">
                        {experience.topics[key] || "Aucun détail partagé"}
                      </p>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-dashed border-amber-300 bg-white/70 px-6 py-10 text-center">
            <p className="text-lg font-bold text-[#0A2540]">Pas encore d’expérience partagée.</p>
          </div>
        )}
      </div>

      {isModalOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-end justify-center bg-slate-950/55 p-0 backdrop-blur-sm sm:items-center sm:p-5"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setIsModalOpen(false);
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="experience-dialog-title"
            className="max-h-[94vh] w-full max-w-2xl overflow-y-auto rounded-t-[28px] border border-white/70 bg-gradient-to-br from-white to-[#faf7ef] p-5 shadow-[0_28px_90px_rgba(15,23,42,0.3)] sm:rounded-[28px] sm:p-8"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.16em] text-amber-700">Communauté MyTelc</p>
                <h3 id="experience-dialog-title" className="mt-2 text-2xl font-black text-[#0A2540]">
                  شارك معنا تجربتك
                </h3>
                <p className="mt-2 text-sm text-slate-600">L’expérience sera conservée dans ce navigateur.</p>
              </div>
              <button
                type="button"
                aria-label="Fermer le formulaire"
                onClick={() => setIsModalOpen(false)}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xl font-bold text-slate-600 transition hover:bg-rose-100 hover:text-rose-700 disabled:opacity-50"
              >
                ×
              </button>
            </div>

            <form onSubmit={submitExperience} className="mt-6 space-y-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block text-sm font-bold text-slate-700">
                  Smiytek / Nom
                  <input
                    value={form.name}
                    onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
                    disabled={form.anonymous}
                    required={!form.anonymous}
                    maxLength={80}
                    autoComplete="name"
                    className="mt-2 min-h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium outline-none transition focus:border-amber-400 focus:ring-4 focus:ring-amber-100 disabled:bg-slate-100"
                    placeholder="Ton nom"
                  />
                </label>
                <label className="block text-sm font-bold text-slate-700">
                  Fin dewzti lmtihan ? / Centre
                  <input
                    value={form.center}
                    onChange={(event) => setForm((current) => ({ ...current, center: event.target.value }))}
                    required
                    minLength={2}
                    maxLength={120}
                    className="mt-2 min-h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium outline-none transition focus:border-amber-400 focus:ring-4 focus:ring-amber-100 disabled:bg-slate-100"
                    placeholder="Ville ou centre d’examen"
                  />
                </label>
              </div>

              <label className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white/80 px-4 py-3 text-sm font-semibold text-slate-700">
                <input
                  type="checkbox"
                  checked={form.anonymous}
                  onChange={(event) => setForm((current) => ({ ...current, anonymous: event.target.checked }))}
                  className="h-4 w-4 accent-violet-700"
                />
                Publier en Anonyme
              </label>

              <label className="block max-w-xs text-sm font-bold text-slate-700">
                Imta dewzti ? / Date
                <input
                  type="date"
                  value={form.examDate}
                  onChange={(event) => setForm((current) => ({ ...current, examDate: event.target.value }))}
                  required
                  className="mt-2 min-h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium outline-none transition focus:border-amber-400 focus:ring-4 focus:ring-amber-100 disabled:bg-slate-100"
                />
              </label>

              <fieldset>
                <legend className="text-sm font-bold text-slate-700">
                  Chno t7at lik f Lesen / Hören / Schreiben / Sprechen ?
                </legend>
                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  {topicLabels.map(({ key, label }) => (
                    <label key={key} className="block text-xs font-black uppercase tracking-[0.1em] text-violet-700">
                      {label}
                      <textarea
                        value={form.topics[key]}
                        onChange={(event) =>
                          setForm((current) => ({
                            ...current,
                            topics: { ...current.topics, [key]: event.target.value },
                          }))
                        }
                        maxLength={1000}
                        rows={3}
                        className="mt-2 w-full resize-y rounded-xl border border-slate-200 bg-white p-3 text-sm font-medium normal-case tracking-normal text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-amber-400 focus:ring-4 focus:ring-amber-100 disabled:bg-slate-100"
                        placeholder={`Qu’est-ce qui est tombé en ${label} ?`}
                      />
                    </label>
                  ))}
                </div>
              </fieldset>

              <fieldset>
                <legend className="text-sm font-bold text-slate-700">Donne une note à ton expérience</legend>
                <div className="mt-2 flex items-center gap-1">
                  {Array.from({ length: 5 }, (_, index) => {
                    const rating = index + 1;
                    return (
                      <button
                        key={rating}
                        type="button"
                        aria-label={`${rating} ${rating === 1 ? "étoile" : "étoiles"}`}
                        aria-pressed={form.rating === rating}
                        onClick={() => setForm((current) => ({ ...current, rating }))}
                        className={`rounded-lg px-1 text-4xl leading-none transition hover:scale-110 disabled:opacity-50 ${
                          rating <= form.rating ? "text-amber-400" : "text-slate-300"
                        }`}
                      >
                        ★
                      </button>
                    );
                  })}
                  <span className="ml-2 text-sm font-semibold text-slate-500">
                    {form.rating ? `${form.rating} / 5` : "Choisis une note"}
                  </span>
                </div>
              </fieldset>

              {formError && (
                <p role="alert" className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-800">
                  {formError}
                </p>
              )}

              <div className="flex flex-col-reverse gap-3 border-t border-slate-200 pt-5 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="min-h-12 rounded-xl border border-slate-200 bg-white px-5 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="min-h-12 rounded-xl bg-gradient-to-r from-[#f97316] to-[#e11d48] px-6 text-sm font-black text-white shadow-lg shadow-rose-200 transition hover:brightness-105"
                >
                  Publier mon expérience
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
