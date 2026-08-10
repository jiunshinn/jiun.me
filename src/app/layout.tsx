import "pretendard/dist/web/variable/pretendardvariable-dynamic-subset.css";
import "./globals.css";
import type { Metadata } from "next";
import React from "react";
import Providers from "@/app/provider";
import Header from "@/components/header";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "My Tech Blog",
  description: "Tech blog built with Next.js and Tailwind CSS",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className="h-full">
      <body
        className="
          h-full
          flex flex-col
          min-h-screen
          font-sans
          bg-white text-neutral-900
          dark:bg-neutral-950 dark:text-neutral-100
        "
      >
        <Providers>
          <Header />
          <main className="grow">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
