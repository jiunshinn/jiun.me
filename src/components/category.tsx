import { getAllCategories } from "@/lib/posts";

export default async function Category() {
  const categories = await getAllCategories();

  return (
    <div className="mb-4">
      <h2 className="text-lg font-semibold">카테고리</h2>
      <ul className="flex space-x-4">
        {categories.map((category: string) => (
          <li key={category}>
            <a
              href={`/blog?category=${category}`}
              className="text-blue-500 hover:underline"
            >
              {category}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
