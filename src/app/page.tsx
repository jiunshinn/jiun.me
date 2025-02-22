import CareerTimeline from "@/components/career-timeline";
import Introduction from "@/components/introduction";

export default function HomePage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10 bg-white text-black dark:bg-gray-900 dark:text-white">
      {/* Hero Section */}
      <section className="text-center mb-12">
        <h1 className="text-3xl font-bold mb-4">Hi, I&apos;m Jiun!</h1>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          Software Engineer
        </p>
      </section>

      {/* Introduction */}
      <Introduction />

      {/* Career Timeline */}
      <CareerTimeline />

      {/* 기타 섹션 */}
      <section className="mt-12 text-center">
        <h2 className="text-xl font-semibold mb-4">Contact</h2>
        <p className="text-gray-600 dark:text-gray-400">
          Email: john@example.com
        </p>
        <p className="text-gray-600 dark:text-gray-400">
          GitHub:{" "}
          <a
            href="https://github.com/username"
            className="text-blue-500 dark:text-blue-400"
          >
            github.com/username
          </a>
        </p>
      </section>
    </main>
  );
}
