import { existsSync } from "node:fs";
import { join } from "node:path";
import type { Book } from "@/lib/books";

/**
 * Server only. Adds `coverImage` to each book that has a saved cover in
 * public/covers. The check runs at build time, because the books page is static.
 */
export function withCovers(books: Book[]): Book[] {
  const dir = join(process.cwd(), "public", "covers");
  return books.map((book) =>
    existsSync(join(dir, `${book.id}.jpg`))
      ? { ...book, coverImage: `/covers/${book.id}.jpg` }
      : book,
  );
}
