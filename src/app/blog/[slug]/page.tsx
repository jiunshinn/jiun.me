import { getPostBySlug, getAllPosts } from "@/lib/posts";
import { MDXRemote } from "next-mdx-remote/rsc";
import Toc from "@/components/toc";

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPost({
  params,
}: {
  params: { slug: string };
}) {
  const post = getPostBySlug(params.slug);

  const headings = post.content
    .split("\n")
    .filter((line) => line.startsWith("#"))
    .map((line) => {
      const level = line.match(/^#+/)?.[0].length || 1;
      const text = line.replace(/^#+\s/, "");
      return { level, text };
    });

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <p className="text-gray-500 mb-2">
        {post.date} | {post.category}
      </p>
      <div className="flex">
        <div className="prose flex-1">
          <MDXRemote source={post.content} />
        </div>
        <div className="ml-4 w-64">
          <Toc headings={headings} />
        </div>
      </div>
    </div>
  );
}
