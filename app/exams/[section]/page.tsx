import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { examCategories, speakingParts } from "../exam-data";
import SchreibenOverview from "../schreiben/SchreibenOverview";

type ExamCategoryPageProps = {
  params: Promise<{ section: string }>;
};

export function generateStaticParams() {
  return examCategories.map((category) => ({ section: category.slug }));
}

export async function generateMetadata({ params }: ExamCategoryPageProps): Promise<Metadata> {
  const { section } = await params;
  const category = examCategories.find((item) => item.slug === section);

  return {
    title: category ? `${category.name} — Examens TELC B1 | MyTELC` : "Examens TELC B1 | MyTELC",
  };
}

export default function ExamCategoryPage({ params }: ExamCategoryPageProps) {
  return (
    <Suspense fallback={<main className="min-h-screen bg-[#faf8f2]" />}>
      <ExamCategoryContent params={params} />
    </Suspense>
  );
}

async function ExamCategoryContent({ params }: ExamCategoryPageProps) {
  const { section } = await params;
  const category = examCategories.find((item) => item.slug === section);
  if (!category) notFound();

  if (category.slug === "schreiben") return <SchreibenOverview />;

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#faf8f2] via-white to-[#f3efe5] px-4 py-10 sm:px-6 sm:py-16">
      <div className="mx-auto max-w-5xl">
        <header className="mb-12 flex items-center justify-between">
          <Link href="/" className="text-lg font-black tracking-tight text-[#0A2540]">
            MY<span className="text-blue-700">TELC</span>
          </Link>
          <Link href="/exams" className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-700 shadow-sm transition hover:border-amber-300 hover:text-amber-800">
            ← Tous les exercices
          </Link>
        </header>

        <section>
          <div className="mb-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-9">
            <p className={`text-sm font-black uppercase tracking-[0.18em] ${category.color}`}>TELC Deutsch B1</p>
            <h1 className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-5xl">{category.name}</h1>
            <p dir="rtl" className="mt-2 text-xl font-bold text-slate-600">{category.arabic}</p>
            <p className="mt-4 text-base leading-7 text-slate-600">{category.description}</p>
          </div>

          <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-sm font-bold text-amber-700">Entraînement TELC B1</p>
              <h2 className="mt-1 text-2xl font-black text-slate-950">Liste des examens</h2>
            </div>
            <Link href="/exams" className="text-sm font-bold text-blue-700 underline-offset-4 hover:underline">
              Changer d’exercice
            </Link>
          </div>

          <ul className="grid gap-4 sm:grid-cols-2">
            {category.slug === "sprechen"
              ? speakingParts.map((part) => (
                  <li key={part.slug}>
                    <Link
                      href={`/exams/sprechen/${part.slug}`}
                      className="block rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                    >
                      <h3 className="text-2xl font-black text-slate-900">{part.title}</h3>
                      <p className="mt-2 text-sm text-slate-500">{part.description}</p>
                    </Link>
                  </li>
                ))
              : [1, 2, 3].map((examNumber) => (
                  <li key={examNumber} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                    <div className="flex items-center gap-4">
                      <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${category.background} font-black ${category.color}`}>
                        {String(examNumber).padStart(2, "0")}
                      </span>
                      <div>
                        <h3 className="font-black text-slate-900">Examen {examNumber} · {category.name}</h3>
                        <p className="mt-1 text-sm text-slate-500">Série d’entraînement TELC B1</p>
                      </div>
                    </div>
                    <p className="mt-4 rounded-lg bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-500">
                      Contenu de l’examen à venir
                    </p>
                  </li>
                ))}
          </ul>
        </section>
      </div>
    </main>
  );
}
