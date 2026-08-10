interface Heading {
  level: number;
  text: string;
}

interface TocProps {
  headings: Heading[];
}

export default function Toc({ headings }: TocProps) {
  return (
    <aside className="sticky top-10">
      <h2 className="mb-3 text-sm font-medium uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
        목차
      </h2>
      <ul className="space-y-2 border-l border-neutral-200 dark:border-neutral-800 pl-4">
        {headings.map((heading, index) => (
          <li key={index} className={`ml-${(heading.level - 1) * 4} text-sm`}>
            <a
              href={`#${heading.text.toLowerCase().replace(/\s+/g, "-")}`}
              className="text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100 transition-colors"
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}
