import type { Metadata } from "next";
import AuthPageForm from "../components/AuthPageForm";

export const metadata: Metadata = {
  title: "Créer un compte | MyTELC",
};

export default function RegisterPage() {
  return <AuthPageForm mode="register" />;
}
