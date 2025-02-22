export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-lightBg dark:bg-darkBg">
      <h1 className="text-3xl font-bold text-lightText dark:text-darkText">
        Hello, Tailwind with Next.js!
      </h1>
      <p className="text-accent mt-4">이 문구는 accent 색상으로 표시됩니다.</p>
    </main>
  );
}
