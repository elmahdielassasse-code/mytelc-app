"use client";

export default function ScrollToConversationButton() {
  return (
    <button
      type="button"
      aria-label="Nach unten scrollen - Hier ist das Beispiel-Gespräch"
      onClick={() => {
        document.getElementById("teil1-example")?.scrollIntoView({ behavior: "smooth", block: "start" });
      }}
      className="mx-auto mt-8 inline-flex w-fit max-w-full items-center justify-center gap-2 rounded-full border border-[#D4AF37] bg-gradient-to-r from-[#0A2540] to-blue-700 px-5 py-3 text-center text-sm font-bold text-white shadow-md transition hover:shadow-lg focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-200 sm:px-6"
    >
      <span>Nach unten scrollen - Hier ist das Beispiel-Gespräch</span>
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-5 w-5 shrink-0 animate-bounce text-[#F3D36B]">
        <path d="M12 4v15m-6-6 6 6 6-6" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      </svg>
    </button>
  );
}
