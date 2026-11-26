import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { schreibenData } from "../schreibenData.js";
import BriefWritingWorkspace from "../BriefWritingWorkspace";

type SchreibenBriefPageProps = {
  params: Promise<{ id: string }>;
};

export function generateStaticParams() {
  return schreibenData.map((brief) => ({ id: String(brief.id) }));
}

export async function generateMetadata({ params }: SchreibenBriefPageProps): Promise<Metadata> {
  const { id } = await params;
  const brief = schreibenData.find((item) => item.id === Number(id));

  return {
    title: brief ? `${brief.name} - ${brief.title} | Schreiben B1 | MyTELC` : "Schreiben B1 | MyTELC",
  };
}

export default function SchreibenBriefPage({ params }: SchreibenBriefPageProps) {
  return (
    <Suspense fallback={<main className="min-h-screen bg-[#F8F9FA]" />}>
      <SchreibenBriefContent params={params} />
    </Suspense>
  );
}

async function SchreibenBriefContent({ params }: SchreibenBriefPageProps) {
  const { id } = await params;
  const brief = schreibenData.find((item) => item.id === Number(id));
  if (!brief) notFound();

  return (
    <main className="min-h-screen bg-[#F8F9FA] px-4 py-8 sm:px-6 sm:py-12">
      <div className="mx-auto w-full max-w-4xl">
        <Link
          href="/exams/schreiben"
          className="inline-flex rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-700 shadow-sm transition hover:border-amber-300 hover:text-amber-800"
        >
          ← Zurück zu allen Briefen
        </Link>

        <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
          <p className="text-sm font-black uppercase tracking-[0.16em] text-amber-700">
            Brief {brief.id} von {brief.name}
          </p>
          <h1 className="mt-2 text-2xl font-black text-slate-950 sm:text-3xl">{brief.title}</h1>
          <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-100 p-4 sm:p-6">
            <h2 className="mb-3 font-black text-slate-900">📩 Brief von {brief.name}</h2>
            <p className="whitespace-pre-wrap leading-7 text-slate-800">{brief.originalMail}</p>
          </div>
        </section>

        <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
          <h2 className="text-xl font-black text-slate-950 sm:text-2xl">✏️ Schreibe zu diesen 4 Punkten:</h2>
          <ol className="mt-4 grid gap-3 sm:grid-cols-2">
            {brief.punkte.map((point, index) => (
              <li key={`${brief.id}-${index}`} className="flex items-start gap-3 rounded-xl bg-amber-50 p-4 text-slate-800">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-amber-200 text-sm font-black text-amber-900">
                  {index + 1}
                </span>
                <span className="pt-0.5 leading-6">{point}</span>
              </li>
            ))}
          </ol>
        </section>

        <BriefWritingWorkspace key={brief.id} briefId={brief.id} musterAntwort={brief.musterAntwort} />
      </div>
    </main>
  );
}
