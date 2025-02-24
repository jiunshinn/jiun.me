interface Heading {
  level: number;
  text: string;
}

interface TocProps {
  headings: Heading[];
}

export default function Toc({ headings }: TocProps) {
  return (
    <aside className="sticky top-4">
      <h2 className="text-lg font-semibold mb-2">목차</h2>
      <ul className="space-y-2">
        {headings.map((heading, index) => (
          <li key={index} className={`ml-${(heading.level - 1) * 4} text-sm`}>
            <a href={`#${heading.text.toLowerCase().replace(/\s+/g, "-")}`}>
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}
