"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type ProfileIconName =
  | "moon"
  | "sun"
  | "settings"
  | "globe"
  | "bell"
  | "close"
  | "card"
  | "user"
  | "book"
  | "headphones"
  | "pen"
  | "document"
  | "diamond"
  | "phone"
  | "info"
  | "chevron"
  | "logout"
  | "back"
  | "check"
  | "home"
  | "menu"
  | "chevron-down";

function ProfileIcon({
  name,
  className = "h-5 w-5",
}: {
  name: ProfileIconName;
  className?: string;
}) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
      viewBox="0 0 24 24"
    >
      {name === "moon" && <path d="M20.2 15.1A8.5 8.5 0 0 1 8.9 3.8 8.5 8.5 0 1 0 20.2 15.1Z" />}
      {name === "sun" && (
        <>
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42" />
        </>
      )}
      {name === "settings" && (
        <>
          <circle cx="12" cy="12" r="3" />
          <path d="m19.4 15 .1.1 1.1.9-1 1.8-1.4-.5a7.8 7.8 0 0 1-1.5.9l-.2 1.5h-2.1l-.4-1.4a7.7 7.7 0 0 1-1.8 0l-.8 1.2-1.9-.8.2-1.5a7.8 7.8 0 0 1-1.3-1.3l-1.5.2-.8-1.9 1.2-.8a7.7 7.7 0 0 1 0-1.8l-1.2-.8.8-1.9 1.5.2a7.8 7.8 0 0 1 1.3-1.3l-.2-1.5 1.9-.8.8 1.2a7.7 7.7 0 0 1 1.8 0l.8-1.2 1.9.8-.2 1.5a7.8 7.8 0 0 1 1.3 1.3l1.5-.2.8 1.9-1.2.8a7.7 7.7 0 0 1 0 1.8Z" />
        </>
      )}
      {name === "globe" && (
        <>
          <circle cx="12" cy="12" r="9" />
          <ellipse cx="12" cy="12" rx="4" ry="9" />
          <path d="M3 12h18" />
        </>
      )}
      {name === "bell" && <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9ZM10 21h4" />}
      {name === "close" && <path d="m18 6-12 12M6 6l12 12" />}
      {name === "card" && (
        <>
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="M3 10h18M7 15h4" />
        </>
      )}
      {name === "user" && (
        <>
          <circle cx="12" cy="8" r="3.5" />
          <path d="M5 20a7 7 0 0 1 14 0" />
        </>
      )}
      {name === "book" && <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v17H6.5A2.5 2.5 0 0 0 4 22V5.5Zm0 0A2.5 2.5 0 0 0 6.5 8H20" />}
      {name === "headphones" && (
        <>
          <path d="M3 13v-2a9 9 0 0 1 18 0v2" />
          <rect x="3" y="12" width="4" height="8" rx="2" />
          <rect x="17" y="12" width="4" height="8" rx="2" />
        </>
      )}
      {name === "pen" && <path d="m4 20 4.5-1 10.8-10.8a2.1 2.1 0 0 0-3-3L5.5 16 4 20Zm10.8-13.8 3 3" />}
      {name === "document" && <path d="M7 3h7l5 5v13H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Zm7 0v5h5M9 13h6m-6 4h6" />}
      {name === "diamond" && <path d="m12 3 8 6-8 12L4 9l8-6Zm-8 6h16M8 9l4 12 4-12M9 3l3 6 3-6" />}
      {name === "phone" && <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.4 19.4 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.5 2.1L8 10a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.9.6 2.9.7a2 2 0 0 1 1.7 2Z" />}
      {name === "info" && (
        <>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 11v5m0-8h.01" />
        </>
      )}
      {name === "home" && <path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1V10Z" />}
      {name === "menu" && <path d="M4 6h16M4 12h16M4 18h16" />}
      {name === "check" && <path d="m5 12 4 4L19 6" />}
      {name === "chevron-down" && <path d="m6 9 6 6 6-6" />}
      {name === "chevron" && <path d="m15 18-6-6 6-6" />}
      {name === "logout" && <path d="M10 17l5-5-5-5m5 5H3m9-9h7a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-7" />}
      {name === "back" && <path d="m15 18-6-6 6-6M9 12h12" />}
    </svg>
  );
}

function StudentAvatar({ name, variant }: { name: string; variant: number }) {
  const portraits = [
    { skin: "#D59B72", hair: "#2B211D", shirt: "#475569", background: "#F8E7C6" },
    { skin: "#A86E4D", hair: "#1E1B1A", shirt: "#4F46E5", background: "#E6E7FF" },
    { skin: "#E3B58D", hair: "#3A2924", shirt: "#0F766E", background: "#D9F0E7" },
    { skin: "#C88D64", hair: "#221B18", shirt: "#9A3412", background: "#FCE2D6" },
  ];
  const portrait = portraits[variant % portraits.length];

  return (
    <span className="flex h-[58px] w-[58px] shrink-0 rounded-full bg-gradient-to-br from-[#FFF0B3] via-[#D4AF37] to-[#9A6A16] p-[2px] shadow-[0_4px_12px_rgba(180,135,32,0.22)]">
      <svg role="img" aria-label={`Avatar illustré de ${name}`} viewBox="0 0 64 64" className="h-full w-full rounded-full">
        <defs>
          <linearGradient id={`student-avatar-bg-${variant}`} x1="0" x2="1" y1="0" y2="1">
            <stop offset="0" stopColor="#FFFFFF" />
            <stop offset="1" stopColor={portrait.background} />
          </linearGradient>
        </defs>
        <circle cx="32" cy="32" r="31" fill={`url(#student-avatar-bg-${variant})`} />
        <path d="M8 64c1-14 10-22 24-22s23 8 24 22" fill={portrait.shirt} />
        <path d="M24 39h16v10c-4 5-12 5-16 0V39Z" fill={portrait.skin} />
        <ellipse cx="32" cy="28" rx="15" ry="18" fill={portrait.skin} />
        <path d="M17 28c-1-15 7-22 17-22 12 0 17 9 14 23l-3-7c-8 0-13-3-17-7-2 5-6 8-11 10Z" fill={portrait.hair} />
        <circle cx="26.5" cy="29" r="1.2" fill="#33241F" />
        <circle cx="37.5" cy="29" r="1.2" fill="#33241F" />
        <path d="M28 37c2.5 2 5.5 2 8 0" fill="none" stroke="#8A4F3A" strokeLinecap="round" strokeWidth="1.5" />
      </svg>
    </span>
  );
}

const quickAccessModules = [
  { href: "#lesen", german: "Lesen", arabic: "القراءة", icon: "book" as const, color: "text-blue-600", background: "bg-blue-50" },
  { href: "#hoeren", german: "Hören", arabic: "الاستماع", icon: "headphones" as const, color: "text-violet-600", background: "bg-violet-50" },
  { href: "#schreiben", german: "Schreiben", arabic: "الكتابة", icon: "pen" as const, color: "text-amber-600", background: "bg-yellow-50" },
];

const studyNavigation = [
  { href: "#home", label: "الرئيسية", icon: "home" as const },
  { href: "#lesen", label: "Lesen", icon: "book" as const },
  { href: "#hoeren", label: "Hören", icon: "headphones" as const },
  { href: "#schreiben", label: "Schreiben", icon: "pen" as const },
];

const examMenuLinks = [
  { href: "#lesen", title: "Lesen", description: "Compréhension écrite", icon: "book" as const, color: "text-blue-600" },
  { href: "#hoeren", title: "Hören", description: "Compréhension orale", icon: "headphones" as const, color: "text-violet-600" },
  { href: "#schreiben", title: "Schreiben", description: "Expression écrite", icon: "pen" as const, color: "text-amber-600" },
];

const WHATSAPP_LINK =
  "https://wa.me/212645674504?text=Hallo%2C%20ich%20m%C3%B6chte%20die%20TELC%20B1%20Vorbereitung%20f%C3%BCr%20200%20DH%20kaufen";
const WHATSAPP_HELP_LINK =
  "https://wa.me/212645674504?text=Bonjour%2C%20j%27ai%20une%20question%20sur%20les%20packs%20MyTelc";

const commonPackFeatures = [
  "وصول كامل لمواضيع Lesen",
  "إمكانية العمل على كل Teil وحده",
  "وصول كامل لجميع أجزاء Hören",
  "الاستماع للمقاطع الصوتية المسربة في Hören",
  "وصول كامل لنماذج Schreiben",
  "تصحيح Schreiben بالذكاء الاصطناعي (المحدود)",
  "المساعد الذكي للقراءة (المحدود)",
];

const packs = [
  {
    name: "Pack 24h",
    price: "0",
    oldPrice: "0",
    label: "ESSAI GRATUIT",
    duration: "لمدة 24 ساعة",
    badge: "ESSAI GRATUIT",
    theme: "trial",
  },
  {
    name: "Les Fondamentaux",
    label: "BASIQUE",
    price: "79",
    oldPrice: "79",
    duration: "لمدة 30 يوماً",
    theme: "starter",
  },
  {
    name: "Complet + Simulation",
    label: "POPULAIRE",
    price: "129",
    oldPrice: "159",
    duration: "لمدة 60 يوماً",
    theme: "popular",
  },
  {
    name: "Pack VIP",
    price: "159",
    oldPrice: "199",
    duration: "لمدة 90 يوماً",
    label: "VIP",
    savings: "Tu économises le plus !",
    theme: "best",
  },
];

const trialPack = packs[0];
const paidPacks = packs.filter((pack) => pack.theme !== "trial");

const testimonials = [
  {
    name: "Yasmine",
    level: "B1",
    score: "270 / 300",
    badge: "BESTANDEN",
    quote:
      "Ich habe 270 von 300 Punkten erreicht! Dank MyTelc war die Prüfung viel einfacher als gedacht. Die Übungen sind genau wie im echten Test. Ich bin so glücklich!",
  },
  {
    name: "El Mahdi",
    level: "B1",
    score: "285 / 300",
    badge: "SEHR GUT",
    quote:
      "285 von 300 in B1! Ich war so nervös, aber mit dem Training hier habe ich mich super vorbereitet. Die Korrekturen haben mir sehr geholfen. Danke MyTelc!",
  },
  {
    name: "Salma",
    level: "B1",
    score: "258 / 300",
    badge: "BESTANDEN",
    quote:
      "Ich habe mit A1 angefangen und jetzt habe ich B1 mit 258 von 300 bestanden. Die Erklärungen sind klar und einfach. Ich kann es jedem empfehlen!",
  },
  {
    name: "Omar",
    level: "B1",
    score: "242 / 300",
    badge: "BESTANDEN",
    quote:
      "Nach nur 2 Monaten habe ich in B1 242 von 300 erreicht. Am Anfang konnte ich fast kein Deutsch. Jetzt bin ich im Deutschen viel sicherer. Das beste Programm für Telc!",
  },
];

const faqs = [
  {
    germanQuestion: "Wie funktioniert MyTelc?",
    darijaQuestion: "كيفاش خدام MyTelc ؟",
    germanAnswer:
      "Mit MyTelc trainierst du wie in der echten Telc B1 Prüfung. Übungen, Korrekturen und Prüfungen.",
    darijaAnswer: "مع MyTelc، كتتدرّب على أسئلة TELC B1 وكتستافد من التمارين والتصحيح والمواضيع.",
  },
  {
    germanQuestion: "Wie lange habe ich Zugang?",
    darijaQuestion: "شحال المدة ديال الاشتراك ؟",
    germanAnswer: "Je nach deinem Pack - 1 Monat / 2 Monate / 3 Monate.",
    darijaAnswer: "على حسب الباك ديالك - شهر واحد / شهرين / 3 شهور.",
  },
  {
    germanQuestion: "Kann ich alle Niveaus erreichen?",
    darijaQuestion: "واش نقدر نوصل لجميع المستويات ؟",
    germanAnswer: "Ja, von A1 bis B1.",
    darijaAnswer: "إيه، من A1 حتى لـ B1.",
  },
  {
    germanQuestion: "Wie bezahle ich?",
    darijaQuestion: "كيفاش نخلص ؟",
    germanAnswer: "Einfach per WhatsApp.",
    darijaAnswer: "ساهلة، عبر الواتساب.",
  },
  {
    germanQuestion: "Was, wenn ich Hilfe brauche?",
    darijaQuestion: "إلا احتاجيت المساعدة ؟",
    germanAnswer: "Wir helfen dir auf WhatsApp - Schnelle Antwort.",
    darijaAnswer: "كنعاونوك في الواتساب، وكنجاوبوك بسرعة.",
  },
];

export default function Home() {
  const [email, setEmail] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [examMenuOpen, setExamMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [headerScrolled, setHeaderScrolled] = useState(false);
  const [language, setLanguage] = useState<"ar" | "de">("ar");
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [activeStudyNav, setActiveStudyNav] = useState("#home");
  const [listeningStatus, setListeningStatus] = useState("");
  const [trialPackHighlighted, setTrialPackHighlighted] = useState(false);
  const [openFaqs, setOpenFaqs] = useState<Set<string>>(() => new Set());
  const examDropdownRef = useRef<HTMLDivElement>(null);
  const settingsPanelRef = useRef<HTMLDivElement>(null);
  const packsSectionRef = useRef<HTMLElement>(null);
  const certificatePreviewRef = useRef<HTMLDivElement>(null);
  const testimonialsSectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setDarkMode(window.localStorage.getItem("mytelc-theme") === "dark");
    setLanguage(window.localStorage.getItem("mytelc-language") === "de" ? "de" : "ar");
    setNotificationsEnabled(window.localStorage.getItem("mytelc-notifications") !== "off");
  }, []);

  useEffect(() => {
    const updateHeaderElevation = () => setHeaderScrolled(window.scrollY > 8);
    const frame = window.requestAnimationFrame(updateHeaderElevation);
    window.addEventListener("scroll", updateHeaderElevation, { passive: true });

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateHeaderElevation);
    };
  }, []);

  useEffect(() => {
    if (window.location.pathname !== "/packs" || window.location.hash !== "#pack-24h") return;

    let resetTimer: number | undefined;
    const frame = window.requestAnimationFrame(() => {
      const trialCard = document.getElementById("pack-24h");
      if (!trialCard) return;

      trialCard.scrollIntoView({ behavior: "smooth", block: "center" });
      setTrialPackHighlighted(true);
      resetTimer = window.setTimeout(() => setTrialPackHighlighted(false), 2000);
    });

    return () => {
      window.cancelAnimationFrame(frame);
      if (resetTimer !== undefined) window.clearTimeout(resetTimer);
    };
  }, []);

  useEffect(() => {
    const syncActiveStudyNav = () => {
      if (studyNavigation.some((item) => item.href === window.location.hash)) {
        setActiveStudyNav(window.location.hash);
      }
    };
    window.addEventListener("hashchange", syncActiveStudyNav);
    syncActiveStudyNav();
    return () => window.removeEventListener("hashchange", syncActiveStudyNav);
  }, []);

  useEffect(() => {
    const featuredSections = [packsSectionRef.current, certificatePreviewRef.current, testimonialsSectionRef.current].filter(
      (section): section is HTMLElement => section !== null
    );
    const cards = featuredSections.flatMap((section) => [
      ...(section.matches(".certificate-reveal") ? [section] : []),
      ...Array.from(section.querySelectorAll<HTMLElement>(".pack-reveal, .certificate-reveal, .testimonial-card")),
    ]);
    const readingSections = Array.from(
      document.querySelectorAll<HTMLElement>("main.site-background > section:not(.premium-hero)"),
    );
    readingSections.forEach((section) => section.classList.add("reading-section-reveal"));
    const revealTargets = Array.from(new Set([...readingSections, ...cards]));
    if (revealTargets.length === 0) return;
    if (!("IntersectionObserver" in window)) {
      revealTargets.forEach((target) => target.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        currentObserver.unobserve(entry.target);
      });
    }, { threshold: 0.08, rootMargin: "0px 0px -24px 0px" });

    revealTargets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!examMenuOpen) return;

    const closeOnOutsideClick = (event: PointerEvent) => {
      if (event.target instanceof Node && !examDropdownRef.current?.contains(event.target)) {
        setExamMenuOpen(false);
      }
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setExamMenuOpen(false);
    };

    document.addEventListener("pointerdown", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [examMenuOpen]);

  useEffect(() => {
    if (!settingsOpen) return;

    const closeOnOutsideClick = (event: PointerEvent) => {
      if (event.target instanceof Node && !settingsPanelRef.current?.contains(event.target)) {
        setSettingsOpen(false);
      }
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSettingsOpen(false);
    };

    document.addEventListener("pointerdown", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [settingsOpen]);

  const toggleDarkMode = () => {
    setDarkMode((isDark) => {
      const nextMode = !isDark;
      window.localStorage.setItem("mytelc-theme", nextMode ? "dark" : "light");
      return nextMode;
    });
  };

  const selectLanguage = (nextLanguage: "ar" | "de") => {
    setLanguage(nextLanguage);
    window.localStorage.setItem("mytelc-language", nextLanguage);
  };

  const toggleNotifications = () => {
    setNotificationsEnabled((enabled) => {
      const nextEnabled = !enabled;
      window.localStorage.setItem("mytelc-notifications", nextEnabled ? "on" : "off");
      return nextEnabled;
    });
  };

  const toggleFaq = (question: string) => {
    setOpenFaqs((current) => {
      const next = new Set(current);
      if (next.has(question)) {
        next.delete(question);
      } else {
        next.add(question);
      }
      return next;
    });
  };

  const playListeningSample = () => {
    if (!("speechSynthesis" in window)) {
      setListeningStatus("Audio ist in diesem Browser nicht verfügbar.");
      return;
    }

    window.speechSynthesis.cancel();
    const sample = new SpeechSynthesisUtterance(
      "Guten Morgen. Ich möchte eine Fahrkarte nach Rabat kaufen. Der Zug fährt um zehn Uhr dreißig von Gleis drei ab."
    );
    sample.lang = "de-DE";
    sample.onend = () => setListeningStatus("Audio beendet.");
    sample.onerror = () => setListeningStatus("Audio konnte nicht abgespielt werden.");
    setListeningStatus("Audio wird abgespielt.");
    window.speechSynthesis.speak(sample);
  };

  return (
    <main className={`site-background theme-transition min-h-screen pb-32 text-[#0A2540] selection:bg-[#2563EB] selection:text-white lg:pb-12 ${darkMode ? "dark-theme" : ""}`}>
      <header className={`premium-header header-premium-enter sticky top-0 z-[75] border-b border-slate-100 ${headerScrolled ? "premium-header-scrolled" : ""}`}>
        <div aria-hidden="true" className="header-german-stripe" />
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
          <div className="grid min-h-[68px] grid-cols-[auto_1fr_auto] items-center gap-3 sm:min-h-[88px] sm:gap-5">
            <a href="#home" className="group flex shrink-0 items-center" aria-label="TELC B1 - PRO Accueil">
              <span className="flex h-12 w-12 items-center justify-center rounded-full border border-[#D4AF37]/70 bg-white p-0.5 shadow-[0_3px_12px_rgba(180,135,32,0.16)] transition-transform duration-300 group-hover:scale-105 sm:h-[68px] sm:w-[68px]">
                <Image
                  src="/mytelc-transparent-logo.png"
                  alt="Logo MyTelc TELC B1"
                  width={768}
                  height={768}
                  priority
                  unoptimized
                  className="h-full w-full object-contain"
                />
              </span>
            </a>
            <nav className="header-navigation-pill hidden items-center gap-2 justify-self-center rounded-full border border-slate-200/80 bg-white/75 p-1.5 shadow-[0_8px_24px_rgba(15,23,42,0.08)] backdrop-blur-xl md:flex" aria-label="Navigation principale">
              <a
                href="#home"
                className="inline-flex min-h-11 items-center gap-2 rounded-full bg-gradient-to-r from-violet-700 via-indigo-600 to-blue-600 px-5 text-sm font-bold text-white shadow-[0_5px_14px_rgba(79,70,229,0.24)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(79,70,229,0.32)]"
              >
                <ProfileIcon name="home" className="h-4 w-4" />
                Accueil
              </a>
              <div ref={examDropdownRef} className="relative flex items-center">
                <div className="exam-navigation-button group flex min-h-11 items-center overflow-hidden rounded-full border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:border-[#D4AF37]/60 hover:shadow-[0_5px_14px_rgba(180,135,32,0.12)]">
                  <a
                    href="#uebungen"
                    onClick={() => setExamMenuOpen(false)}
                    className="inline-flex h-11 items-center gap-2 px-4 text-sm font-bold text-slate-700 transition-colors group-hover:text-[#A77C16]"
                  >
                    <ProfileIcon name="document" className="h-4 w-4" />
                    Prüfungen
                  </a>
                  <button
                    type="button"
                    aria-label="Prüfungen-Menü öffnen"
                    aria-haspopup="menu"
                    aria-expanded={examMenuOpen}
                    onClick={() => setExamMenuOpen((isOpen) => !isOpen)}
                    className="flex h-11 w-10 items-center justify-center border-l border-slate-200 text-slate-600 transition-colors group-hover:text-[#A77C16]"
                  >
                    <ProfileIcon name="chevron-down" className={`h-4 w-4 transition-transform ${examMenuOpen ? "rotate-180" : ""}`} />
                  </button>
                </div>
                {examMenuOpen && (
                  <div
                    role="menu"
                    aria-label="Prüfungsbereiche"
                    className="absolute left-0 top-full z-[80] mt-2 w-72 rounded-2xl border border-slate-100 bg-white p-2 shadow-[0_18px_48px_rgba(15,23,42,0.18)]"
                  >
                    {examMenuLinks.map((item) => (
                      <a
                        key={item.href}
                        role="menuitem"
                        href={item.href}
                        onClick={() => setExamMenuOpen(false)}
                        className="flex items-center gap-3 rounded-xl px-3 py-3 transition hover:bg-slate-50"
                      >
                        <ProfileIcon name={item.icon} className={`h-5 w-5 shrink-0 ${item.color}`} />
                        <span className="min-w-0">
                          <span className="block text-sm font-bold text-[#0A2540]">{item.title}</span>
                          <span className="mt-0.5 block text-xs text-slate-500">{item.description}</span>
                        </span>
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </nav>
            <div
              ref={settingsPanelRef}
              className="relative flex shrink-0 items-center gap-1 rounded-full border border-[#D4AF37]/35 bg-white/70 p-1.5 shadow-[0_8px_24px_rgba(15,23,42,0.08)] backdrop-blur-xl sm:gap-2 sm:p-2"
            >
              <button
                type="button"
                aria-label={darkMode ? "Passer en mode clair" : "Passer en mode sombre"}
                title={darkMode ? "Mode clair" : "Mode sombre"}
                aria-pressed={darkMode}
                onClick={toggleDarkMode}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200/80 bg-white text-slate-900 shadow-[0_2px_8px_rgba(15,23,42,0.05)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#D4AF37]/60 hover:bg-[#FDF9EC] hover:text-[#A77C16] hover:shadow-[0_6px_16px_rgba(180,135,32,0.16)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]/50 sm:h-10 sm:w-10"
              >
                <ProfileIcon name={darkMode ? "sun" : "moon"} className="h-4 w-4 stroke-[1.5] transition-transform duration-300 sm:h-[18px] sm:w-[18px]" />
              </button>
              <button
                type="button"
                aria-label="Ouvrir les paramètres"
                title="Paramètres"
                aria-expanded={settingsOpen}
                aria-controls="settings-panel"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setSettingsOpen((isOpen) => !isOpen);
                }}
                className="group flex h-9 w-9 items-center justify-center rounded-full border border-slate-200/80 bg-white text-slate-900 shadow-[0_2px_8px_rgba(15,23,42,0.05)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#D4AF37]/60 hover:bg-[#FDF9EC] hover:text-[#A77C16] hover:shadow-[0_6px_16px_rgba(180,135,32,0.16)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]/50 sm:h-10 sm:w-10"
              >
                <ProfileIcon name="settings" className="h-4 w-4 stroke-[1.5] transition-transform duration-500 ease-out group-hover:rotate-90 sm:h-[18px] sm:w-[18px]" />
              </button>
              <button
                type="button"
                aria-label="Ouvrir le menu"
                title="Menu"
                aria-expanded={mobileMenuOpen && !settingsOpen}
                aria-controls="site-menu-drawer"
                onClick={() => {
                  setSettingsOpen(false);
                  setMobileMenuOpen(true);
                }}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-900 bg-slate-950 text-white shadow-[0_4px_12px_rgba(15,23,42,0.2)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-slate-800 hover:shadow-[0_8px_18px_rgba(15,23,42,0.24)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 sm:h-10 sm:w-10"
              >
                <ProfileIcon name="menu" className="h-4 w-4 stroke-[1.75] sm:h-[18px] sm:w-[18px]" />
              </button>
              {settingsOpen && (
                <div
                  id="settings-panel"
                  role="dialog"
                  aria-label="Paramètres"
                  className="settings-popover-enter absolute right-0 top-full z-[90] mt-3 w-[min(360px,calc(100vw-32px))] rounded-3xl border border-slate-200 bg-white p-5 text-slate-900 shadow-[0_24px_70px_rgba(15,23,42,0.18)]"
                >
                  <div className="mb-5 flex items-center justify-between border-b border-slate-100 pb-4">
                    <div>
                      <h2 className="text-base font-bold text-slate-900">Paramètres</h2>
                      <p className="mt-1 text-xs text-slate-500">Préférences</p>
                    </div>
                    <button
                      type="button"
                      aria-label="Fermer les paramètres"
                      onClick={() => setSettingsOpen(false)}
                      className="flex h-8 w-8 items-center justify-center rounded-full text-slate-500 transition hover:bg-slate-100"
                    >
                      <ProfileIcon name="close" className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="space-y-5">
                    <fieldset>
                      <legend className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                        <ProfileIcon name="globe" className="h-4 w-4 text-slate-500" />
                        Langue
                      </legend>
                      <div className="mt-3 grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          aria-pressed={language === "ar"}
                          onClick={() => selectLanguage("ar")}
                          className={`rounded-xl border px-3 py-2.5 text-sm font-medium transition ${language === "ar" ? "border-slate-300 bg-slate-100 text-slate-900" : "border-slate-200 text-slate-600 hover:bg-slate-50"}`}
                        >
                          العربية
                        </button>
                        <button
                          type="button"
                          aria-pressed={language === "de"}
                          onClick={() => selectLanguage("de")}
                          className={`rounded-xl border px-3 py-2.5 text-sm font-medium transition ${language === "de" ? "border-slate-300 bg-slate-100 text-slate-900" : "border-slate-200 text-slate-600 hover:bg-slate-50"}`}
                        >
                          Deutsch
                        </button>
                      </div>
                    </fieldset>

                    <div className="flex items-center gap-3">
                      <ProfileIcon name={darkMode ? "moon" : "sun"} className="h-4 w-4 shrink-0 text-slate-500" />
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-slate-800">Mode sombre / clair</p>
                        <p className="mt-0.5 text-xs text-slate-500">{darkMode ? "Mode sombre activé" : "Mode clair activé"}</p>
                      </div>
                      <button
                        type="button"
                        role="switch"
                        aria-checked={darkMode}
                        aria-label="Mode sombre / clair"
                        onClick={toggleDarkMode}
                        className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${darkMode ? "bg-slate-800" : "bg-slate-300"}`}
                      >
                        <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-all ${darkMode ? "left-[22px]" : "left-0.5"}`} />
                      </button>
                    </div>

                    <div className="flex items-center gap-3">
                      <ProfileIcon name="bell" className="h-4 w-4 shrink-0 text-slate-500" />
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-slate-800">Notifications</p>
                        <p className="mt-0.5 text-xs text-slate-500">{notificationsEnabled ? "Notifications activées" : "Notifications désactivées"}</p>
                      </div>
                      <button
                        type="button"
                        role="switch"
                        aria-checked={notificationsEnabled}
                        aria-label="Activer ou désactiver les notifications"
                        onClick={toggleNotifications}
                        className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${notificationsEnabled ? "bg-slate-800" : "bg-slate-300"}`}
                      >
                        <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-all ${notificationsEnabled ? "left-[22px]" : "left-0.5"}`} />
                      </button>
                    </div>

                    <div className="flex items-center gap-3 border-t border-slate-100 pt-4">
                      <ProfileIcon name="user" className="h-4 w-4 shrink-0 text-slate-500" />
                      <span className="text-sm font-medium text-slate-800">Compte</span>
                      <ProfileIcon name="chevron" className="ml-auto h-4 w-4 rotate-180 text-slate-400" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {mobileMenuOpen && (
        <>
          <button
            type="button"
            aria-label="Fermer le panneau"
            onClick={() => {
              setMobileMenuOpen(false);
              setSettingsOpen(false);
            }}
            className="menu-overlay-enter fixed inset-0 z-[80] bg-slate-950/35 backdrop-blur-sm"
          />
          <aside
            role="dialog"
            aria-modal="true"
            id="site-menu-drawer"
            aria-label="Menu principal"
            className="menu-drawer-enter menu-drawer-panel fixed inset-y-3 right-3 z-[90] flex flex-col overflow-hidden rounded-3xl border border-white/70 p-6 shadow-[0_25px_80px_rgba(15,23,42,0.22)]"
            style={{ width: "min(400px, calc(100vw - 24px))" }}
          >
            <div className="flex shrink-0 items-center justify-between pb-5">
              <div>
                <h2 className="text-2xl font-black tracking-tight text-slate-950">Menu</h2>
                <span aria-hidden="true" className="mt-2 block h-0.5 w-12 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#F3E2A2]" />
              </div>
              <button
                type="button"
                aria-label="Fermer"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setSettingsOpen(false);
                }}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200/80 bg-slate-100/80 text-slate-600 shadow-sm transition-all duration-300 hover:border-rose-200 hover:bg-rose-50 hover:text-rose-600 hover:shadow-md"
              >
                <ProfileIcon name="close" className="h-4 w-4" />
              </button>
            </div>

            <nav className="mt-2 min-h-0 flex-1 overflow-y-auto pr-1" aria-label="Menu principal">
                <ul className="space-y-2.5">
                  {[
                    { href: "#home", label: "Accueil", arabic: "الرئيسية", icon: "home" as const, color: "text-blue-600", iconBackground: "bg-blue-50", badge: undefined },
                    { href: "#uebungen", label: "Exercices", arabic: "التمارين", icon: "book" as const, color: "text-emerald-600", iconBackground: "bg-emerald-50", badge: undefined },
                    { href: "#packs", label: "Packs", arabic: "الباقات", icon: "diamond" as const, color: "text-amber-600", iconBackground: "bg-amber-50", badge: "OFFRE" },
                    { href: "/tasribat", label: "Tasribat", arabic: "التسريبات", icon: "document" as const, color: "text-rose-600", iconBackground: "bg-rose-50", badge: "NEW" },
                    { href: "#contact", label: "Contact", arabic: "تواصل معنا", icon: "phone" as const, color: "text-violet-600", iconBackground: "bg-violet-50", badge: undefined },
                    { href: "#about", label: "À propos", arabic: "من نحن", icon: "info" as const, color: "text-slate-600", iconBackground: "bg-slate-100", badge: undefined },
                  ].map((item) => (
                    <li key={item.href}>
                      <a
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="group flex items-center gap-3 rounded-2xl border border-slate-100 bg-white/85 px-3.5 py-3 shadow-[0_4px_14px_rgba(15,23,42,0.035)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#D4AF37]/45 hover:bg-[#FFFCF5] hover:shadow-[0_10px_22px_rgba(180,135,32,0.11)]"
                      >
                        <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${item.iconBackground}`}>
                          <ProfileIcon name={item.icon} className={`h-5 w-5 ${item.color}`} />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block text-base font-bold text-slate-900">{item.label}</span>
                          <span dir="rtl" className="mt-0.5 block text-right text-xs font-medium text-slate-500">{item.arabic}</span>
                        </span>
                        {item.badge && (
                          <span className={item.badge === "OFFRE" ? "menu-badge-offer" : "menu-badge-new"}>
                            {item.badge}
                          </span>
                        )}
                      </a>
                    </li>
                  ))}
                  <li className="pt-1">
                    <button
                      type="button"
                      onClick={() => {
                        setMobileMenuOpen(false);
                        setSettingsOpen(true);
                      }}
                      className="group flex w-full items-center gap-3 rounded-2xl border border-slate-100 bg-white/85 px-3.5 py-3 text-left shadow-[0_4px_14px_rgba(15,23,42,0.035)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#D4AF37]/45 hover:bg-[#FFFCF5] hover:shadow-[0_10px_22px_rgba(180,135,32,0.11)]"
                    >
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-600">
                        <ProfileIcon name="settings" className="h-5 w-5" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-base font-bold text-slate-900">Paramètres</span>
                        <span dir="rtl" className="mt-0.5 block text-right text-xs font-medium text-slate-500">الإعدادات</span>
                      </span>
                    </button>
                  </li>
                </ul>
            </nav>
            <div className="mt-4 shrink-0 border-t border-slate-200/80 pt-4">
              <div className="space-y-3">
                <Link
                  href="/inscription"
                  onClick={() => setMobileMenuOpen(false)}
                  className="menu-signup-button flex w-full flex-col items-center justify-center rounded-2xl bg-gradient-to-r from-[#D71920] via-[#E44724] to-[#F97316] px-4 py-3.5 text-center text-white shadow-[0_10px_24px_rgba(221,0,0,0.2)] transition-all duration-300 hover:-translate-y-0.5 hover:brightness-110 hover:shadow-[0_14px_30px_rgba(221,0,0,0.28)]"
                >
                  <span dir="rtl" className="text-sm font-extrabold">إنشاء حساب</span>
                  <span className="mt-0.5 text-xs font-medium text-white/85">Créer un compte</span>
                </Link>
                <Link
                  href="/connexion"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex w-full flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-center text-slate-900 shadow-[0_4px_14px_rgba(15,23,42,0.06)] transition-all duration-300 hover:border-slate-300 hover:bg-slate-50 hover:shadow-md"
                >
                  <span dir="rtl" className="text-sm font-extrabold">تسجيل الدخول</span>
                  <span className="mt-0.5 text-xs font-medium text-slate-500">Se connecter</span>
                </Link>
              </div>
            </div>
          </aside>
        </>
      )}

      <section id="home" className="premium-hero relative isolate scroll-mt-24 overflow-hidden">
        <div className="relative z-10 mx-auto grid max-w-[1280px] items-center gap-14 px-6 py-20 lg:grid-cols-[1.08fr_0.92fr] lg:px-8 lg:py-28">
          <div>
            <p dir="rtl" lang="ar" className="mb-4 inline-flex max-w-full rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-bold text-[#0A2540] sm:text-base">
              كل ما تحتاجه للنجاح في TELC B1، في مكان واحد!
            </p>
            <h1 dir="rtl" lang="ar" className="max-w-3xl text-left text-4xl font-black leading-[1.08] tracking-tight text-[#0A2540] sm:text-5xl lg:text-[64px]">
              مرحباً بك في منصتك
              <br />
              للتحضير لـ TELC B1!
            </h1>
            <div dir="rtl" lang="ar" className="mt-6 max-w-2xl space-y-4 text-lg leading-8 text-slate-600">
              <p>اكتشف مجموعة متنوعة من التمارين والنماذج التدريبية المصممة لمساعدتك على الاستعداد بطريقة سهلة ومنظمة.</p>
              <p>سواء كنت ترغب في تحسين مهارات القراءة (Lesen)، أو الاستماع (Hören)، أو الكتابة (Schreiben)، ستجد هنا تدريبات وموارد تساعدك على تطوير مستواك والتعرّف على طبيعة أسئلة TELC B1.</p>
              <p>تدرّب باستمرار، اختبر مستواك، وتقدّم خطوة بخطوة نحو هدفك.</p>
              <p>رحلتك نحو شهادة TELC B1 تبدأ من هنا!</p>
            </div>
            <div className="mt-8 mb-7 grid max-w-2xl grid-cols-1 gap-3 sm:grid-cols-3">
              <a
                href="#uebungen"
                dir="rtl"
                className="flex min-h-[220px] flex-col items-start rounded-2xl bg-black p-5 text-right text-white shadow-[0_12px_30px_rgba(15,23,42,0.12)] transition hover:-translate-y-1 hover:bg-slate-900"
              >
                <ProfileIcon name="book" className="h-6 w-6" />
                <span className="mt-4 text-lg font-black">اكتشف التمارين</span>
                <span className="mt-2 text-sm leading-6 text-white/80">شوف مواضيع B1 كاملة</span>
                <span className="mt-auto rounded-xl bg-white/15 px-4 py-2 text-sm font-bold">ابدأ الآن</span>
              </a>
              <a
                href="#packs"
                dir="rtl"
                className="flex min-h-[220px] flex-col items-start rounded-2xl bg-[#DD0000] p-5 text-right text-white shadow-[0_12px_30px_rgba(15,23,42,0.12)] transition hover:-translate-y-1 hover:bg-red-800"
              >
                <ProfileIcon name="card" className="h-6 w-6" />
                <span className="mt-4 text-lg font-black">الباقات</span>
                <span className="mt-2 text-sm leading-6 text-white/85">شوف الباقات و اختار اللي يناسبك</span>
                <span className="mt-auto rounded-xl bg-white/15 px-4 py-2 text-sm font-bold">شوف الباقات</span>
              </a>
              <a
                href="https://wa.me/212645674504?text=Salam%20MyTelc%20!%20Bghit%20nsewel%20ala%20TELC%20B1"
                target="_blank"
                rel="noopener noreferrer"
                dir="rtl"
                className="flex min-h-[220px] flex-col items-start rounded-2xl bg-[#FFCC00] p-5 text-right text-black shadow-[0_12px_30px_rgba(15,23,42,0.12)] transition hover:-translate-y-1 hover:bg-[#e6b800]"
              >
                <ProfileIcon name="user" className="h-6 w-6" />
                <span className="mt-4 text-lg font-black">تواصل معنا</span>
                <span className="mt-2 text-sm leading-6 text-black/75">عندك سؤال ؟ حنا هنا</span>
                <span className="mt-auto inline-flex items-center gap-2 rounded-xl bg-black/10 px-4 py-2 text-sm font-bold">
                  <svg aria-hidden="true" viewBox="0 0 32 32" className="h-5 w-5 fill-[#25D366]">
                    <path d="M16.04 3C8.88 3 3.06 8.82 3.06 15.98c0 2.29.6 4.52 1.74 6.5L3 29l6.68-1.75a12.94 12.94 0 0 0 6.36 1.66h.01c7.16 0 12.98-5.82 12.98-12.98A12.9 12.9 0 0 0 25.22 6.7 12.9 12.9 0 0 0 16.04 3Zm0 23.7h-.01c-1.98 0-3.92-.53-5.62-1.54l-.4-.24-3.96 1.04 1.06-3.86-.26-.4a10.7 10.7 0 0 1-1.64-5.72c0-5.95 4.85-10.8 10.81-10.8 2.88 0 5.59 1.12 7.63 3.17a10.73 10.73 0 0 1 3.16 7.64c0 5.96-4.85 10.81-10.8 10.81Zm5.93-8.1c-.32-.16-1.9-.94-2.2-1.05-.3-.1-.51-.16-.73.16-.21.32-.83 1.05-1.02 1.27-.19.21-.38.24-.7.08-.32-.16-1.36-.5-2.59-1.6-.96-.86-1.61-1.91-1.8-2.23-.19-.32-.02-.49.14-.65.14-.14.32-.38.48-.57.16-.19.21-.32.32-.54.1-.21.05-.4-.03-.56-.08-.16-.73-1.75-1-2.4-.26-.63-.53-.54-.73-.55l-.62-.01c-.22 0-.57.08-.86.4-.3.32-1.13 1.1-1.13 2.68s1.16 3.11 1.32 3.33c.16.21 2.28 3.48 5.52 4.88.77.33 1.37.53 1.84.68.77.24 1.47.21 2.02.13.62-.09 1.9-.78 2.17-1.53.27-.75.27-1.4.19-1.53-.08-.14-.3-.22-.62-.38Z" />
                  </svg>
                  تواصل معنا
                </span>
              </a>
            </div>
            <div className="mt-9 max-w-2xl">
              <a
                href="/packs#pack-24h"
                dir="ltr"
                className="group relative flex w-full items-center justify-center rounded-2xl border border-slate-200 bg-white px-12 py-5 text-[#0A2540] shadow-[0_8px_24px_rgba(15,23,42,0.06)] transition hover:-translate-y-0.5 hover:shadow-[0_16px_36px_rgba(15,23,42,0.12)] sm:px-14"
              >
                <span className="flex flex-col items-center text-center leading-snug">
                  <span className="flex items-center justify-center gap-2">
                    <span dir="rtl" className="font-[family-name:var(--font-tajawal-extrabold)] text-2xl font-extrabold text-black sm:text-3xl">
                      أجي جرب 24h
                    </span>
                    <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-black uppercase tracking-wide text-emerald-700 ring-1 ring-emerald-200 sm:text-xs">
                      GRATUIT
                    </span>
                  </span>
                  <span dir="ltr" className="mt-1 text-xs font-medium text-slate-500 sm:text-sm">
                    Kostenlos 24h testen - Ohne Kreditkarte
                  </span>
                </span>
                <span aria-hidden="true" className="absolute right-5 shrink-0 text-xl font-medium text-slate-400 transition-transform group-hover:translate-x-0.5 sm:right-7">→</span>
              </a>
              <p dir="auto" className="mt-3 text-center text-sm font-semibold text-slate-500">
                بدون بطاقة بنكية - Ohne Kreditkarte
              </p>
            </div>

          </div>

          <div className="relative mx-auto w-full max-w-[520px]">
            <div
              ref={certificatePreviewRef}
              id="zertifikat"
              className="certificate-stage certificate-reveal relative isolate scroll-mt-32 rounded-[34px] p-4 sm:p-6"
            >
              <div className="certificate-context-badges relative z-10 mb-5 flex items-center justify-between gap-2">
                <div className="certificate-context-badge">
                  <svg aria-hidden="true" viewBox="0 0 36 24" className="h-4 w-6 shrink-0 rounded-[2px] shadow-sm">
                    <rect width="36" height="8" fill="#111111" />
                    <rect y="8" width="36" height="8" fill="#DD0000" />
                    <rect y="16" width="36" height="8" fill="#FFCC00" />
                  </svg>
                  <span>
                    <span className="block font-extrabold">telc-Prüfungsformat</span>
                    <span className="block text-[10px] font-medium opacity-70">Deutsch B1</span>
                  </span>
                </div>
                <div className="certificate-context-badge">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#D4AF37]/15 text-[#9A6A16]">
                    <ProfileIcon name="check" className="h-4 w-4 stroke-[2.4]" />
                  </span>
                  <span>
                    <span className="block font-extrabold">Ausstellung durch telc</span>
                    <span className="block text-[10px] font-medium opacity-70">nach bestandener Prüfung</span>
                  </span>
                </div>
              </div>

              <div className="certificate-frame-tilt relative z-10 mx-auto max-w-[420px]">
                <div className="certificate-medal absolute -right-3 -top-7 z-20 h-28 w-24" role="img" aria-label="Dekorative Goldmedaille mit Deutschlandfarben">
                  <svg aria-hidden="true" viewBox="0 0 100 120" className="h-full w-full">
                    <defs>
                      <linearGradient id="medal-red-ribbon" x1="0" x2="1" y1="0" y2="1">
                        <stop offset="0" stopColor="#b91c1c" />
                        <stop offset="0.5" stopColor="#ef4444" />
                        <stop offset="1" stopColor="#7f1d1d" />
                      </linearGradient>
                      <linearGradient id="medal-black-ribbon" x1="0" x2="1" y1="0" y2="1">
                        <stop offset="0" stopColor="#525252" />
                        <stop offset="0.5" stopColor="#171717" />
                        <stop offset="1" stopColor="#050505" />
                      </linearGradient>
                      <linearGradient id="medal-gold-ribbon" x1="0" x2="1" y1="0" y2="1">
                        <stop offset="0" stopColor="#fff1a8" />
                        <stop offset="0.5" stopColor="#d4a63c" />
                        <stop offset="1" stopColor="#9a6a16" />
                      </linearGradient>
                      <radialGradient id="medal-gold-face" cx="32%" cy="24%" r="80%">
                        <stop offset="0" stopColor="#fff8d5" />
                        <stop offset="0.45" stopColor="#f4d36e" />
                        <stop offset="1" stopColor="#b77c1c" />
                      </radialGradient>
                    </defs>
                    <path d="M33 62 19 105l20-10 9 16 10-43z" fill="url(#medal-red-ribbon)" stroke="#8f1d1d" strokeWidth="1.5" />
                    <path d="m44 65-2 45 9-8 9 10 5-44z" fill="url(#medal-black-ribbon)" stroke="#111111" strokeWidth="1.5" />
                    <path d="m56 62 3 46 16-14 12 11-13-49z" fill="url(#medal-gold-ribbon)" stroke="#9a6a16" strokeWidth="1.5" />
                    <circle cx="50" cy="47" r="31" fill="url(#medal-gold-face)" stroke="#8f6418" strokeWidth="2.5" />
                    <circle cx="50" cy="47" r="25" fill="none" stroke="#fff1b2" strokeWidth="2" />
                    <circle cx="50" cy="47" r="21" fill="none" stroke="#c28c2d" strokeWidth="1" />
                    <path d="m34 34 2.2 4.5 5 .7-3.6 3.5.9 5-4.5-2.4-4.5 2.4.9-5-3.6-3.5 5-.7z" fill="#fff5c4" opacity=".8" />
                    <path d="M69 30h.1M75 41h.1M28 53h.1" stroke="#fff8d5" strokeWidth="4" strokeLinecap="round" />
                  </svg>
                </div>
                <div className="certificate-frame-outer rounded-[27px] p-[6px] shadow-[0_32px_78px_rgba(15,15,15,0.28)]">
                  <div className="certificate-frame-inner rounded-[21px] p-[3px]">
                    <div className="certificate-paper rounded-[18px] p-3 sm:p-4">
                      <Image
                        src="/telc-b1-certificate.jpeg"
                        alt="Beispielansicht eines telc Deutsch B1 Zertifikats mit verdeckten persönlichen Angaben."
                        width={768}
                        height={1056}
                        priority
                        unoptimized
                        className="mx-auto h-auto w-full rounded-lg border border-slate-200 shadow-[0_12px_30px_rgba(15,23,42,0.14)]"
                      />
                      <div className="mt-4 border-t border-[#D4AF37]/30 px-1 pt-3 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <svg aria-hidden="true" viewBox="0 0 36 24" className="h-3.5 w-5 shrink-0 rounded-[2px]">
                            <rect width="36" height="8" fill="#111111" />
                            <rect y="8" width="36" height="8" fill="#DD0000" />
                            <rect y="16" width="36" height="8" fill="#FFCC00" />
                          </svg>
                          <p className="text-xs font-extrabold text-slate-800 sm:text-sm">Beispiel eines telc Deutsch B1 Prüfungszertifikats</p>
                        </div>
                        <p className="mt-1.5 text-[10px] leading-4 text-slate-500 sm:text-xs">
                          MyTelc ist eine Prüfungsvorbereitung, kein Zertifikatsaussteller. Das Original wird von telc ausgestellt.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <a
                href="/telc-b1-certificate.jpeg"
                target="_blank"
                rel="noopener noreferrer"
                className="certificate-example-button relative z-10 mx-auto mt-6 flex w-fit items-center justify-center gap-2 rounded-full px-6 py-3.5 text-center text-sm font-extrabold"
              >
                <ProfileIcon name="document" className="h-4 w-4" />
                Beispielzertifikat ansehen
              </a>
            </div>
            <div id="modules" className="mt-5 scroll-mt-6 rounded-[24px] border border-slate-100 bg-white p-5 shadow-[0_10px_30px_rgba(15,23,42,0.06)]">
              <h3 className="text-right text-sm font-black text-[#0A2540]" dir="rtl">الوصول السريع للمواد</h3>
              <div className="mt-3 grid grid-cols-3 gap-2 sm:gap-3">
                {quickAccessModules.map((module) => (
                  <a
                    key={module.href}
                    href={module.href}
                    className={`flex min-w-0 flex-col items-center gap-2 rounded-2xl border border-white/80 ${module.background} px-2 py-3 text-center shadow-sm transition hover:-translate-y-0.5`}
                  >
                    <ProfileIcon name={module.icon} className={`h-6 w-6 ${module.color}`} />
                    <span className="text-xs font-black text-[#0A2540] sm:text-sm">{module.german}</span>
                    <span className="text-[11px] font-semibold text-slate-600" dir="rtl">{module.arabic}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="uebungen" aria-label="Lernbereiche" className="scroll-mt-24 px-6 py-16">
        <div className="mx-auto max-w-[1080px]">
          <div className="mb-8 text-center">
            <p className="text-sm font-black uppercase tracking-[0.18em] text-violet-700">Direkt loslegen</p>
            <h2 className="mt-2 text-3xl font-black text-[#0A2540]">Deine TELC B1 Lernbereiche</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            <article id="lesen" className="scroll-mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <span className="text-sm font-black uppercase tracking-wider text-blue-700">Lesen · B1</span>
              <h3 className="mt-2 text-xl font-black text-[#0A2540]">Lesen</h3>
              <div dir="rtl" lang="ar" className="mt-4 text-right">
                <p className="font-bold leading-7 text-[#0A2540]">طوّر مهاراتك في القراءة وافهم النصوص بثقة!</p>
                <p className="mt-3 leading-7 text-slate-700">
                  تدرّب على مختلف أنواع نصوص telc، وتعلّم كيفاش تستخرج المعلومات المهمة وتختار الإجابة المناسبة. تمارين تفاعلية، تصحيح مباشر، وشروحات كتعاونك تفهم طريقة الحل وتتجنب الأخطاء.
                </p>
                <ul className="mt-4 list-disc space-y-2 pr-6 leading-7 text-slate-700">
                  <li>تدريب شامل على جميع أجزاء Lesen وSprachbausteine.</li>
                  <li>معرفة سبب صحة أو خطأ كل إجابة.</li>
                  <li>إبراز الكلمات والتعابير الأساسية لفهم النصوص بسهولة.</li>
                </ul>
              </div>
            </article>

            <article id="hoeren" className="scroll-mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <span className="text-sm font-black uppercase tracking-wider text-violet-700">Hören · B1</span>
              <h3 className="mt-2 text-xl font-black text-[#0A2540]">Hören</h3>
              <div dir="rtl" lang="ar" className="mt-4 text-right">
                <p className="font-bold leading-7 text-[#0A2540]">خلّي الاستماع نقطة قوة فـ TELC B1!</p>
                <p className="mt-3 leading-7 text-slate-700">
                  اكتشف طريقة مختلفة للتدرب على Hören من خلال تمارين مبنية على أنماط أسئلة TELC B1. تعلّم تفهم الحوارات، تلتقط التفاصيل المهمة، وتربط المعلومات بالسياق الصحيح.
                </p>
                <ul className="mt-4 list-disc space-y-2 pr-6 leading-7 text-slate-700">
                  <li>تدريبات تحاكي طبيعة أسئلة telc B1.</li>
                  <li>أمثلة مبسطة لتسهيل فهم الحوارات.</li>
                  <li>تفسيرات واضحة تساعدك تعرف علاش كل جواب هو الصحيح.</li>
                </ul>
              </div>
              <button
                type="button"
                onClick={playListeningSample}
                className="mt-4 rounded-xl bg-violet-700 px-5 py-3 font-bold text-white transition hover:bg-violet-800"
              >
                Audio abspielen
              </button>
              <p aria-live="polite" className="mt-3 min-h-6 text-sm text-slate-600">{listeningStatus}</p>
            </article>

            <article id="schreiben" className="scroll-mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <span className="text-sm font-black uppercase tracking-wider text-amber-700">✍️ Schreiben · B1</span>
              <h3 className="mt-2 text-xl font-black text-[#0A2540]">Schreiben</h3>
              <div dir="rtl" lang="ar" className="mt-4 text-right">
                <p className="font-bold leading-7 text-[#0A2540]">كتب بثقة وجيب النقطة كاملة!</p>
                <p className="mt-3 leading-7 text-slate-700">
                  متبقاش تسنى سيمانات باش يصحح ليك شي أستاذ. تعلّم كيفاش تكتب الـ Brief ديالك بطريقة صحيحة، سواء كانت Beschwerde ولا Bitte um Information، وتفهم شنو كيقلبو عليه المصححين فـ TELC B1.
                </p>
                <ul className="mt-4 list-disc space-y-2 pr-6 leading-7 text-slate-700">
                  <li>تصحيح فوري لجميع مواضيع Schreiben ديال B1</li>
                  <li>تعلّم الـ Redemittel الصحيحة لكل نوع ديال الرسالة</li>
                  <li>اقتراحات باش تحسن الـ Vocabulary والروابط بين الجمل</li>
                </ul>
              </div>
              <label htmlFor="writing-practice" className="mt-4 block text-sm font-bold text-[#0A2540]">Deine Antwort</label>
              <textarea
                id="writing-practice"
                rows={4}
                placeholder="Schreibe deine Antwort hier ..."
                className="mt-2 w-full resize-y rounded-2xl border border-slate-300 bg-white p-4 leading-6 text-slate-800 outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-200"
              />
            </article>

          </div>
        </div>
      </section>

      <section className="border-y border-slate-100 bg-white">
        <div className="mx-auto flex max-w-[1280px] flex-wrap items-center justify-center gap-x-12 gap-y-5 px-6 py-6 lg:px-8 lg:justify-between">
          {["Geprüfte Inhalte", "Offizielle TELC Themen", "Sofortiger Zugang"].map((item) => (
            <div key={item} className="flex items-center gap-3 text-sm font-bold text-[#0A2540]">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#10B981]/10 text-sm text-[#10B981]">✓</span>
              {item}
            </div>
          ))}
        </div>
      </section>

      <section id="packs" ref={packsSectionRef} className="premium-packs-section relative isolate scroll-mt-24 px-6 py-24 lg:py-28">
        <div className="relative z-10 mx-auto max-w-[1280px] lg:px-8">
          <div className="text-center">
            <p className="text-sm font-black uppercase tracking-[0.18em] text-[#9A6A16]">Packs Premium</p>
            <svg aria-hidden="true" viewBox="0 0 32 32" className="mx-auto mt-3 h-8 w-8 drop-shadow-[0_3px_6px_rgba(180,135,32,0.22)]">
              <path d="m4 23 3-13 7 6 2-10 3 10 7-6 2 13H4Zm2 3h20v2H6v-2Z" fill="#D4AF37" stroke="#9A6A16" strokeLinejoin="round" strokeWidth="1.2" />
            </svg>
            <h2 className="mt-3 text-4xl font-black tracking-tight text-slate-950 md:text-5xl">Choisissez votre Pack</h2>
            <p className="mx-auto mt-5 max-w-2xl leading-7 text-slate-600">
              Choisissez la formule adaptée à votre préparation TELC B1 et avancez à votre rythme.
            </p>
          </div>

          <div className="mx-auto mt-8 max-w-xl">
            <label htmlFor="packs-email" className="mb-2 block text-sm font-bold text-[#0A2540]">
              Deine E-Mail-Adresse
            </label>
            <input
              id="packs-email"
              type="email"
              required
              autoComplete="email"
              placeholder="deine@email.de"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-5 py-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-[#2563EB] focus:ring-4 focus:ring-[#2563EB]/10"
            />
          </div>

          <div dir="ltr" className="mt-12 grid items-stretch gap-6 md:grid-cols-2 lg:grid-cols-3">
            {paidPacks.map((pack) => {
              const isPopular = pack.theme === "popular";
              const isVip = pack.theme === "best";
              const packLink = `https://wa.me/212645674504?text=${encodeURIComponent(
                `Bonjour, je souhaite choisir le ${pack.name} à ${pack.price} DH.`
              )}`;
              const hasOldPrice = Number(pack.oldPrice) > Number(pack.price);
              const cardThemeClass = isPopular
                ? "pack-card-popular order-first z-10 md:order-none lg:scale-[1.035]"
                : isVip
                  ? "pack-card-vip"
                  : "pack-card-basic";
              const badgeClass = isPopular
                ? "pack-badge-popular"
                : isVip
                  ? "pack-badge-vip"
                  : "pack-badge-basic";
              return (
                <article
                  key={pack.name}
                  className={`pack-reveal pack-card relative flex flex-col overflow-hidden rounded-[24px] border bg-white p-7 pt-8 shadow-[0_18px_50px_rgba(15,23,42,0.08)] transition-all duration-500 hover:-translate-y-2 sm:p-8 ${cardThemeClass}`}
                >
                  <div className="mb-6 flex min-h-9 items-center justify-between gap-2">
                    <span className={badgeClass}>
                      {pack.label}
                    </span>
                    {isPopular && (
                      <svg aria-hidden="true" viewBox="0 0 32 32" className="h-7 w-7 shrink-0 drop-shadow-[0_3px_6px_rgba(180,135,32,0.32)]">
                        <path d="m4 23 3-13 7 6 2-10 3 10 7-6 2 13H4Zm2 3h20v2H6v-2Z" fill="#D4AF37" stroke="#9A6A16" strokeLinejoin="round" strokeWidth="1.2" />
                      </svg>
                    )}
                    {isVip && <span aria-hidden="true" className="text-sm tracking-[0.2em] text-[#C9A338]">✦ ✧ ✦</span>}
                  </div>
                  <h3 className="text-xl font-black tracking-tight text-slate-950 sm:text-2xl">{pack.name}</h3>
                  {hasOldPrice && (
                    <p className="mt-4 text-sm font-semibold text-slate-400 line-through decoration-slate-400">
                      {pack.oldPrice} DH
                    </p>
                  )}
                  <div className={`${hasOldPrice ? "mt-1" : "mt-5"} flex items-end gap-2`}>
                    <span className="text-6xl font-black tracking-tight text-slate-950 sm:text-7xl">{pack.price}</span>
                    <span className="mb-2 text-lg font-extrabold text-[#A77C16]">DH</span>
                  </div>
                  <p dir="rtl" className="mt-2 text-sm font-medium text-slate-500">{pack.duration}</p>
                  {pack.savings && <p className="mt-3 text-sm font-extrabold text-[#9A7100]">{pack.savings}</p>}
                  <div className="my-6 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/35 to-transparent" />
                  <ul dir="rtl" lang="ar" className="flex-1 space-y-4 text-sm leading-6 text-slate-700">
                    {commonPackFeatures.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-xs font-black text-emerald-700 ring-1 ring-emerald-100">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-7 flex items-stretch gap-3">
                    <a
                      href={packLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="pack-buy-button inline-flex min-h-14 flex-1 items-center justify-center rounded-2xl px-5 py-4 text-center text-sm font-black text-white"
                    >
                      Choisir ce pack
                    </a>
                    <a
                      href={WHATSAPP_HELP_LINK}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Contacter sur WhatsApp pour ${pack.name}`}
                      className="pack-whatsapp-button inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#1FAF58] text-white shadow-[0_8px_20px_rgba(37,211,102,0.25)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#159447] hover:shadow-[0_12px_26px_rgba(37,211,102,0.32)]"
                    >
                      <svg aria-hidden="true" viewBox="0 0 32 32" className="h-6 w-6 fill-current">
                        <path d="M16.04 3C8.88 3 3.06 8.82 3.06 15.98c0 2.29.6 4.52 1.74 6.5L3 29l6.68-1.75a12.94 12.94 0 0 0 6.36 1.66h.01c7.16 0 12.98-5.82 12.98-12.98A12.9 12.9 0 0 0 25.22 6.7 12.9 12.9 0 0 0 16.04 3Zm0 23.7h-.01c-1.98 0-3.92-.53-5.62-1.54l-.4-.24-3.96 1.04 1.06-3.86-.26-.4a10.7 10.7 0 0 1-1.64-5.72c0-5.95 4.85-10.8 10.81-10.8 2.88 0 5.59 1.12 7.63 3.17a10.73 10.73 0 0 1 3.16 7.64c0 5.96-4.85 10.81-10.8 10.81Zm5.93-8.1c-.32-.16-1.9-.94-2.2-1.05-.3-.1-.51-.16-.73.16-.21.32-.83 1.05-1.02 1.27-.19.21-.38.24-.7.08-.32-.16-1.36-.5-2.59-1.6-.96-.86-1.61-1.91-1.8-2.23-.19-.32-.02-.49.14-.65.14-.14.32-.38.48-.57.16-.19.21-.32.32-.54.1-.21.05-.4-.03-.56-.08-.16-.73-1.75-1-2.4-.26-.63-.53-.54-.73-.55l-.62-.01c-.22 0-.57.08-.86.4-.3.32-1.13 1.1-1.13 2.68s1.16 3.11 1.32 3.33c.16.21 2.28 3.48 5.52 4.88.77.33 1.37.53 1.84.68.77.24 1.47.21 2.02.13.62-.09 1.9-.78 2.17-1.53.27-.75.27-1.4.19-1.53-.08-.14-.3-.22-.62-.38Z" />
                      </svg>
                    </a>
                  </div>
                </article>
              );
            })}
          </div>

          <div
            id="pack-24h"
            className={`pack-trial-offer pack-reveal mt-10 flex flex-col items-center justify-between gap-5 rounded-3xl border border-emerald-200/80 bg-white/80 p-6 shadow-[0_14px_38px_rgba(15,23,42,0.06)] sm:flex-row sm:p-8 ${trialPackHighlighted ? "pack-trial-highlight" : ""}`}
          >
            <div className="text-center sm:text-left">
              <span className="inline-flex rounded-full bg-emerald-50 px-3 py-1 text-[10px] font-black tracking-[0.14em] text-emerald-800 ring-1 ring-emerald-200">
                {trialPack.badge}
              </span>
              <h3 className="mt-3 text-lg font-black text-slate-950">Essayez MyTelc gratuitement pendant 24 heures</h3>
              <p dir="rtl" className="mt-1 text-sm text-slate-600">{trialPack.duration} · 0 DH · Sans engagement</p>
            </div>
            <a
              href={`https://wa.me/212645674504?text=${encodeURIComponent("Bonjour, je souhaite essayer gratuitement le Pack 24h à 0 DH.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="pack-trial-button inline-flex min-h-12 w-full items-center justify-center rounded-2xl px-6 py-3 text-center text-sm font-black text-white sm:w-auto"
            >
              Activer l&apos;essai gratuit
            </a>
          </div>
        </div>
      </section>

      <section
        id="bewertungen"
        ref={testimonialsSectionRef}
        aria-labelledby="testimonials-heading"
        className="testimonials-section relative isolate overflow-hidden px-6 py-24 lg:py-28"
      >
        <div aria-hidden="true" className="pointer-events-none absolute -left-32 top-20 h-80 w-80 rounded-full bg-[#D4AF37]/10 blur-3xl" />
        <div aria-hidden="true" className="pointer-events-none absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-[#F0D98B]/20 blur-3xl" />
        <div className="relative mx-auto max-w-[1280px] lg:px-8">
          <div className="text-center">
            <p className="text-sm font-black uppercase tracking-[0.18em] text-[#9A6A16]">Témoignages</p>
            <h2 id="testimonials-heading" className="mt-4 flex flex-wrap items-center justify-center gap-3 text-4xl font-black tracking-tight text-slate-950 md:text-5xl">
              Ils ont réussi avec MyTelc
              <svg aria-hidden="true" viewBox="0 0 32 32" className="h-8 w-8 shrink-0 drop-shadow-[0_2px_4px_rgba(180,135,32,0.3)]">
                <path d="m4 23 3-13 7 6 2-10 3 10 7-6 2 13H4Zm2 3h20v2H6v-2Z" fill="#D4AF37" stroke="#9A6A16" strokeLinejoin="round" strokeWidth="1.2" />
              </svg>
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-sm leading-6 text-slate-600">
              Les noms, citations et scores ci-dessous sont des exemples illustratifs, pas des avis clients vérifiés.
            </p>
          </div>

          <div className="mt-12 grid items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {testimonials.map((testimonial, index) => {
              const isVeryGood = testimonial.badge === "SEHR GUT";

              return (
                <article
                  key={testimonial.name}
                  style={{ transitionDelay: `${index * 90}ms` }}
                  className="testimonial-card relative flex flex-col overflow-hidden rounded-[24px] border border-slate-100 bg-white p-6 shadow-[0_18px_48px_rgba(47,37,18,0.08)]"
                >
                  <span aria-hidden="true" className="testimonial-quote-mark">“</span>
                  <div className="relative z-10 flex flex-col">
                    <div className="flex items-center gap-3">
                      <StudentAvatar name={testimonial.name} variant={index} />
                      <div className="min-w-0">
                        <h3 className="truncate text-base font-black text-slate-950">{testimonial.name}</h3>
                        <p className="mt-0.5 text-sm font-medium text-slate-500">Niveau {testimonial.level}</p>
                      </div>
                    </div>

                    <div className="mt-5">
                      <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[10px] font-black tracking-[0.08em] shadow-sm ${
                        isVeryGood
                          ? "bg-gradient-to-r from-[#FFF0B3] via-[#E3C15C] to-[#C2942E] text-[#56390D]"
                          : "bg-gradient-to-r from-[#16A36A] to-[#07824F] text-white"
                      }`}>
                        {isVeryGood ? (
                          <svg aria-hidden="true" viewBox="0 0 16 16" className="h-3.5 w-3.5 fill-current">
                            <path d="m8 1 1.8 4 4.3.4-3.3 2.8 1 4.2L8 10.2l-3.8 2.2 1-4.2L1.9 5.4 6.2 5 8 1Z" />
                          </svg>
                        ) : (
                          <svg aria-hidden="true" viewBox="0 0 16 16" className="h-3.5 w-3.5 fill-none">
                            <path d="m3 8 3.2 3.2L13 4.8" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                          </svg>
                        )}
                        {testimonial.badge}
                      </span>
                    </div>

                    <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                      <span className="testimonial-score rounded-xl bg-gradient-to-br from-[#171717] to-black px-4 py-2 text-lg font-black tracking-tight">
                        <span className="testimonial-score-text">{testimonial.score}</span>
                      </span>
                      <span role="img" aria-label="5 étoiles" className="testimonial-stars text-2xl tracking-[0.08em] text-[#D4AF37]">
                        ★★★★★
                      </span>
                    </div>

                    <p className="mt-5 flex-1 text-sm leading-7 text-slate-700">
                      {testimonial.quote}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/inscription"
              className="inline-flex min-h-12 items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-[#DD0000] to-[#F97316] px-6 py-3 text-center text-sm font-black text-white shadow-[0_10px_26px_rgba(221,0,0,0.2)] transition hover:-translate-y-0.5 hover:shadow-[0_14px_32px_rgba(221,0,0,0.28)]"
            >
              Rejoins +850 élèves qui ont réussi
              <span aria-hidden="true" className="text-lg">→</span>
            </Link>
            <a
              href={WHATSAPP_HELP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-emerald-200 bg-white px-5 py-3 text-sm font-bold text-emerald-800 shadow-sm transition hover:border-emerald-300 hover:bg-emerald-50"
            >
              <svg aria-hidden="true" viewBox="0 0 32 32" className="h-5 w-5 fill-[#25D366]">
                <path d="M16.04 3C8.88 3 3.06 8.82 3.06 15.98c0 2.29.6 4.52 1.74 6.5L3 29l6.68-1.75a12.94 12.94 0 0 0 6.36 1.66h.01c7.16 0 12.98-5.82 12.98-12.98A12.9 12.9 0 0 0 25.22 6.7 12.9 12.9 0 0 0 16.04 3Zm0 23.7h-.01c-1.98 0-3.92-.53-5.62-1.54l-.4-.24-3.96 1.04 1.06-3.86-.26-.4a10.7 10.7 0 0 1-1.64-5.72c0-5.95 4.85-10.8 10.81-10.8 2.88 0 5.59 1.12 7.63 3.17a10.73 10.73 0 0 1 3.16 7.64c0 5.96-4.85 10.81-10.8 10.81Zm5.93-8.1c-.32-.16-1.9-.94-2.2-1.05-.3-.1-.51-.16-.73.16-.21.32-.83 1.05-1.02 1.27-.19.21-.38.24-.7.08-.32-.16-1.36-.5-2.59-1.6-.96-.86-1.61-1.91-1.8-2.23-.19-.32-.02-.49.14-.65.14-.14.32-.38.48-.57.16-.19.21-.32.32-.54.1-.21.05-.4-.03-.56-.08-.16-.73-1.75-1-2.4-.26-.63-.53-.54-.73-.55l-.62-.01c-.22 0-.57.08-.86.4-.3.32-1.13 1.1-1.13 2.68s1.16 3.11 1.32 3.33c.16.21 2.28 3.48 5.52 4.88.77.33 1.37.53 1.84.68.77.24 1.47.21 2.02.13.62-.09 1.9-.78 2.17-1.53.27-.75.27-1.4.19-1.53-.08-.14-.3-.22-.62-.38Z" />
              </svg>
              Aide sur WhatsApp
            </a>
          </div>
        </div>
      </section>

      <section className="bg-[#F8FAFC] px-6 py-16">
        <div className="mx-auto flex max-w-[1280px] items-center justify-center gap-5 rounded-[24px] border border-[#10B981]/20 bg-white px-6 py-8 text-center shadow-[0_15px_45px_rgba(15,23,42,0.06)] md:gap-8 md:text-left">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[#10B981]/10 text-3xl text-[#10B981]">◆</div>
          <div>
            <h2 className="text-xl font-black md:text-2xl">100% Zufriedenheitsgarantie</h2>
            <p className="mt-2 text-slate-600">Wenn du nicht zufrieden bist, finden wir gemeinsam eine Lösung.</p>
          </div>
        </div>
      </section>

      <section id="ablauf" className="bg-white px-6 py-24 lg:py-28">
        <div className="mx-auto max-w-[1280px] lg:px-8">
          <div className="text-center">
            <p className="text-sm font-black uppercase tracking-[0.18em] text-[#2563EB]">In drei Schritten</p>
            <h2 className="mt-4 text-4xl font-black tracking-tight md:text-5xl">So einfach geht es</h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              ["1", "Pack wählen", "Wähle das Paket, das zu deinem Ziel und deinem Lernbedarf passt."],
              ["2", "Auf WhatsApp bezahlen", "Kontaktiere uns und wähle deine bevorzugte Zahlungsmethode."],
              ["3", "Sofort Zugang erhalten", "Nach der Zahlung erhältst du deinen direkten Zugang zur Vorbereitung."],
            ].map(([number, title, text]) => (
              <article key={number} className="relative rounded-[24px] border border-slate-100 bg-[#F8FAFC] p-8">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#2563EB] text-lg font-black text-white shadow-[0_10px_25px_rgba(37,99,235,0.20)]">{number}</span>
                <h3 className="mt-6 text-xl font-black">{title}</h3>
                <p className="mt-3 leading-7 text-slate-600">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="bg-[#F8FAFC] px-6 py-24 lg:py-28">
        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <p className="text-sm font-black uppercase tracking-[0.18em] text-[#DD0000]">FAQ · Fragen und Antworten</p>
            <h2 className="mt-4 text-4xl font-black tracking-tight text-black md:text-5xl">
              <span className="block">Häufige Fragen</span>
              <span dir="rtl" lang="ar" className="mt-2 block text-xl font-bold text-slate-500 md:text-2xl">الأسئلة الشائعة</span>
            </h2>
          </div>
          <div className="mt-12 space-y-5">
            {faqs.map((faq, index) => {
              const isOpen = openFaqs.has(faq.germanQuestion);
              const answerId = `faq-answer-${index}`;
              return (
                <article key={faq.germanQuestion} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-shadow duration-300 hover:shadow-md">
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={answerId}
                    onClick={() => toggleFaq(faq.germanQuestion)}
                    className="flex w-full items-center justify-between gap-5 px-5 py-5 text-left sm:px-6"
                  >
                    <span className="min-w-0 flex-1">
                      <span className="block text-base font-bold text-slate-900 sm:text-lg">{faq.germanQuestion}</span>
                      <span dir="rtl" lang="ar" className="mt-1 block text-right text-sm font-medium text-slate-500">{faq.darijaQuestion}</span>
                    </span>
                    <span
                      aria-hidden="true"
                      className={`faq-toggle flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xl font-medium text-slate-500 ${isOpen ? "faq-toggle-open" : ""}`}
                    >
                      +
                    </span>
                  </button>
                  <div id={answerId} aria-hidden={!isOpen} className={`faq-answer ${isOpen ? "faq-answer-open" : ""}`}>
                    <div className="min-h-0 overflow-hidden">
                      <div className="space-y-3 border-t border-slate-100 px-5 py-5 leading-7 text-slate-600 sm:px-6">
                        <p dir="ltr" className="text-left">{faq.germanAnswer}</p>
                        <p dir="rtl" lang="ar" className="text-right">{faq.darijaAnswer}</p>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
          <a
            href={WHATSAPP_HELP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="mx-auto mt-8 inline-flex w-full items-center justify-center rounded-xl bg-[#25D366] px-6 py-4 text-center font-black text-white shadow-[0_10px_25px_rgba(37,211,102,0.22)] transition hover:bg-[#1ebe5d] sm:w-auto"
          >
            Frage stellen / سولنا في الواتساب 💬
          </a>
        </div>
      </section>

      <section id="about" className="scroll-mt-24 bg-[#F8FAFC] px-6 py-20 lg:py-24">
        <div className="mx-auto grid max-w-[1080px] items-center gap-10 md:grid-cols-[1fr_260px]">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.18em] text-[#2563EB]">À propos de MyTelc</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-[#0A2540] md:text-4xl">Notre histoire</h2>
            <p className="mt-5 max-w-2xl leading-7 text-slate-600">
              MyTelc rassemble au même endroit des ressources pour préparer le TELC B1. Notre objectif : aider chacun à organiser ses révisions, pratiquer les différentes compétences et avancer pas à pas vers l’examen.
            </p>
          </div>
          <figure className="mx-auto w-full max-w-[220px] rounded-2xl border border-slate-200 bg-white p-3 shadow-[0_18px_45px_rgba(15,23,42,0.12)]">
            <Image
              src="/telc-b1-certificate.jpeg"
              alt="Photo du certificat TELC B1 avec les informations personnelles masquées."
              width={768}
              height={1056}
              unoptimized
              className="h-auto w-full rounded-lg"
            />
            <figcaption className="pt-3 text-center text-xs font-semibold text-slate-500">Un exemple de certificat TELC B1</figcaption>
          </figure>
        </div>
      </section>

      <footer id="contact" className="scroll-mt-24 border-t border-slate-100 bg-[#0A2540] px-6 py-10 text-white">
        <div className="mx-auto flex max-w-[1280px] flex-col items-center justify-between gap-5 text-center lg:flex-row lg:px-8">
          <p className="text-lg font-black tracking-tight">MY<span className="text-[#2563EB]">TELC</span></p>
          <div>
            <p className="font-bold">Noch Fragen? Schreib uns auf WhatsApp</p>
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="mt-1 inline-block text-sm text-white/75 transition hover:text-white">
              +212 645-674504
            </a>
          </div>
          <p className="text-sm text-white/45">© 2026 MyTELC</p>
        </div>
      </footer>

      <a
        href={WHATSAPP_LINK}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp Business kontaktieren"
        className="whatsapp-float"
      >
        <svg viewBox="0 0 32 32" aria-hidden="true" className="h-7 w-7 fill-current">
          <path d="M16.04 3C8.88 3 3.06 8.82 3.06 15.98c0 2.29.6 4.52 1.74 6.5L3 29l6.68-1.75a12.94 12.94 0 0 0 6.36 1.66h.01c7.16 0 12.98-5.82 12.98-12.98A12.9 12.9 0 0 0 25.22 6.7 12.9 12.9 0 0 0 16.04 3Zm0 23.7h-.01c-1.98 0-3.92-.53-5.62-1.54l-.4-.24-3.96 1.04 1.06-3.86-.26-.4a10.7 10.7 0 0 1-1.64-5.72c0-5.95 4.85-10.8 10.81-10.8 2.88 0 5.59 1.12 7.63 3.17a10.73 10.73 0 0 1 3.16 7.64c0 5.96-4.85 10.81-10.8 10.81Zm5.93-8.1c-.32-.16-1.9-.94-2.2-1.05-.3-.1-.51-.16-.73.16-.21.32-.83 1.05-1.02 1.27-.19.21-.38.24-.7.08-.32-.16-1.36-.5-2.59-1.6-.96-.86-1.61-1.91-1.8-2.23-.19-.32-.02-.49.14-.65.14-.14.32-.38.48-.57.16-.19.21-.32.32-.54.1-.21.05-.4-.03-.56-.08-.16-.73-1.75-1-2.4-.26-.63-.53-.54-.73-.55l-.62-.01c-.22 0-.57.08-.86.4-.3.32-1.13 1.1-1.13 2.68s1.16 3.11 1.32 3.33c.16.21 2.28 3.48 5.52 4.88.77.33 1.37.53 1.84.68.77.24 1.47.21 2.02.13.62-.09 1.9-.78 2.17-1.53.27-.75.27-1.4.19-1.53-.08-.14-.3-.22-.62-.38Z" />
        </svg>
        <span className="whatsapp-badge">1</span>
      </a>

      <nav aria-label="التنقل بين الدروس" className="study-mobile-nav fixed inset-x-0 bottom-0 z-[70] border-t border-slate-200 bg-white/95 px-2 pt-2 shadow-[0_-8px_24px_rgba(15,23,42,0.12)] backdrop-blur-xl lg:hidden">
        <div className="mx-auto grid max-w-lg grid-cols-4 gap-1">
          {studyNavigation.map((item) => {
            const isActive = activeStudyNav === item.href;
            return (
              <a
                key={item.href}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                dir={item.href === "#home" ? "rtl" : "ltr"}
                onClick={() => setActiveStudyNav(item.href)}
                className={`flex min-w-0 flex-col items-center justify-center gap-1 rounded-xl px-1 py-2 text-[10px] font-bold transition sm:text-xs ${
                  isActive ? "bg-violet-700 text-white" : "text-slate-500 hover:bg-violet-50 hover:text-violet-700"
                }`}
              >
                <ProfileIcon name={item.icon} className="h-5 w-5 shrink-0" />
                <span className="max-w-full truncate">{item.label}</span>
              </a>
            );
          })}
        </div>
      </nav>
    </main>
  );
}
