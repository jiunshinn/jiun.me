import CareerTimeline from "@/components/career-timeline";
import Introduction from "@/components/introduction";

export default function HomePage() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-12">
      {/* Hero Section */}
      <section className="mb-16">
        <h1 className="text-2xl font-semibold tracking-tight">
          Hi, I&apos;m Jiun!
        </h1>
        <p className="mt-2 text-neutral-500 dark:text-neutral-400">
          Frontend Engineer · React Native &amp; React
        </p>
      </section>

      {/* Introduction */}
      <Introduction />

      {/* Career Timeline */}
      <CareerTimeline />

      {/* Contact */}
      <section className="mt-16">
        <h2 className="mb-4 text-sm font-medium uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
          Contact
        </h2>
        <ul className="space-y-1 text-neutral-700 dark:text-neutral-300">
          <li>
            <a
              href="mailto:jiun.dev@gmail.com"
              className="underline underline-offset-4 decoration-neutral-300 dark:decoration-neutral-700 hover:decoration-current transition"
            >
              jiun.dev@gmail.com
            </a>
          </li>
          <li>
            <a
              href="https://github.com/jiunshinn"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 decoration-neutral-300 dark:decoration-neutral-700 hover:decoration-current transition"
            >
              github.com/jiunshinn
            </a>
          </li>
          <li>
            <a
              href="https://www.linkedin.com/in/jiunshin"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 decoration-neutral-300 dark:decoration-neutral-700 hover:decoration-current transition"
            >
              linkedin.com/in/jiunshin
            </a>
          </li>
        </ul>
      </section>
    </main>
  );
}
