import React from "react";
import Link from "next/link";
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
      <nav className="flex items-center space-x-6">
        <Link href="/" className="hover:text-accent transition">
          Home
        </Link>
        <Link href="/blog" className="hover:text-accent transition">
          Blog
        </Link>
      </nav>

      <ThemeToggle />
    </header>
  );
}
