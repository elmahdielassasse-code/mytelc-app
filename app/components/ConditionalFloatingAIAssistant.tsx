"use client";

import { usePathname } from "next/navigation";
import FloatingAIAssistant from "./FloatingAIAssistant";

export default function ConditionalFloatingAIAssistant() {
  const pathname = usePathname();
  if (pathname === "/tasribat" || pathname.startsWith("/tasribat/")) return null;
  return <FloatingAIAssistant />;
}
