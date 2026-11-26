export const examCategories = [
  {
    slug: "lesen",
    name: "Lesen",
    arabic: "القراءة",
    description: "Compréhension écrite",
    color: "text-blue-700",
    background: "bg-blue-50",
    border: "border-blue-200",
  },
  {
    slug: "horen",
    name: "Hören",
    arabic: "الاستماع",
    description: "Compréhension orale",
    color: "text-violet-700",
    background: "bg-violet-50",
    border: "border-violet-200",
  },
  {
    slug: "schreiben",
    name: "Schreiben",
    arabic: "الكتابة",
    description: "Expression écrite",
    color: "text-amber-700",
    background: "bg-amber-50",
    border: "border-amber-200",
  },
  {
    slug: "sprechen",
    name: "Sprechen",
    arabic: "التحدث",
    description: "Expression orale",
    color: "text-emerald-700",
    background: "bg-emerald-50",
    border: "border-emerald-200",
  },
] as const;

export type ExamCategorySlug = (typeof examCategories)[number]["slug"];

export const speakingParts = [
  { slug: "teil-1", title: "Teil 1", description: "Kontaktaufnahme" },
  { slug: "teil-2", title: "Teil 2", description: "Über ein Thema sprechen" },
  { slug: "teil-3", title: "Teil 3", description: "Etwas gemeinsam planen" },
] as const;

export type SpeakingPartSlug = (typeof speakingParts)[number]["slug"];
