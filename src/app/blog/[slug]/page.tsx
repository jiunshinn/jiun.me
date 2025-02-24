import { getPostBySlug, getAllPosts } from "@/lib/posts";
import { MDXRemote } from "next-mdx-remote/rsc";
import Toc from "@/components/toc";
import rehypePrettyCode from "rehype-pretty-code";
import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm";

type CodeNode = {
  children: Array<{
    type: string;
    value: string;
  }>;
  properties: {
    className: string[];
  };
};

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
        <div
          className="prose dark:prose-invert prose-lg flex-1 max-w-none
          prose-headings:font-bold
          prose-h1:text-3xl
          prose-h2:text-2xl
          prose-h3:text-xl
          prose-p:text-gray-700 dark:prose-p:text-gray-300
          prose-a:text-blue-600 hover:prose-a:text-blue-500"
        >
          <MDXRemote
            source={post.content}
            options={{
              mdxOptions: {
                remarkPlugins: [remarkGfm, remarkBreaks],
                rehypePlugins: [
                  [
                    rehypePrettyCode,
                    {
                      theme: "one-dark-pro",
                      onVisitLine(node: CodeNode) {
                        if (node.children.length === 0) {
                          node.children = [{ type: "text", value: " " }];
                        }
                      },
                      onVisitHighlightedLine(node: CodeNode) {
                        node.properties.className.push("highlighted");
                      },
                    },
                  ],
                ],
              },
            }}
          />
        </div>
        <div className="ml-4 w-64">
          <Toc headings={headings} />
        </div>
      </div>
    </div>
  );
}
