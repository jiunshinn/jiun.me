"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDark = theme === "dark";

  function handleToggle() {
    setTheme(isDark ? "light" : "dark");
  }

  return (
    <button
      onClick={handleToggle}
      className="
        flex items-center justify-center
        w-10 h-10
        border rounded-md
        bg-lightBg text-lightText
        dark:bg-darkBg dark:text-darkText
        hover:bg-accent hover:text-white
        dark:hover:text-lightBg
        transition
      "
    >
      {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
    </button>
  );
}
