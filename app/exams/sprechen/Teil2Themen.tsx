"use client";

import { useMemo, useState } from "react";
import { teil2Topics } from "./teil2-themen";

function normalizeSearchText(value: string) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

function getSpeakerText(line: string, speaker: "A" | "B") {
  return line.replace(new RegExp(`^Person ${speaker}(?::\\s*|\\s+-\\s*)`), "");
}

export default function Teil2Themen() {
  const [query, setQuery] = useState("");
  const normalizedQuery = normalizeSearchText(query.trim());
  const filteredTopics = useMemo(
    () =>
      teil2Topics.filter((topic) =>
        normalizeSearchText(`${topic.title} ${topic.personA} ${topic.personB}`).includes(normalizedQuery),
      ),
    [normalizedQuery],
  );

  return (
    <section className="mt-8">
      <label htmlFor="teil2-thema-search" className="mb-2 block text-sm font-bold text-slate-800">
        Thema suchen
      </label>
      <input
        id="teil2-thema-search"
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
        <div className="mt-5 grid gap-5">
          {filteredTopics.map((topic) => (
            <article
              key={topic.number}
              className="rounded-3xl border border-slate-200 bg-white p-5 shadow-[0_8px_24px_rgba(15,23,42,0.07)] sm:p-7"
            >
              <h2 className="mb-5 flex items-start gap-3 text-xl font-black text-slate-950 sm:text-2xl">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-sm font-black text-emerald-800">
                  {topic.number}
                </span>
                <span className="pt-1">{topic.title}</span>
              </h2>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl border border-blue-200 bg-blue-50 p-4 sm:p-5">
                  <p className="mb-2 text-sm font-black uppercase tracking-wide text-blue-800">Person A</p>
                  <p className="whitespace-pre-wrap text-sm leading-7 text-slate-800 sm:text-base">
                    {getSpeakerText(topic.personA, "A")}
                  </p>
                </div>
                <div className="rounded-2xl border border-violet-200 bg-violet-50 p-4 sm:p-5">
                  <p className="mb-2 text-sm font-black uppercase tracking-wide text-violet-800">Person B</p>
                  <p className="whitespace-pre-wrap text-sm leading-7 text-slate-800 sm:text-base">
                    {getSpeakerText(topic.personB, "B")}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <p className="mt-5 rounded-2xl border border-slate-200 bg-white p-5 text-slate-600">
          Kein Thema gefunden. Ändere deinen Suchbegriff.
        </p>
      )}
    </section>
  );
}
