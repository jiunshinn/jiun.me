import React from "react";
import { Mail, Github, Linkedin } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer
      className="
        mt-auto
        px-6 py-4
        bg-lightBg text-lightText
        dark:bg-darkBg dark:text-darkText
        border-t border-gray-300 dark:border-gray-700
      "
    >
      <div className="flex flex-col sm:flex-row justify-between items-center">
        {/* Copyright */}
        <p className="mb-2 sm:mb-0 text-sm">
          © {new Date().getFullYear()} My Tech Blog
        </p>

        {/* Social Icons */}
        <div className="flex items-center space-x-4">
          <Link
            href="mailto:jiun.dev@gmail.com"
            className="hover:text-accent transition"
            aria-label="Email"
          >
            <Mail className="h-5 w-5" />
          </Link>
          <Link
            href="https://github.com/jiunshinn"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent transition"
            aria-label="GitHub"
          >
            <Github className="h-5 w-5" />
          </Link>
          <Link
            href="http://www.linkedin.com/in/jiunshin"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent transition"
            aria-label="LinkedIn"
          >
            <Linkedin className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
