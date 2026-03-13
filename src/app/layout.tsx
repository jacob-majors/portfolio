import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { Nav } from "@/components/nav";
import { PageTransition } from "@/components/page-transition";
import { auth } from "@/auth";

export const metadata: Metadata = {
  title: {
    default: "Jacob Majors — Photographer & Engineer",
    template: "%s | Jacob Majors",
  },
  description: "Photography, engineering projects, and writing by Jacob Majors.",
  openGraph: {
    title: "Jacob Majors",
    description: "Photography, engineering projects, and writing.",
    type: "website",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  const isAdmin = !!session?.user;

  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body>
        <Nav isAdmin={isAdmin} />
        <PageTransition>{children}</PageTransition>
      </body>
    </html>
  );
}
