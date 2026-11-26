import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Bookshelf from "@/components/bookshelf";
import { MOTION_PRESETS, type MotionName } from "@/lib/shelf-motion";
import { BOOKS } from "@/lib/books";
import { withCovers } from "@/lib/covers";

// Temporary page to compare the shelf motions. Delete it after you choose one.

export const metadata: Metadata = {
  title: "Shelf motion lab",
  robots: { index: false },
};

type Props = {
  searchParams: Promise<{ motion?: string }>;
};

export default async function MotionLabPage({ searchParams }: Props) {
  if (process.env.NODE_ENV === "production") notFound();

  const { motion } = await searchParams;
  const active: MotionName = motion && motion in MOTION_PRESETS ? (motion as MotionName) : "turn";

  return (
    <>
      <div className="mx-auto max-w-2xl px-6 pt-12">
        <p className="text-sm text-neutral-500 dark:text-neutral-400">Motion</p>
        <nav className="-ml-3 mt-2 flex flex-wrap gap-1 text-sm">
          {(Object.keys(MOTION_PRESETS) as MotionName[]).map((name) => (
            <Link
              key={name}
              href={`/books/lab?motion=${name}`}
              aria-current={name === active ? "page" : undefined}
              className={`rounded-full border px-3 py-1.5 transition-colors ${
                name === active
                  ? "border-neutral-900 dark:border-neutral-100"
                  : "border-transparent text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
              }`}
            >
              {MOTION_PRESETS[name].label}
            </Link>
          ))}
        </nav>
        <p className="mt-3 text-neutral-700 dark:text-neutral-300">
          {MOTION_PRESETS[active].description}
        </p>
      </div>
      <Bookshelf key={active} books={withCovers(BOOKS)} motionName={active} />
    </>
  );
}
