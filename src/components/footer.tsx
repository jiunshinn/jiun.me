import React from "react";
import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mx-auto mt-auto w-full max-w-2xl px-6 py-10">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-2 border-t border-neutral-200 dark:border-neutral-800 pt-6 text-sm text-neutral-500 dark:text-neutral-400">
        {/* Copyright */}
        <p>© {new Date().getFullYear()} My Tech Blog</p>

        {/* Social Icons */}
        <div className="flex items-center gap-4">
          <Link
            href="mailto:jiun.dev@gmail.com"
            className="hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
            aria-label="Email"
          >
            <Mail className="h-4 w-4" />
          </Link>
          <Link
            href="https://github.com/jiunshinn"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
            aria-label="GitHub"
          >
            <GithubIcon className="h-4 w-4" />
          </Link>
          <Link
            href="http://www.linkedin.com/in/jiunshin"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
            aria-label="LinkedIn"
          >
            <LinkedinIcon className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
