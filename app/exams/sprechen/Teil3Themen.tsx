"use client";

import { useMemo, useState } from "react";
import { teil3Topics } from "./teil3-themen";

const teil3Tips = [
  {
    title: "Machen Sie Vorschläge",
    text: "Sagen Sie, was Sie planen möchten, und machen Sie konkrete Vorschläge: „Wir könnten am Samstag ...“",
  },
  {
    title: "Fragen Sie nach der Meinung",
    text: "Beziehen Sie Ihre Gesprächspartnerin oder Ihren Gesprächspartner ein: „Was meinst du dazu?“",
  },
  {
    title: "Fassen Sie den Plan zusammen",
    text: "Wiederholen Sie am Ende die wichtigsten Absprachen zu Zeit, Ort und Aufgaben.",
  },
] as const;

function normalizeSearchText(value: string) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

export default function Teil3Themen() {
  const [query, setQuery] = useState("");
  const [openTopic, setOpenTopic] = useState<number | null>(null);
  const normalizedQuery = normalizeSearchText(query.trim());
  const filteredTopics = useMemo(
    () =>
      teil3Topics.filter((topic) =>
        normalizeSearchText(
          `${topic.title} ${topic.task} ${topic.points.join(" ")} ${topic.dialogue.map((line) => line.text).join(" ")}`,
        ).includes(normalizedQuery),
      ),
    [normalizedQuery],
  );

  return (
    <>
      <section className="mt-8">
        <label htmlFor="teil3-thema-search" className="mb-2 block text-sm font-bold text-slate-800">
          Thema suchen
        </label>
        <input
          id="teil3-thema-search"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Thema oder Stichwort eingeben..."
          className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-base text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
        />
        <p className="mt-3 text-sm font-semibold text-slate-600" aria-live="polite">
          {filteredTopics.length} {filteredTopics.length === 1 ? "Thema" : "Themen"}
        </p>

        {filteredTopics.length > 0 ? (
          <div className="mt-5 grid gap-4">
            {filteredTopics.map((topic) => {
              const isOpen = openTopic === topic.number;
              const dialogueId = `teil3-dialogue-${topic.number}`;
              return (
                <article
                  key={topic.number}
                  className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_8px_24px_rgba(15,23,42,0.07)]"
                >
                  <div className="p-5 sm:p-7">
                    <div className="flex items-start gap-3">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-sm font-black text-emerald-800">
                        {topic.number}
                      </span>
                      <div className="min-w-0 flex-1">
                        <h2 className="pt-1 text-xl font-black text-slate-950 sm:text-2xl">{topic.title}</h2>
                        <p className="mt-4 text-sm font-bold uppercase tracking-wide text-slate-500">Aufgabe</p>
                        <p className="mt-1 leading-7 text-slate-700">{topic.task}</p>
                        <p className="mt-4 text-sm font-bold uppercase tracking-wide text-slate-500">Punkte</p>
                        <ul className="mt-2 flex flex-wrap gap-2">
                          {topic.points.map((point, index) => (
                            <li
                              key={`${topic.number}-${index}`}
                              className="rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-900"
                            >
                              {point}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={dialogueId}
                      onClick={() => setOpenTopic(isOpen ? null : topic.number)}
                      className="mt-5 inline-flex w-full items-center justify-between gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-left font-bold text-slate-800 transition hover:border-emerald-300 hover:bg-emerald-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-100"
                    >
                      <span>{isOpen ? "Beispiel-Gespräch schließen" : "Beispiel-Gespräch ansehen"}</span>
                      <svg
                        aria-hidden="true"
                        viewBox="0 0 20 20"
                        fill="none"
                        className={`h-5 w-5 shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`}
                      >
                        <path d="m5 7.5 5 5 5-5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
                      </svg>
                    </button>
                  </div>
                  {isOpen && (
                    <div id={dialogueId} className="border-t border-slate-200 bg-slate-50/70 p-5 sm:p-7">
                      <h3 className="mb-4 text-lg font-black text-slate-900">Beispiel-Gespräch</h3>
                      <ol className="space-y-3">
                        {topic.dialogue.map((line, index) => {
                          const isSpeakerA = line.speaker === "A";
                          return (
                            <li key={index} className={`flex ${isSpeakerA ? "justify-end" : "justify-start"}`}>
                              <div
                                className={`flex max-w-full items-start gap-3 rounded-2xl p-3 sm:max-w-[92%] sm:p-4 ${
                                  isSpeakerA ? "flex-row-reverse bg-blue-100 text-blue-950" : "bg-violet-100 text-violet-950"
                                }`}
                              >
                                <span
                                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-black text-white ${
                                    isSpeakerA ? "bg-blue-700" : "bg-violet-700"
                                  }`}
                                >
                                  {line.speaker}
                                </span>
                                <p className="min-w-0 pt-1 text-sm leading-7 sm:text-base">{line.text}</p>
                              </div>
                            </li>
                          );
                        })}
                      </ol>
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        ) : (
          <p className="mt-5 rounded-2xl border border-slate-200 bg-white p-5 text-slate-600">
            Kein Thema gefunden. Ändere deinen Suchbegriff.
          </p>
        )}
      </section>

      <section className="mt-12">
        <h2 className="mb-5 text-center text-2xl font-black text-slate-900 sm:text-3xl">So geht Teil 3</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {teil3Tips.map((tip, index) => (
            <article key={tip.title} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-100 text-sm font-black text-amber-800">
                {index + 1}
              </span>
              <h3 className="mt-4 font-black text-slate-900">{tip.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{tip.text}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
