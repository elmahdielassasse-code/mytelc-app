 const modules = [
  { name: "Lesen", subtitle: "Leseverstehen", desc: "Trainiere dein Leseverständnis.", icon: "📖", color: "bg-blue-50 text-blue-700" },
  { name: "Hören", subtitle: "Hörverstehen", desc: "Verbessere dein Hörverständnis.", icon: "🎧", color: "bg-purple-50 text-purple-700" },
  { name: "Schreiben", subtitle: "Schriftlicher Ausdruck", desc: "Übe Briefe und E-Mails.", icon: "✍️", color: "bg-amber-50 text-amber-700" },
  { name: "Sprechen", subtitle: "Mündlicher Ausdruck", desc: "Bereite dich auf das Gespräch vor.", icon: "🎤", color: "bg-green-50 text-green-700" },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <a href="#" className="text-2xl font-black tracking-tight text-blue-700">
            My<span className="text-slate-900">TELC</span>
          </a>
          <nav className="hidden gap-8 text-sm font-medium text-slate-600 md:flex">
            <a href="#modules">Lernen</a>
            <a href="#exam">Prüfungen</a>
            <a href="#about">Über uns</a>
          </nav>
          <a href="#modules" className="rounded-xl bg-blue-700 px-5 py-3 text-sm font-bold text-white hover:bg-blue-800">
            Jetzt lernen
          </a>
        </div>
      </header>

      <section className="mx-auto grid max-w-7xl items-center gap-10 px-6 py-16 md:grid-cols-2 md:py-24">
        <div>
          <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-bold text-blue-700">
            DEINE TELC B1 VORBEREITUNG
          </span>
          <h1 className="mt-7 text-5xl font-black leading-tight tracking-tight md:text-6xl">
            Dein Weg zum <span className="text-blue-700">B1 Zertifikat.</span>
          </h1>
          <p className="mt-6 max-w-lg text-lg leading-8 text-slate-600">
            Bereite dich auf deine TELC B1 Prüfung vor. Übe alle vier Prüfungsteile und verbessere dein Deutsch Schritt für Schritt.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a href="#modules" className="rounded-xl bg-blue-700 px-7 py-4 font-bold text-white shadow-lg shadow-blue-200 hover:bg-blue-800">
              Jetzt starten →
            </a>
            <a href="#exam" className="rounded-xl border border-slate-300 bg-white px-7 py-4 font-bold hover:bg-slate-100">
              Probeprüfung ansehen
            </a>
          </div>
          <p className="mt-7 text-sm text-slate-500">✓ Kostenlos lernen · ✓ TELC B1 · ✓ Vier Prüfungsteile</p>
        </div>

        <div className="rounded-3xl bg-slate-900 p-8 text-white shadow-2xl">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-blue-300">MYTELC DASHBOARD</span>
            <span className="rounded-full bg-green-400/20 px-3 py-1 text-xs text-green-300">B1 LEVEL</span>
          </div>
          <h2 className="mt-10 text-3xl font-bold">Willkommen bei MyTELC!</h2>
          <p className="mt-3 text-slate-400">Dein persönlicher Lernbereich für die TELC B1 Prüfung.</p>
          <div className="mt-10 grid grid-cols-2 gap-4">
            <div className="rounded-2xl bg-white/10 p-5">
              <div className="text-3xl">📚</div>
              <p className="mt-3 text-2xl font-bold">4</p>
              <p className="text-sm text-slate-400">Prüfungsteile</p>
            </div>
            <div className="rounded-2xl bg-white/10 p-5">
              <div className="text-3xl">🎯</div>
              <p className="mt-3 text-2xl font-bold">B1</p>
              <p className="text-sm text-slate-400">Dein Lernziel</p>
            </div>
          </div>
          <div className="mt-5 rounded-2xl border border-white/10 p-5">
            <div className="flex justify-between text-sm">
              <span>Dein Lernweg</span>
              <span className="text-blue-300">Starte jetzt</span>
            </div>
            <div className="mt-3 h-2 rounded-full bg-white/10">
              <div className="h-2 w-0 rounded-full bg-blue-400" />
            </div>
          </div>
        </div>
      </section>

      <section id="modules" className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center">
            <span className="text-sm font-bold uppercase tracking-widest text-blue-700">LERNBEREICHE</span>
            <h2 className="mt-3 text-3xl font-black md:text-4xl">Die vier Prüfungsteile</h2>
            <p className="mt-4 text-slate-500">Alles, was du für deine TELC B1 Prüfung brauchst.</p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {modules.map((module) => (
              <a key={module.name} href="#exam" className="group rounded-2xl border border-slate-200 p-7 transition hover:-translate-y-1 hover:border-blue-300 hover:shadow-xl">
                <div className={`flex h-14 w-14 items-center justify-center rounded-2xl text-3xl ${module.color}`}>
                  {module.icon}
                </div>
                <h3 className="mt-6 text-xl font-black">{module.name}</h3>
                <p className="mt-1 text-sm font-semibold text-blue-700">{module.subtitle}</p>
                <p className="mt-4 text-sm leading-6 text-slate-500">{module.desc}</p>
                <p className="mt-6 font-bold text-blue-700">Jetzt üben →</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section id="exam" className="mx-auto max-w-7xl px-6 py-20">
        <div className="rounded-3xl bg-blue-700 p-10 text-white md:flex md:items-center md:justify-between md:p-14">
          <div>
            <span className="text-sm font-bold text-blue-200">BEREIT FÜR DIE PRÜFUNG?</span>
            <h2 className="mt-3 text-3xl font-black">Teste dein Deutsch!</h2>
            <p className="mt-4 max-w-xl text-blue-100">Trainiere mit unseren Übungen und bereite dich Schritt für Schritt auf deine Prüfung vor.</p>
          </div>
          <a href="#modules" className="mt-8 inline-block rounded-xl bg-white px-7 py-4 font-bold text-blue-700 hover:bg-blue-50 md:mt-0">
            Übungen entdecken →
          </a>
        </div>
      </section>

      <footer id="about" className="border-t bg-white py-8 text-center text-sm text-slate-500">
        <p className="font-bold text-slate-800">MyTELC</p>
        <p className="mt-2">Dein Weg zum TELC B1 Zertifikat.</p>
        <p className="mt-3">© 2026 MyTELC. Lernplattform für Deutsch.</p>
      </footer>
    </main>
  );
}