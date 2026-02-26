import type { Metadata } from "next";
import "./globals.css";
import { Sniglet, Fredoka } from "next/font/google";
import { Provider } from "@/contexts/appcontext";
import { SessionProvider } from "next-auth/react";

const sniglet = Sniglet({
  subsets: ["latin"],
  weight: ["400", "800"],
  variable: "--font-sniglet",
});

const fredoka = Fredoka({
  subsets: ["latin"],
  weight: ["400", "700", "300", "500", "600"],
  variable: "--font-fredoka",
});

export const metadata: Metadata = {
  title: "MoJo — Mood Tracker",
  description: "Track your daily mood and emotional wellbeing",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${sniglet.variable} ${fredoka.variable}`}>
      <body>
        <SessionProvider>
          <Provider>{children}</Provider>
        </SessionProvider>
      </body>
    </html>
  );
}
