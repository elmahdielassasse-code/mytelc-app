import type { Metadata } from "next";
import {
  Anton,
  Archivo_Black,
  Cairo,
  Geist,
  Geist_Mono,
  Tajawal,
} from "next/font/google";
import ConditionalFloatingAIAssistant from "./components/ConditionalFloatingAIAssistant";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const archivoBlack = Archivo_Black({
  variable: "--font-archivo-black",
  subsets: ["latin"],
  weight: "400",
});

const anton = Anton({
  variable: "--font-anton",
  subsets: ["latin"],
  weight: "400",
});

const cairoBlack = Cairo({
  variable: "--font-cairo-black",
  subsets: ["arabic"],
  weight: "900",
});

const tajawalExtraBold = Tajawal({
  variable: "--font-tajawal-extrabold",
  subsets: ["arabic"],
  weight: "800",
});

export const metadata: Metadata = {
  title: "MyTELC | TELC B1 Vorbereitung",
  description: "Bestehe deine TELC B1 Prüfung mit einer professionellen Vorbereitung.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="de"
      className={`${geistSans.variable} ${geistMono.variable} ${archivoBlack.variable} ${anton.variable} ${cairoBlack.variable} ${tajawalExtraBold.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <ConditionalFloatingAIAssistant />
      </body>
    </html>
  );
}
