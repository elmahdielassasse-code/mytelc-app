"use client";
import { useState } from "react";

export default function Schreiben() {
  const [text, setText] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  async function correct() {
    setLoading(true);
    const res = await fetch("/api/correct-schreiben", {
      method: "POST",
      body: JSON.stringify({ text, aufgabe: "E-Mail an einen Freund - TELC B1" }),
    });
    const data = await res.json();
    setResult(data);
    setLoading(false);
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold">Schreiben B1 - Korrektur mit AI</h1>
      <p className="my-2">Schreibe eine E-Mail (ca. 80 Wörter): Dein Freund hat Geburtstag...</p>
      <textarea value={text} onChange={(e) => setText(e.target.value)} rows={10} className="w-full border p-3 rounded-xl" placeholder="Liebe/r..." />
      <button onClick={correct} className="bg-black text-white px-6 py-3 rounded-xl mt-3">
        {loading ? "AI kay-sahah..." : ""}صحح ليا بالذكاء الاصطناعي
      </button>

      {result && (
        <div className="mt-6 border p-4 rounded-xl">
          <h2 className="text-xl font-bold">Note dyalek: {result.total} / 45</h2>
          <p>Inhalt: {result.inhalt} / 15 | Grammatik: {result.grammatik} / 15 | Wortschatz: {result.wortschatz} / 15</p>
          <p className="mt-3">{result.feedback_arabisch}</p>
          <h3 className="font-bold mt-4">L-aghlat:</h3>
          {result.korrekturen?.map((k: any, i: number) => (
            <div key={i} className="my-2">❌ {k.falsch} → ✅ {k.richtig} <br/> <span className="text-sm">{k.erklaerung_arabisch}</span></div>
          ))}
          <h3 className="font-bold mt-4">Nass l-mssahah:</h3>
          <p className="whitespace-pre-wrap">{result.korrigierter_text}</p>
        </div>
      )}
    </div>
  );
}