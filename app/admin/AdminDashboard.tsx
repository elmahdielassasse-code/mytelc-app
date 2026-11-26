"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { FormEvent } from "react";
import {
  deleteLocalUser,
  localUsersUpdatedEvent,
  readLocalUsers,
} from "../lib/local-users";

type AdminUser = ReturnType<typeof readLocalUsers>[number];
type DashboardView = "login" | "dashboard";

const ADMIN_PASSWORD = "MyTelc2026";

export default function AdminDashboard() {
  const [view, setView] = useState<DashboardView>("login");
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [password, setPassword] = useState("");
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (view !== "dashboard") return;
    const refreshUsers = () => {
      try {
        setUsers(readLocalUsers());
        setError("");
      } catch (readError) {
        setError(readError instanceof Error ? readError.message : "Impossible de lire les comptes locaux.");
      }
    };
    window.addEventListener(localUsersUpdatedEvent, refreshUsers);
    window.addEventListener("storage", refreshUsers);
    return () => {
      window.removeEventListener(localUsersUpdatedEvent, refreshUsers);
      window.removeEventListener("storage", refreshUsers);
    };
  }, [view]);

  function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    if (password !== ADMIN_PASSWORD) {
      setError("Mot de passe incorrect");
      return;
    }

    try {
      setUsers(readLocalUsers());
      setPassword("");
      setView("dashboard");
    } catch (readError) {
      setError(readError instanceof Error ? readError.message : "Impossible de lire les comptes locaux.");
    }
  }

  function handleLogout() {
    setUsers([]);
    setView("login");
    setError("");
  }

  function handleDelete(user: AdminUser) {
    if (!window.confirm(`Supprimer définitivement le compte de ${user.email} ?`)) return;
    setError("");

    try {
      deleteLocalUser(user.id);
      setUsers(readLocalUsers());
    } catch (deleteError) {
      setError(deleteError instanceof Error ? deleteError.message : "La suppression a échoué.");
    }
  }

  const filteredUsers = useMemo(() => {
    const normalizedSearch = search.trim().toLocaleLowerCase();
    if (!normalizedSearch) return users;
    return users.filter((user) =>
      user.name.toLocaleLowerCase().includes(normalizedSearch) ||
      user.email.toLocaleLowerCase().includes(normalizedSearch),
    );
  }, [search, users]);

  if (view === "login") {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-12">
        <section className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-7 shadow-[0_24px_70px_rgba(15,23,42,0.12)] sm:p-9">
          <Link href="/" className="text-xl font-black tracking-tight text-[#0A2540]">
            MY<span className="text-[#2563EB]">TELC</span>
          </Link>
          <p className="mt-8 text-xs font-black uppercase tracking-[0.18em] text-blue-700">Espace privé</p>
          <h1 className="mt-2 text-3xl font-black text-slate-900">Administration</h1>
          <p className="mt-3 text-sm leading-6 text-slate-600">Saisis le mot de passe admin pour consulter les comptes inscrits.</p>

          {error && (
            <p role="alert" className="mt-5 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm leading-6 text-rose-800">
              {error}
            </p>
          )}

          <form onSubmit={handleLogin} className="mt-6 space-y-4">
            <label className="block">
              <span className="mb-1.5 block text-sm font-semibold text-slate-700">Mot de passe admin</span>
              <input
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
                className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-slate-900 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
              />
            </label>
            <button
              type="submit"
              className="h-12 w-full rounded-xl bg-gradient-to-r from-blue-700 to-violet-700 px-4 font-bold text-white shadow-lg transition hover:brightness-105"
            >
              Ouvrir le tableau
            </button>
          </form>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-7 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <header className="flex flex-col justify-between gap-5 rounded-3xl bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 p-6 text-white shadow-xl sm:flex-row sm:items-center sm:p-8">
          <div>
            <Link href="/" className="text-sm font-bold text-white/70 transition hover:text-white">← Retour au site</Link>
            <p className="mt-6 text-xs font-black uppercase tracking-[0.2em] text-indigo-300">Espace privé</p>
            <h1 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">Dashboard Admin</h1>
            <p className="mt-2 text-sm text-white/65">Les comptes sont enregistrés localement sur cet appareil.</p>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className="rounded-xl border border-white/20 px-4 py-2.5 text-sm font-semibold text-white/90 transition hover:bg-white/10"
          >
            Se déconnecter
          </button>
        </header>

        {error && (
          <p role="alert" className="mt-5 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800">
            {error}
          </p>
        )}

        <section className="mt-7 grid gap-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end">
          <label className="block">
            <span className="mb-2 block text-sm font-bold text-slate-700">Rechercher par nom ou e-mail</span>
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Ex. Amine ou nom@exemple.com"
              className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
            />
          </label>
          <div className="rounded-xl border border-slate-200 bg-white px-5 py-3 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Utilisateurs au total</p>
            <p className="mt-0.5 text-2xl font-black text-slate-900">{users.length}</p>
          </div>
        </section>

        <section className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 px-5 py-4">
            <h2 className="font-bold text-slate-900">Utilisateurs inscrits</h2>
            <p className="text-xs text-slate-500">Mise à jour automatique depuis ce navigateur</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] border-collapse text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th scope="col" className="px-5 py-3 font-bold">Nom complet</th>
                  <th scope="col" className="px-5 py-3 font-bold">Adresse e-mail</th>
                  <th scope="col" className="px-5 py-3 font-bold">Date d’inscription</th>
                  <th scope="col" className="px-5 py-3 text-right font-bold">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="transition hover:bg-slate-50">
                    <td className="px-5 py-4 font-semibold text-slate-900">{user.name}</td>
                    <td className="px-5 py-4 text-slate-600">{user.email}</td>
                    <td className="px-5 py-4 text-slate-600">
                      {new Intl.DateTimeFormat("fr-FR", { dateStyle: "medium", timeStyle: "short" }).format(new Date(user.createdAt))}
                    </td>
                    <td className="px-5 py-4 text-right">
                      <button
                        type="button"
                        onClick={() => handleDelete(user)}
                        className="rounded-lg border border-rose-200 px-3 py-2 text-xs font-bold text-rose-700 transition hover:bg-rose-50"
                      >
                        Supprimer
                      </button>
                    </td>
                  </tr>
                ))}
                {filteredUsers.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-5 py-12 text-center text-sm text-slate-500">
                      {users.length === 0 ? "Aucun utilisateur inscrit pour le moment." : "Aucun résultat pour cette recherche."}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="border-t border-slate-100 px-5 py-3 text-xs text-slate-500">
            {filteredUsers.length} résultat{filteredUsers.length === 1 ? "" : "s"}
          </div>
        </section>
      </div>
    </main>
  );
}
