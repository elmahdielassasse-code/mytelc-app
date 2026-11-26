"use client";

import { useEffect, useState } from "react";

type BriefWritingWorkspaceProps = {
  briefId: number;
  musterAntwort: string;
};

type Notice = {
  kind: "success" | "error";
  text: string;
} | null;

export default function BriefWritingWorkspace({ briefId, musterAntwort }: BriefWritingWorkspaceProps) {
  const storageKey = `mytelc-schreiben-${briefId}`;
  const [draft, setDraft] = useState("");
  const [isStorageReady, setIsStorageReady] = useState(false);
  const [notice, setNotice] = useState<Notice>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const wordCount = draft.split(/\s+/).filter(Boolean).length;
  const counterColor =
    wordCount > 120 ? "text-red-700 animate-pulse" : wordCount > 100 ? "text-amber-600" : "text-green-700";

  useEffect(() => {
    let isCurrent = true;
    Promise.resolve().then(() => {
      if (!isCurrent) return;
      try {
        const savedDraft = window.localStorage.getItem(storageKey);
        if (savedDraft !== null) setDraft(savedDraft);
      } catch {
        setNotice({ kind: "error", text: "Der gespeicherte Brief konnte nicht geladen werden." });
      } finally {
        setIsStorageReady(true);
      }
    });
    return () => {
      isCurrent = false;
    };
  }, [storageKey]);

  function saveDraft() {
    try {
      window.localStorage.setItem(storageKey, draft);
      setNotice({ kind: "success", text: "Dein Brief wurde gespeichert." });
    } catch {
      setNotice({ kind: "error", text: "Der Brief konnte nicht gespeichert werden. Prüfe den Speicherplatz im Browser." });
    }
  }

  function deleteDraft() {
    setDraft("");
    try {
      window.localStorage.removeItem(storageKey);
      setNotice({ kind: "success", text: "Dein Brief wurde gelöscht." });
    } catch {
      setNotice({ kind: "error", text: "Der Brieftext wurde geleert, konnte aber nicht aus dem Browserspeicher gelöscht werden." });
    }
  }

  async function copyAnswer() {
    try {
      if (!navigator.clipboard?.writeText) {
        setNotice({ kind: "error", text: "Kopieren ist in diesem Browser nicht verfügbar." });
        return;
      }
      await navigator.clipboard.writeText(musterAntwort);
      setNotice({ kind: "success", text: "Die Musterantwort wurde kopiert." });
    } catch {
      setNotice({ kind: "error", text: "Die Musterantwort konnte nicht kopiert werden." });
    }
  }

  return (
    <>
      <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <label htmlFor="brief-draft" className="font-black text-slate-900">
            Dein Brief
          </label>
          <p className={`text-sm font-black ${counterColor}`} aria-live="polite">
            Wörter: {wordCount} / 120{wordCount > 120 ? " ⚠️ Zu lang!" : ""}
          </p>
        </div>
        <textarea
          id="brief-draft"
          value={draft}
          onChange={(event) => {
            setDraft(event.target.value);
            setNotice(null);
          }}
          disabled={!isStorageReady}
          placeholder="Schreibe hier deinen Brief... Liebe/r ..."
          rows={14}
          className="min-h-[320px] w-full resize-y rounded-2xl border border-slate-300 bg-slate-50 p-4 leading-7 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-amber-500 focus:bg-white focus:ring-4 focus:ring-amber-100 sm:min-h-[380px]"
        />
        <div className="mt-4 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={saveDraft}
            disabled={!isStorageReady}
            className="rounded-xl bg-emerald-700 px-5 py-3 font-bold text-white shadow-sm transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Speichern
          </button>
          <button
            type="button"
            onClick={deleteDraft}
            disabled={!isStorageReady}
            className="rounded-xl border border-slate-300 bg-white px-5 py-3 font-bold text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Löschen
          </button>
        </div>
        {notice && (
          <p
            role={notice.kind === "error" ? "alert" : "status"}
            className={`mt-4 text-sm font-semibold ${notice.kind === "error" ? "text-red-700" : "text-emerald-700"}`}
          >
            {notice.text}
          </p>
        )}
      </section>

      <section className="mt-8 rounded-3xl border border-emerald-200 bg-white p-5 shadow-sm sm:p-7">
        <h2 className="text-xl font-black text-slate-950 sm:text-2xl">✅ Musterantwort - Zum Vergleichen</h2>
        <button
          type="button"
          aria-expanded={showAnswer}
          onClick={() => setShowAnswer((visible) => !visible)}
          className="mt-4 rounded-xl bg-emerald-700 px-5 py-3 font-bold text-white shadow-sm transition hover:bg-emerald-800 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-200"
        >
          {showAnswer ? "Lösung verbergen" : "Lösung anzeigen"}
        </button>
        {showAnswer && (
          <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:p-6">
            <p className="whitespace-pre-wrap leading-7 text-slate-800">{musterAntwort}</p>
            <button
              type="button"
              onClick={copyAnswer}
              className="mt-5 rounded-xl border border-slate-300 bg-white px-5 py-3 font-bold text-slate-800 transition hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-slate-200"
            >
              Kopieren
            </button>
          </div>
        )}
      </section>
    </>
  );
}
