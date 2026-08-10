import { getPostBySlug, getAllPosts } from "@/lib/posts";
import { MDXRemote } from "next-mdx-remote/rsc";
import Toc from "@/components/toc";
import rehypePrettyCode from "rehype-pretty-code";
import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPost({ params }: Props) {
  const resolvedParams = await params;
  const post = await getPostBySlug(resolvedParams.slug);

  const headings = post.content
    .split("\n")
    .filter((line) => line.startsWith("#"))
    .map((line) => {
      const level = line.match(/^#+/)?.[0].length || 1;
      const text = line.replace(/^#+\s/, "");
      return { level, text };
    });

  return (
    <div className="relative mx-auto max-w-2xl px-6 py-12">
      <h1 className="text-2xl font-semibold tracking-tight">{post.title}</h1>
      <p className="mt-2 mb-10 text-sm text-neutral-500 dark:text-neutral-400">
        {post.date} · {post.category}
      </p>
      <div className="flex">
        <div
          className="prose prose-neutral dark:prose-invert flex-1 max-w-none
          prose-headings:font-semibold prose-headings:tracking-tight
          prose-h1:text-2xl
          prose-h2:text-xl
          prose-h3:text-lg
          prose-a:text-current prose-a:underline prose-a:underline-offset-4
          prose-a:decoration-neutral-300 dark:prose-a:decoration-neutral-700
          hover:prose-a:decoration-current"
        >
          <MDXRemote
            source={post.content}
            options={{
              mdxOptions: {
                remarkPlugins: [remarkGfm, remarkBreaks],
                rehypePlugins: [
                  // v0.14부터 빈 줄 처리와 data-line/data-highlighted-line 마킹이 기본 동작이라 커스텀 훅 불필요
                  [rehypePrettyCode, { theme: "one-dark-pro" }],
                ],
              },
            }}
          />
        </div>
        <div className="hidden xl:block fixed top-32 left-[calc(50%+22rem)] w-56">
          <Toc headings={headings} />
        </div>
      </div>
    </div>
  );
}
