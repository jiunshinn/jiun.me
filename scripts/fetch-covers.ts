/**
 * Saves book covers from the Open Library Covers API to public/covers/<id>.jpg.
 *
 *   npm run covers            # only books that have no cover file yet
 *   npm run covers -- --force # download all covers again
 *
 * Open Library allows about 100 ISBN lookups per IP in 5 minutes,
 * so the site serves the saved files and never calls the API at runtime.
 */
import { existsSync } from "node:fs";
import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { BOOKS } from "../src/lib/books.ts";

const OUT_DIR = join(import.meta.dirname, "..", "public", "covers");
const force = process.argv.includes("--force");

function coverUrls(isbn?: string, coverId?: number): string[] {
  const urls: string[] = [];
  // default=false makes the API answer 404 instead of a blank 1x1 image.
  if (isbn) urls.push(`https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg?default=false`);
  if (coverId) urls.push(`https://covers.openlibrary.org/b/id/${coverId}-L.jpg?default=false`);
  return urls;
}

await mkdir(OUT_DIR, { recursive: true });

const missing: string[] = [];
for (const book of BOOKS) {
  const file = join(OUT_DIR, `${book.id}.jpg`);
  const urls = coverUrls(book.isbn, book.coverId);
  if (urls.length === 0) continue;
  if (existsSync(file) && !force) {
    console.log(`skip     ${book.id}`);
    continue;
  }

  let saved = false;
  for (const url of urls) {
    const response = await fetch(url);
    if (!response.ok) continue;
    await writeFile(file, Buffer.from(await response.arrayBuffer()));
    console.log(`saved    ${book.id}`);
    saved = true;
    break;
  }
  if (!saved) {
    missing.push(book.id);
    console.warn(`no cover ${book.id}`);
  }
  // Stay well under the rate limit.
  await new Promise((resolve) => setTimeout(resolve, 300));
}

if (missing.length > 0) {
  console.warn(`\nNo cover for: ${missing.join(", ")}. Add a coverId, or keep the drawn cover.`);
}
