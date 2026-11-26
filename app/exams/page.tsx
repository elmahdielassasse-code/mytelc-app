import type { Metadata } from "next";
import Link from "next/link";
import { examCategories } from "./exam-data";

export const metadata: Metadata = {
  title: "Choisissez votre exercice | MyTELC",
  description: "Choisissez une compétence pour consulter les examens TELC B1.",
};

export default function ExamsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#faf8f2] via-white to-[#f3efe5] px-4 py-10 sm:px-6 sm:py-16">
      <div className="mx-auto max-w-6xl">
        <header className="mb-12 flex items-center justify-between">
          <Link href="/" className="text-lg font-black tracking-tight text-[#0A2540]">
            MY<span className="text-blue-700">TELC</span>
          </Link>
          <Link href="/" className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-700 shadow-sm transition hover:border-amber-300 hover:text-amber-800">
            ← Accueil
          </Link>
        </header>

        <section>
          <div className="mb-9 text-center">
            <p className="text-sm font-black uppercase tracking-[0.18em] text-amber-700">TELC Deutsch B1</p>
            <h1 className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-5xl">
              Choisissez votre exercice
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
              Sélectionnez une compétence pour accéder à sa liste d’examens.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {examCategories.map((category, index) => (
              <Link
                key={category.slug}
                href={`/exams/${category.slug}`}
                className={`group rounded-3xl border ${category.border} bg-white p-6 shadow-[0_12px_34px_rgba(15,23,42,0.07)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_44px_rgba(15,23,42,0.12)] sm:p-8`}
              >
                <div className="flex items-start justify-between gap-4">
                  <span className={`flex h-14 w-14 items-center justify-center rounded-2xl ${category.background} text-lg font-black ${category.color}`}>
                    0{index + 1}
                  </span>
                  <span aria-hidden="true" className="text-2xl text-slate-300 transition group-hover:translate-x-1 group-hover:text-amber-600">→</span>
                </div>
                <h2 className="mt-7 text-2xl font-black text-slate-950">{category.name}</h2>
                <p dir="rtl" className="mt-1 text-lg font-bold text-slate-600">{category.arabic}</p>
                <p className="mt-3 text-sm font-medium text-slate-500">{category.description}</p>
                <span className={`mt-6 inline-flex rounded-full px-4 py-2 text-sm font-bold ${category.background} ${category.color}`}>
                  Voir les examens
                </span>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
