import type { MDXComponents } from "mdx/types";
import { ChevronRight } from "lucide-react";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => (
      <h1 className="text-4xl font-bold mt-12 mb-6">
        {children}
        <ChevronRight className="inline ml-2 w-6 h-6" />
      </h1>
    ),
    a: ({ href, children }) => (
      <a
        href={href as string}
        className="text-blue-600 hover:text-blue-800 transition-colors font-medium"
      >
        {children}
      </a>
    ),
    code: ({ children }) => (
      <code className="bg-gray-100 px-2 py-1 rounded-md font-mono text-sm">
        {children}
      </code>
    ),
    ...components,
  };
}
