import type { Metadata } from "next";
import Bookshelf from "@/components/bookshelf";
import { BOOKS } from "@/lib/books";
import { withCovers } from "@/lib/covers";

export const metadata: Metadata = {
  title: "Books",
  description: "A shelf of engineering books.",
};

export default function BooksPage() {
  return <Bookshelf books={withCovers(BOOKS)} />;
}
