import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => (
      <h1 className="text-2xl font-semibold tracking-tight mt-12 mb-6">
        {children}
      </h1>
    ),
    a: ({ href, children }) => (
      <a
        href={href as string}
        className="underline underline-offset-4 decoration-neutral-300 dark:decoration-neutral-700 hover:decoration-current transition"
      >
        {children}
      </a>
    ),
    code: ({ children }) => (
      <code className="bg-neutral-100 dark:bg-neutral-800 px-2 py-1 rounded-md font-mono text-sm">
        {children}
      </code>
    ),
    ...components,
  };
}
