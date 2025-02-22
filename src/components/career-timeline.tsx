interface CareerItem {
  period: string;
  role: string;
  description: string;
}

export default function CareerTimeline() {
  const careerData: CareerItem[] = [
    {
      period: "2023 - Present",
      role: "Frontend Developer @ Awesome Startup",
      description: "Developing React-based web services and UI/UX improvements",
    },
    {
      period: "2021 - 2023",
      role: "Intern/Junior Dev @ Web Agency",
      description: "Built various client sites using WordPress, Vue.js, etc.",
    },
  ];

  return (
    <section
      className="
      mb-12
      bg-lightBg text-lightText
      dark:bg-darkBg dark:text-darkText
      p-4 rounded-md
    "
    >
      <h2 className="text-2xl font-semibold mb-4">Career</h2>
      <div className="space-y-4">
        {careerData.map((item, index) => (
          <div
            key={index}
            className="
              p-4
              rounded-md
              bg-white text-black
              dark:bg-neutral-800 dark:text-gray-100
            "
          >
            <h3 className="font-bold">{item.period}</h3>
            <p className="">{item.role}</p>
            <p className="">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
