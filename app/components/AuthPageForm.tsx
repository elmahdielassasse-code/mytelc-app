"use client";

import Link from "next/link";
import { useState } from "react";
import type { FormEvent } from "react";
import { addLocalUser } from "../lib/local-users";

type AuthPageFormProps = {
  mode: "register" | "login";
};

export default function AuthPageForm({ mode }: AuthPageFormProps) {
  const isRegister = mode === "register";
  const [notice, setNotice] = useState("");
  const [noticeIsError, setNoticeIsError] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!isRegister) {
      setNoticeIsError(true);
      setNotice("La connexion membre n’est pas encore activée.");
      return;
    }

    const form = event.currentTarget;
    const formData = new FormData(form);
    const fullName = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim().toLowerCase();
    const password = String(formData.get("password") ?? "");
    setNotice("");

    try {
      if (fullName.length < 2 || fullName.length > 100) {
        throw new Error("Le nom doit contenir entre 2 et 100 caractères.");
      }
      if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        throw new Error("Adresse e-mail invalide.");
      }
      if (password.length < 8 || password.length > 128) {
        throw new Error("Le mot de passe doit contenir entre 8 et 128 caractères.");
      }

      addLocalUser(fullName, email);
      setNoticeIsError(false);
      setNotice("Compte enregistré localement sur cet appareil.");
      form.reset();
    } catch (error) {
      setNoticeIsError(true);
      setNotice(error instanceof Error ? error.message : "Connexion impossible. Réessaie dans un instant.");
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F8FAFC] px-4 py-12">
      <section className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_24px_70px_rgba(15,23,42,0.1)] sm:p-9">
        <Link href="/" className="text-xl font-black tracking-tight text-[#0A2540]">
          MY<span className="text-[#2563EB]">TELC</span>
        </Link>

        <div className="mt-8">
          <h1 className="text-2xl font-black text-slate-900">
            {isRegister ? "Créer un compte" : "Se connecter"}
          </h1>
          <p dir="rtl" className="mt-2 text-right text-lg font-bold text-slate-700">
            {isRegister ? "إنشاء حساب جديد" : "تسجيل الدخول"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-7 space-y-4">
          {isRegister && (
            <label className="block">
              <span className="mb-1.5 block text-sm font-semibold text-slate-700">Nom complet / الاسم الكامل</span>
              <input
                type="text"
                name="name"
                autoComplete="name"
                required
                className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-slate-900 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
              />
            </label>
          )}
          <label className="block">
            <span className="mb-1.5 block text-sm font-semibold text-slate-700">Adresse e-mail / البريد الإلكتروني</span>
            <input
              type="email"
              name="email"
              autoComplete="email"
              required
              className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-slate-900 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
            />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-sm font-semibold text-slate-700">Mot de passe / كلمة المرور</span>
            <input
              type="password"
              name="password"
              autoComplete={isRegister ? "new-password" : "current-password"}
              minLength={8}
              required
              className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-slate-900 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
            />
          </label>

          <button
            type="submit"
            className={`flex min-h-12 w-full flex-col items-center justify-center rounded-xl px-4 py-2 text-white transition hover:brightness-105 ${
              isRegister
                ? "bg-gradient-to-r from-[#DD0000] to-[#F97316] font-extrabold shadow-[0_8px_20px_rgba(221,0,0,0.18)]"
                : "bg-[#0A2540] font-bold"
            }`}
          >
            <span dir="rtl">{isRegister ? "إنشاء حساب" : "تسجيل الدخول"}</span>
            <span className="text-xs font-medium text-white/80">
              {isRegister ? "Créer un compte" : "Se connecter"}
            </span>
          </button>
        </form>

        {notice && (
          <p
            role={noticeIsError ? "alert" : "status"}
            className={`mt-4 rounded-xl border px-4 py-3 text-sm leading-6 ${
              noticeIsError
                ? "border-rose-200 bg-rose-50 text-rose-800"
                : "border-emerald-200 bg-emerald-50 text-emerald-800"
            }`}
          >
            {notice}
          </p>
        )}

        <p className="mt-6 text-center text-sm text-slate-600">
          {isRegister ? "Déjà inscrit ?" : "Pas encore de compte ?"}{" "}
          <Link
            href={isRegister ? "/connexion" : "/inscription"}
            className="font-bold text-blue-700 underline-offset-4 hover:underline"
          >
            {isRegister ? "Se connecter" : "Créer un compte"}
          </Link>
        </p>
      </section>
    </main>
  );
}
