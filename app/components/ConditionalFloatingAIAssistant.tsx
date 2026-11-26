"use client";

import { usePathname } from "next/navigation";
import FloatingAIAssistant from "./FloatingAIAssistant";

export default function ConditionalFloatingAIAssistant() {
  const pathname = usePathname();
  if (
    pathname === "/tasribat" ||
    pathname.startsWith("/tasribat/") ||
    pathname === "/exams/sprechen/teil-1"
  ) {
    return null;
  }
  return <FloatingAIAssistant />;
}
