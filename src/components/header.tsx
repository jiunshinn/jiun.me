import React from "react";
import Link from "next/link";
import ThemeToggle from "./theme-toggle";

export default function Header() {
  return (
    <header className="mx-auto w-full max-w-2xl px-6 pt-10 pb-6">
      <div className="flex items-center justify-between">
        <nav className="flex items-center gap-6 text-sm">
          <Link
            href="/"
            className="text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100 transition-colors"
          >
            Home
          </Link>
          <Link
            href="/blog"
            className="text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100 transition-colors"
          >
            Blog
          </Link>
        </nav>

        <ThemeToggle />
      </div>
    </header>
  );
}
