import { getAllPosts, getAllCategories } from "@/lib/posts";
import Link from "next/link";

type Props = {
  searchParams: Promise<{ category?: string }>;
};

export default async function BlogPage({ searchParams }: Props) {
  const [posts, categories, resolvedParams] = await Promise.all([
    getAllPosts(),
    getAllCategories(),
    searchParams,
  ]);

  const selectedCategory = resolvedParams.category;

  const filteredPosts = selectedCategory
    ? posts.filter((post) => post.category === selectedCategory)
    : posts;

  return (
    <div className="mx-auto max-w-2xl px-6 py-12">
      <h1 className="mb-8 text-2xl font-semibold tracking-tight">Blog</h1>

      <div className="mb-10 flex flex-wrap gap-x-4 gap-y-2 text-sm">
        <Link
          href="/blog"
          className={
            !selectedCategory
              ? "text-neutral-900 dark:text-neutral-100 underline underline-offset-4"
              : "text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100 transition-colors"
          }
        >
          전체
        </Link>
        {categories.map((category) => (
          <Link
            key={category}
            href={`/blog?category=${category}`}
            className={
              selectedCategory === category
                ? "text-neutral-900 dark:text-neutral-100 underline underline-offset-4"
                : "text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100 transition-colors"
            }
          >
            {category}
          </Link>
        ))}
      </div>

      {filteredPosts.length === 0 ? (
        <p className="text-neutral-500 dark:text-neutral-400">
          이 카테고리에 글이 없습니다.
        </p>
      ) : (
        <ul className="space-y-8">
          {filteredPosts.map((post) => (
            <li key={post.slug}>
              <Link href={`/blog/${post.slug}`} className="group">
                <h2 className="font-medium group-hover:underline underline-offset-4">
                  {post.title}
                </h2>
              </Link>
              <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
                {post.date} · {post.category}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
