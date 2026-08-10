export default function Introduction() {
  return (
    <section className="mb-14">
      <h2 className="mb-4 text-sm font-medium uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
        Introduction
      </h2>
      <div className="space-y-4 leading-relaxed text-neutral-700 dark:text-neutral-300">
        <p>
          I&apos;m a frontend engineer who cares about DX as much as UX. I build
          cross-platform products with React Native and React, and write native
          modules in Swift and Kotlin when the platform demands it.
        </p>
        <p>
          I work fluently with AI coding agents — I&apos;ve used them in
          production since the early days and have taught teams beyond
          engineering how to use tools like Claude Code. I also contribute to
          open source, with merged PRs in{" "}
          <a
            href="https://github.com/expo/expo"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4 decoration-neutral-300 dark:decoration-neutral-700 hover:decoration-current transition"
          >
            Expo
          </a>{" "}
          and{" "}
          <a
            href="https://github.com/facebook/astryx"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4 decoration-neutral-300 dark:decoration-neutral-700 hover:decoration-current transition"
          >
            astryx
          </a>
          , Meta&apos;s open-source design system for AI agents.
        </p>
      </div>
    </section>
  );
}
