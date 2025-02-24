import { getAllPosts, getAllCategories } from "@/lib/posts";
import Link from "next/link";

export default async function BlogPage({
  searchParams,
}: {
  searchParams: { category?: string };
}) {
  const posts = getAllPosts();
  const categories = getAllCategories();
  const selectedCategory = searchParams.category;

  const filteredPosts = selectedCategory
    ? posts.filter((post) => post.category === selectedCategory)
    : posts;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">블로그 글 목록</h1>

      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">카테고리</h2>
        <div className="flex space-x-4">
          <Link
            href="/blog"
            className={`text-blue-500 hover:underline ${
              !selectedCategory ? "font-bold" : ""
            }`}
          >
            전체
          </Link>
          {categories.map((category) => (
            <Link
              key={category}
              href={`/blog?category=${category}`}
              className={`text-blue-500 hover:underline ${
                selectedCategory === category ? "font-bold" : ""
              }`}
            >
              {category}
            </Link>
          ))}
        </div>
      </div>

      {filteredPosts.length === 0 ? (
        <p className="text-gray-500">이 카테고리에 글이 없습니다.</p>
      ) : (
        <ul className="space-y-4">
          {filteredPosts.map((post) => (
            <li key={post.slug} className="border-b pb-4">
              <Link href={`/blog/${post.slug}`} className="hover:underline">
                <h2 className="text-xl font-semibold">{post.title}</h2>
              </Link>
              <p className="text-gray-600 mt-1">
                {post.date} | {post.category}
              </p>
              <div className="prose text-sm mt-2">
                {post.content.slice(0, 100)}...
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
