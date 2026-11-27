"use client";

import { useEffect, useState } from "react";

type Props = {
  briefId: number;
  musterAntwort: string;
};

type Notice = { kind: "success" | "error"; text: string } | null;

function getScore(correction: string, label: string) {
  const m = correction.match(new RegExp(label + ":\\s*(\\d+)"));
  return m ? m[1] : "-";
}

export default function BriefWritingWorkspace({ briefId, musterAntwort }: Props) {
  const storageKey = `mytelc-schreiben-${briefId}`;
  const [draft, setDraft] = useState("");
  const [isStorageReady, setIsStorageReady] = useState(false);
  const [notice, setNotice] = useState<Notice>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [correction, setCorrection] = useState("");
  const [isCorrecting, setIsCorrecting] = useState(false);
  const wordCount = draft.split(/\s+/).filter(Boolean).length;
  const counterColor = wordCount > 120 ? "text-red-700 animate-pulse" : wordCount > 100 ? "text-amber-600" : "text-green-700";

  async function handleCorrect() {
    if (!draft.trim()) return;
    setIsCorrecting(true);
    setCorrection("");
    try {
      const res = await fetch("/api/correct", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: draft, brief: briefId, task: musterAntwort }),
      });
      const data = await res.json();
      setCorrection(data.correction || "Ma jatch t-s7i7, 3awd jereb");
    } catch {
      setCorrection("Kain mochkil f connexion");
    }
    setIsCorrecting(false);
  }

  useEffect(() => {
    let isCurrent = true;
    Promise.resolve().then(() => {
      if (!isCurrent) return;
      try {
        const saved = window.localStorage.getItem(storageKey);
        if (saved !== null) setDraft(saved);
      } catch {
        setNotice({ kind: "error", text: "Der gespeicherte Brief konnte nicht geladen werden." });
      } finally {
        setIsStorageReady(true);
      }
    });
    return () => { isCurrent = false; };
  }, [storageKey]);

  function saveDraft() {
    try {
      window.localStorage.setItem(storageKey, draft);
      setNotice({ kind: "success", text: "Dein Brief wurde gespeichert." });
    } catch {
      setNotice({ kind: "error", text: "Der Brief konnte nicht gespeichert werden." });
    }
  }

  function deleteDraft() {
    setDraft("");
    try {
      window.localStorage.removeItem(storageKey);
      setNotice({ kind: "success", text: "Dein Brief wurde geloescht." });
    } catch {
      setNotice({ kind: "error", text: "Der Brieftext wurde geleert." });
    }
  }

  async function copyAnswer() {
    try {
      await navigator.clipboard.writeText(musterAntwort);
      setNotice({ kind: "success", text: "Die Musterantwort wurde kopiert." });
    } catch {
      setNotice({ kind: "error", text: "Kopieren ist in diesem Browser nicht verfuegbar." });
    }
  }

  const gesamt = getScore(correction, "GESAMT");
  const inhalt = getScore(correction, "INHALT");
  const gestaltung = getScore(correction, "GESTALTUNG");
  const korrektheit = getScore(correction, "KORREKTHEIT");
  const scoreNum = parseInt(gesamt) || 0;
  const color = scoreNum >= 27 ? "#16a34a" : scoreNum >= 15 ? "#f59e0b" : "#dc2626";
  const cleanText = correction.replace(/INHALT:.*/, "").replace(/GESTALTUNG:.*/, "").replace(/KORREKTHEIT:.*/, "").replace(/GESAMT:.*/, "").trim();

  return (
    <>
      <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <label htmlFor="brief-draft" className="font-black text-slate-900">Dein Brief</label>
          <p className={`text-sm font-black ${counterColor}`}>Woerter: {wordCount} / 120{wordCount > 120 ? " Zu lang!" : ""}</p>
        </div>
        <textarea id="brief-draft" value={draft} onChange={(e) => { setDraft(e.target.value); setNotice(null); }} disabled={!isStorageReady} placeholder="Schreibe hier deinen Brief..." rows={14} className="min-h-[320px] w-full resize-y rounded-2xl border border-slate-300 bg-slate-50 p-4 leading-7 text-slate-900 outline-none focus:border-amber-500 focus:bg-white" />
        <div className="mt-4 flex flex-wrap gap-3">
          <button type="button" onClick={saveDraft} disabled={!isStorageReady} className="rounded-xl bg-emerald-700 px-5 py-3 font-bold text-white">Speichern</button>
          <button type="button" onClick={deleteDraft} disabled={!isStorageReady} className="rounded-xl border border-slate-300 bg-white px-5 py-3 font-bold text-slate-700">Loeschen</button>
          <button type="button" onClick={handleCorrect} disabled={!isStorageReady || isCorrecting} className="rounded-xl bg-purple-600 px-5 py-3 font-semibold text-white">{isCorrecting ? "...كنصحح ليك" : "صحح ليا بالذكاء الاصطناعي"}</button>
        </div>
        {correction && (
          <div>
            <div className="mt-6 rounded-xl bg-purple-50 p-6 whitespace-pre-wrap">{cleanText}</div>
            <div style={{ marginTop: 16, padding: 20, background: "white", border: "3px solid " + color, borderRadius: 16, textAlign: "center" }}>
              <div style={{ fontSize: 14, color: "#666" }}>DEINE PUNKTE</div>
              <div style={{ fontSize: 64, fontWeight: "bold", color: color, lineHeight: 1.1 }}>{gesamt} <span style={{ fontSize: 28 }}>/ 45</span></div>
              <div style={{ display: "flex", gap: 10, justifyContent: "center", marginTop: 14, flexWrap: "wrap" }}>
                <div style={{ background: "#f3f4f6", padding: "8px 12px", borderRadius: 8 }}>Inhalt<br /><b>{inhalt} / 15</b></div>
                <div style={{ background: "#f3f4f6", padding: "8px 12px", borderRadius: 8 }}>Aufbau<br /><b>{gestaltung} / 15</b></div>
                <div style={{ background: "#f3f4f6", padding: "8px 12px", borderRadius: 8 }}>Sprache<br /><b>{korrektheit} / 15</b></div>
              </div>
              <div style={{ marginTop: 10, fontSize: 14, color: color, fontWeight: "bold" }}>{scoreNum >= 27 ? "Bestanden! Weiter so!" : scoreNum >= 15 ? "Fast geschafft!" : "Noch nicht bestanden, weiter ueben!"}</div>
            </div>
          </div>
        )}
        {notice && <p className={`mt-4 text-sm font-semibold ${notice.kind === "error" ? "text-red-700" : "text-emerald-700"}`}>{notice.text}</p>}
      </section>
      <section className="mt-8 rounded-3xl border border-emerald-200 bg-white p-5 shadow-sm sm:p-7">
        <h2 className="text-xl font-black text-slate-950 sm:text-2xl">Musterantwort - Zum Vergleichen</h2>
        <button type="button" onClick={() => setShowAnswer(!showAnswer)} className="mt-4 rounded-xl bg-emerald-700 px-5 py-3 font-bold text-white">{showAnswer ? "Loesung verbergen" : "Loesung anzeigen"}</button>
        {showAnswer && (
          <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:p-6">
            <p className="whitespace-pre-wrap leading-7 text-slate-800">{musterAntwort}</p>
            <button type="button" onClick={copyAnswer} className="mt-5 rounded-xl border border-slate-300 bg-white px-5 py-3 font-bold text-slate-800">Kopieren</button>
          </div>
        )}
      </section>
    </>
  );
}