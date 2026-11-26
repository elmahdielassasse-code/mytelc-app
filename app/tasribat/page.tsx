import Image from "next/image";
import TasribatExperiences from "./TasribatExperiences";

export default function TasribatPage() {
  return (
    <main className="site-background min-h-screen text-[#0A2540]">
      <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/95 shadow-[0_4px_18px_rgba(15,23,42,0.08)] backdrop-blur-xl">
        <div className="mx-auto flex min-h-[72px] max-w-[1280px] items-center justify-between px-4 sm:px-6 lg:px-8">
          <a href="/" aria-label="Retour à l’accueil" className="shrink-0">
            <Image
              src="/mytelc-transparent-logo.png"
              alt="Logo MyTelc TELC B1"
              width={768}
              height={768}
              priority
              unoptimized
              className="h-16 w-16 object-contain sm:h-24 sm:w-24"
            />
          </a>
          <a
            href="/"
            className="rounded-xl bg-violet-700 px-5 py-3 text-sm font-bold text-white transition hover:bg-violet-800"
          >
            Accueil
          </a>
        </div>
      </header>
      <TasribatExperiences />
    </main>
  );
}
