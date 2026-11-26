"use client";

import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
  isError?: boolean;
};

const welcomeMessage: ChatMessage = {
  role: "assistant",
  content: "Hallo! 👋 Wie kann ich dir helfen?\nسلام! كيفاش نقدر نعاونك؟",
};

function AssistantMark({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 32 32" className={className} fill="none">
      <path d="M16 4v3" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
      <circle cx="16" cy="3" r="2" fill="currentColor" />
      <rect x="5" y="9" width="22" height="17" rx="6" fill="currentColor" />
      <rect x="9" y="13" width="5" height="5" rx="2.5" fill="#6048C8" />
      <rect x="18" y="13" width="5" height="5" rx="2.5" fill="#6048C8" />
      <path d="M12 22h8" stroke="#6048C8" strokeLinecap="round" strokeWidth="2" />
      <path d="M2 14v6m28-6v6" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none">
      <path d="m21 3-7.2 18-3.5-7.3L3 10.2 21 3Z" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.8" />
      <path d="M10.3 13.7 21 3" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none">
      <path d="m18 6-12 12M6 6l12 12" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
    </svg>
  );
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export default function FloatingAIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([welcomeMessage]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    inputRef.current?.focus();
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [isLoading, messages]);

  async function sendMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const question = input.trim();
    if (!question || isLoading) return;

    const conversation = [...messages, { role: "user" as const, content: question }].slice(-12);
    setMessages(conversation);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: conversation.map(({ role, content }) => ({ role, content })),
        }),
      });

      let result: unknown;
      try {
        result = await response.json();
      } catch {
        throw new Error("Réponse invalide du serveur. Réessaie dans un instant.");
      }

      if (!response.ok) {
        const errorMessage = isRecord(result) && typeof result.error === "string"
          ? result.error
          : "L’assistant n’a pas pu répondre. Réessaie dans un instant.";
        throw new Error(errorMessage);
      }

      if (!isRecord(result) || typeof result.reply !== "string" || !result.reply.trim()) {
        throw new Error("L’assistant a renvoyé une réponse invalide.");
      }

      const reply = result.reply;
      setMessages((current) => [...current, { role: "assistant", content: reply }]);
    } catch (error) {
      const errorMessage = error instanceof Error
        ? error.message
        : "Connexion impossible. Vérifie ta connexion et réessaie.";
      setMessages((current) => [...current, { role: "assistant", content: errorMessage, isError: true }]);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      {isOpen && (
        <section
          role="dialog"
          aria-label="MyTelc AI Assistant"
          aria-modal="false"
          className="assistant-chat-window flex flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_24px_80px_rgba(15,23,42,0.22)]"
        >
          <header className="flex items-center gap-3 bg-gradient-to-r from-blue-600 to-violet-600 px-4 py-4 text-white">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white/15">
              <AssistantMark />
            </span>
            <div className="min-w-0 flex-1">
              <h2 className="truncate text-sm font-bold">MyTelc AI Assistant</h2>
              <p className="mt-1 flex items-center gap-1.5 text-xs text-white/85">
                <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
                En ligne - Répond en 1 sec
              </p>
            </div>
            <button
              type="button"
              aria-label="Fermer le chat"
              onClick={() => setIsOpen(false)}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-white/90 transition hover:bg-white/15 hover:text-white"
            >
              <CloseIcon />
            </button>
          </header>

          <div
            role="log"
            aria-label="Messages"
            aria-live="polite"
            aria-relevant="additions"
            className="assistant-chat-messages flex-1 space-y-3 overflow-y-auto bg-slate-50 px-4 py-4"
          >
            {messages.map((message, index) => (
              <div key={`${message.role}-${index}`} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                <p
                  dir="auto"
                  className={`max-w-[88%] whitespace-pre-wrap rounded-2xl px-3.5 py-2.5 text-sm leading-6 shadow-sm ${
                    message.role === "user"
                      ? "rounded-br-md bg-blue-600 text-white"
                      : message.isError
                        ? "rounded-bl-md border border-rose-100 bg-white text-rose-700"
                        : "rounded-bl-md border border-slate-100 bg-white text-slate-800"
                  }`}
                >
                  {message.content}
                </p>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div role="status" aria-label="L’assistant écrit" className="flex gap-1 rounded-2xl rounded-bl-md border border-slate-100 bg-white px-4 py-3 shadow-sm">
                  <span className="assistant-typing-dot" />
                  <span className="assistant-typing-dot" />
                  <span className="assistant-typing-dot" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={sendMessage} className="flex items-center gap-2 border-t border-slate-100 bg-white p-3">
            <input
              ref={inputRef}
              type="text"
              dir="auto"
              maxLength={1800}
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Pose ta question... / اكتب سؤالك"
              aria-label="Écris ta question en arabe, français ou allemand"
              className="h-11 min-w-0 flex-1 rounded-full border border-slate-200 bg-slate-50 px-4 text-sm text-slate-800 outline-none transition focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100"
            />
            <button
              type="submit"
              aria-label="Envoyer le message"
              disabled={!input.trim() || isLoading}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-violet-600 text-white shadow-md transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-45"
            >
              <SendIcon />
            </button>
          </form>
        </section>
      )}

      <button
        type="button"
        aria-label={isOpen ? "Fermer MyTelc AI Assistant" : "Ouvrir MyTelc AI Assistant"}
        aria-expanded={isOpen}
        onClick={() => setIsOpen((open) => !open)}
        className={`assistant-launcher flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 via-violet-600 to-indigo-700 text-white shadow-[0_12px_34px_rgba(79,70,229,0.38)] transition hover:scale-105 hover:shadow-[0_16px_40px_rgba(79,70,229,0.48)] ${isOpen ? "scale-95" : ""}`}
      >
        {isOpen ? <CloseIcon /> : <AssistantMark className="h-8 w-8" />}
        <span aria-hidden="true" className="absolute right-0.5 top-0.5 h-4 w-4 rounded-full border-[3px] border-white bg-emerald-400" />
      </button>
    </>
  );
}
