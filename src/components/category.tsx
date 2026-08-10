import { getAllCategories } from "@/lib/posts";

export default async function Category() {
  const categories = await getAllCategories();

  return (
    <div className="mb-4">
      <h2 className="text-sm font-medium uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
        카테고리
      </h2>
      <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-2 text-sm">
        {categories.map((category: string) => (
          <li key={category}>
            <a
              href={`/blog?category=${category}`}
              className="text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100 transition-colors"
            >
              {category}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
