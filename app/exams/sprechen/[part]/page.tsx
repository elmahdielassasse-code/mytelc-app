import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { speakingParts } from "../../exam-data";
import ScrollToConversationButton from "../ScrollToConversationButton";
import Teil2Themen from "../Teil2Themen";
import Teil3Themen from "../Teil3Themen";

type SpeakingPartPageProps = {
  params: Promise<{ part: string }>;
};

const teil1Dialogue = [
  { speaker: "A", text: "Hallo! Freut mich, dich kennenzulernen. Wie heißt du?" },
  { speaker: "B", text: "Hallo! Ich heiße Salma. Und du?" },
  { speaker: "A", text: "Ich heiße Yassine. Woher kommst du, Salma?" },
  { speaker: "B", text: "Ich komme aus Casablanca, aus Marokko. Und du? Woher kommst du?" },
  { speaker: "A", text: "Ich komme auch aus Casablanca. Wohnst du in einer Wohnung oder in einem Haus?" },
  { speaker: "B", text: "Ich wohne in einer Wohnung mit meiner Familie. Wir haben drei Zimmer, aber leider keinen Garten. Und du? Wie wohnst du?" },
  { speaker: "A", text: "Ich wohne in einem Haus mit einem kleinen Garten. Das finde ich sehr schön, besonders im Sommer. Lebst du mit deiner Familie zusammen?" },
  { speaker: "B", text: "Ja, ich wohne mit meinen Eltern und meinem jüngeren Bruder zusammen. Wir verstehen uns sehr gut. Und deine Familie? Hast du Geschwister?" },
  { speaker: "A", text: "Ja, ich habe eine ältere Schwester. Sie studiert in Rabat. Sag mal, wo hast du Deutsch gelernt?" },
  { speaker: "B", text: "Ich habe Deutsch in einem Sprachzentrum in Casablanca gelernt, seit ungefähr einem Jahr. Ich lerne Deutsch, weil ich in Deutschland studieren möchte. Und du? Wo hast du Deutsch gelernt?" },
  { speaker: "A", text: "Ich habe Deutsch zuerst in der Schule gelernt und jetzt lerne ich weiter in einem Kurs. Was machst du beruflich? Studierst du oder arbeitest du?" },
  { speaker: "B", text: "Ich studiere im Moment an der Universität, ich studiere Wirtschaft. Und du? Was machst du?" },
  { speaker: "A", text: "Ich arbeite als Verkäufer, aber ich möchte später auch studieren. Welche Sprachen sprichst du noch?" },
  { speaker: "B", text: "Ich spreche Arabisch, Französisch, Englisch und ein bisschen Deutsch. Ich lerne Deutsch seit einem Jahr, weil ich die Sprache sehr interessant finde. Und du? Welche Sprachen sprichst du?" },
  { speaker: "A", text: "Ich spreche auch Arabisch, Französisch und Deutsch. Ich lerne Deutsch seit zwei Jahren, weil ich in Deutschland arbeiten möchte." },
  { speaker: "B", text: "Das ist super! Ich freue mich, mit dir zu sprechen." },
  { speaker: "A", text: "Ich mich auch! Viel Erfolg für die Prüfung!" },
] as const;

const teil1Tips = [
  {
    title: "Tipp 1",
    text: "Immer zurückfragen – Und du? / Und bei dir?",
  },
  {
    title: "Tipp 2",
    text: "Nicht nur antworten, Details geben – z.B. nicht nur „Ich wohne in einer Wohnung“, sondern „Ich wohne in einer Wohnung mit meiner Familie, wir haben...“",
  },
  {
    title: "Tipp 3",
    text: "Konnektoren benutzen – weil, aber, besonders, leider, im Moment",
  },
] as const;

export function generateStaticParams() {
  return speakingParts.map((part) => ({ part: part.slug }));
}

export async function generateMetadata({ params }: SpeakingPartPageProps): Promise<Metadata> {
  const { part: slug } = await params;
  const part = speakingParts.find((item) => item.slug === slug);

  return {
    title: part ? `${part.title} — Sprechen | MyTELC` : "Sprechen | MyTELC",
  };
}

export default function SpeakingPartPage({ params }: SpeakingPartPageProps) {
  return (
    <Suspense fallback={<main className="min-h-screen bg-[#faf8f2]" />}>
      <SpeakingPartContent params={params} />
    </Suspense>
  );
}

async function SpeakingPartContent({ params }: SpeakingPartPageProps) {
  const { part: slug } = await params;
  const part = speakingParts.find((item) => item.slug === slug);
  if (!part) notFound();

  if (part.slug === "teil-1") {
    return (
      <main
        className="site-background min-h-screen px-4 py-8 sm:px-6 sm:py-12"
        style={{ backgroundColor: "#F8F9FA", backgroundImage: "none" }}
      >
        <div className="mx-auto flex w-full max-w-[800px] flex-col items-center gap-10">
          <section className="flex w-full flex-col items-center">
            <h1 className="text-center text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
              Teil 1 - Kontaktaufnahme
            </h1>
            <p className="mt-2 text-center text-base font-semibold text-slate-600 sm:text-lg">
              Teilnehmer/in A und B
            </p>
            <div className="mt-6 w-full rounded-2xl border border-white bg-white p-2 shadow-[0_12px_30px_rgba(15,23,42,0.12)]">
              <Image
                src="/sprechen-teil-1.jpg"
                alt="Teil 1 - Kontaktaufnahme"
                width={768}
                height={864}
                priority
                sizes="(max-width: 832px) 100vw, 768px"
                className="mx-auto h-auto max-h-[70vh] max-w-full rounded-xl object-contain"
                style={{ width: "auto", height: "auto" }}
              />
            </div>
            <ScrollToConversationButton />
          </section>

          <section id="teil1-example" className="w-full scroll-mt-6">
            <span aria-hidden="true" className="mx-auto mb-4 block h-1 w-16 rounded-full bg-gradient-to-r from-blue-700 to-[#D4AF37]" />
            <h2 className="mb-6 text-center text-2xl font-black text-slate-900 sm:text-3xl">
              Beispiel-Gespräch zu diesem Bild
            </h2>
            <div className="rounded-3xl border border-indigo-200 bg-gradient-to-br from-blue-50 via-indigo-50 to-violet-100 p-4 shadow-[0_12px_34px_rgba(79,70,229,0.12)] sm:p-7">
              <ol className="space-y-4">
                {teil1Dialogue.map((line, index) => {
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
                        <p className="min-w-0 pt-1 text-sm font-medium leading-7 sm:text-base">{line.text}</p>
                      </div>
                    </li>
                  );
                })}
              </ol>
            </div>
          </section>

          <section className="w-full">
            <h2 className="mb-5 text-center text-2xl font-black text-slate-900 sm:text-3xl">3 Tipps für gute Punkte:</h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {teil1Tips.map((tip, index) => (
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

          <nav className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/exams/sprechen"
              className="rounded-xl border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-800"
            >
              Zurück
            </Link>
            <Link
              href="/exams/sprechen/teil-2"
              className="rounded-xl bg-slate-900 px-5 py-3 font-semibold text-white"
            >
              Weiter zu Teil 2
            </Link>
          </nav>
        </div>
      </main>
    );
  }

  if (part.slug === "teil-2") {
    return (
      <main className="min-h-screen bg-gradient-to-br from-[#faf8f2] via-white to-[#f3efe5] px-4 py-10 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-5xl">
          <header className="mb-12 flex items-center justify-between">
            <Link href="/" className="text-lg font-black tracking-tight text-[#0A2540]">
              MY<span className="text-blue-700">TELC</span>
            </Link>
            <Link
              href="/exams/sprechen"
              className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-700 shadow-sm transition hover:border-amber-300 hover:text-amber-800"
            >
              ← Sprechen
            </Link>
          </header>

          <section className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm sm:p-10">
            <p className="text-sm font-black uppercase tracking-[0.18em] text-emerald-700">TELC Deutsch B1 · Sprechen</p>
            <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">{part.title}</h1>
            <p className="mt-3 text-lg font-semibold text-slate-600">{part.description}</p>
          </section>
          <Teil2Themen />
        </div>
      </main>
    );
  }

  if (part.slug === "teil-3") {
    return (
      <main
        className="site-background min-h-screen px-4 py-8 sm:px-6 sm:py-12"
        style={{ backgroundColor: "#F8F9FA", backgroundImage: "none" }}
      >
        <div className="mx-auto w-full max-w-[1000px]">
          <header className="mb-8 flex items-center justify-between">
            <Link href="/" className="text-lg font-black tracking-tight text-[#0A2540]">
              MY<span className="text-blue-700">TELC</span>
            </Link>
            <Link
              href="/exams/sprechen"
              className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-700 shadow-sm transition hover:border-amber-300 hover:text-amber-800"
            >
              ← Sprechen
            </Link>
          </header>
          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-9">
            <p className="text-sm font-black uppercase tracking-[0.18em] text-emerald-700">TELC Deutsch B1 · Sprechen</p>
            <h1 className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
              Teil 3 - Gemeinsam planen
            </h1>
          </section>
          <Teil3Themen />
        </div>
      </main>
    );
  }

  notFound();
}
