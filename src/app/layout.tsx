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
          bg-lightBg text-lightText
          dark:bg-darkBg dark:text-darkText
        "
      >
        <Providers>
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
