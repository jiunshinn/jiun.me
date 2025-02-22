import Link from "next/link";
import React from "react";
import ThemeToggle from "./theme-toggle";

export default function Header() {
  return (
    <header
      className="
        sticky top-0 z-50
        flex items-center justify-between
        px-6 py-4
        bg-lightBg text-lightText
        dark:bg-darkBg dark:text-darkText
        shadow
      "
    >
      <div className="text-xl font-bold">
        <Link href="/">My Tech Blog</Link>
      </div>

      <nav className="flex space-x-4">
        <Link href="/about" className="hover:text-accent transition">
          About
        </Link>
        <Link href="/blog" className="hover:text-accent transition">
          Blog
        </Link>
        <ThemeToggle />
      </nav>
    </header>
  );
}
