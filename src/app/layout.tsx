import "./globals.css";
import type { Metadata } from "next";
import React from "react";
import Providers from "@/app/provider";
import Header from "@/components/header";

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
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}
