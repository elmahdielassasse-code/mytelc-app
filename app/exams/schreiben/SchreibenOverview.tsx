"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { schreibenData } from "./schreibenData.js";

function normalizeSearchText(value: string) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

export default function SchreibenOverview() {
  const [query, setQuery] = useState("");
  const normalizedQuery = normalizeSearchText(query.trim());
  const filteredLetters = useMemo(
    () =>
      schreibenData.filter((letter) =>
        normalizeSearchText(`${letter.id} ${letter.name} ${letter.title}`).includes(normalizedQuery),
      ),
    [normalizedQuery],
  );

  return (
    <main className="min-h-screen bg-[#F8F9FA] px-4 py-8 sm:px-6 sm:py-12">
      <div className="mx-auto w-full max-w-5xl">
        <header className="mb-8 flex items-center justify-between gap-4">
          <Link href="/" className="text-lg font-black tracking-tight text-[#0A2540]">
            MY<span className="text-blue-700">TELC</span>
          </Link>
          <Link
            href="/exams"
            className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-700 shadow-sm transition hover:border-amber-300 hover:text-amber-800"
          >
            ← Alle Übungen
          </Link>
        </header>

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-9">
          <p className="text-sm font-black uppercase tracking-[0.18em] text-amber-700">TELC Deutsch B1</p>
          <h1 className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
            Schreiben B1 - 32 Briefe
          </h1>
          <label htmlFor="brief-search" className="sr-only">
            Brief suchen
          </label>
          <input
            id="brief-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Brief suchen..."
            className="mt-6 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-base text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-amber-500 focus:bg-white focus:ring-4 focus:ring-amber-100"
          />
          <p className="mt-3 text-sm font-semibold text-slate-600" aria-live="polite">
            {filteredLetters.length} {filteredLetters.length === 1 ? "Brief" : "Briefe"}
          </p>
        </section>

        {filteredLetters.length > 0 ? (
          <ul className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 sm:gap-4">
            {filteredLetters.map((letter) => (
              <li key={letter.id} className="min-w-0">
                <Link
                  href={`/exams/schreiben/${letter.id}`}
                  className="flex h-full min-h-28 flex-col justify-center rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-amber-300 hover:shadow-md focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-amber-100 sm:min-h-32 sm:p-5"
                >
                  <span className="text-base font-black text-slate-900 sm:text-lg">
                    {letter.id}. {letter.name}
                  </span>
                  <span className="mt-1 line-clamp-2 text-sm leading-5 text-slate-600">{letter.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 text-slate-600">
            Kein Brief gefunden.
          </p>
        )}
      </div>
    </main>
  );
}
