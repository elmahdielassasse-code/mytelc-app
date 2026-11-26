import type { Metadata } from "next";
import AuthPageForm from "../components/AuthPageForm";

export const metadata: Metadata = {
  title: "Se connecter | MyTELC",
};

export default function LoginPage() {
  return <AuthPageForm mode="login" />;
}
