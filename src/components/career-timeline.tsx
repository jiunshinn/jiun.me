interface CareerItem {
  period: string;
  role: string;
  description: string;
}

export default function CareerTimeline() {
  const careerData: CareerItem[] = [
    {
      period: "Nov 2024 - Present",
      role: "Frontend Lead @ FutureworkLab",
      description:
        "Shipped a health & habit-tracking app (JanuBit) to the App Store and Play Store as the first app engineer, integrating Apple HealthKit and Android Health Connect. Now building AXflow, an enterprise RAG document-AI platform, leading a Korea–Vietnam frontend team.",
    },
    {
      period: "Jan 2024 - Jun 2024",
      role: "Frontend Engineer @ Sneakers",
      description:
        "Real-time hotspot sharing app — contributed to DAU growth from 1K to 10K, cut main screen load time from 3s to 0.5s, and automated weekly releases with Fastlane.",
    },
    {
      period: "Apr 2023 - Jul 2023",
      role: "Mobile Engineer @ Pawdlers",
      description:
        "Pet-care startup — unified scattered core features into a dashboard main tab and built Instagram story sharing of user reviews with the Meta SDK.",
    },
    {
      period: "Oct 2022 - Apr 2023",
      role: "Researcher @ Gractor",
      description:
        "Smart-city IoT dashboards — reduced map render time from 60s to 3s with Mapbox clustering and built data-visualization charts over 800K records.",
    },
    {
      period: "Feb 2021 - Sep 2022",
      role: "Mobile Engineer @ Lighthouse",
      description:
        "Senior-care startup — built nursing home–guardian communication apps from the early days as the team grew from 5 to 13, and set up CI/CD with Jenkins and Fastlane.",
    },
  ];

  return (
    <section className="mb-14">
      <h2 className="mb-4 text-sm font-medium uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
        Career
      </h2>
      <div className="space-y-6">
        {careerData.map((item, index) => (
          <div key={index}>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              {item.period}
            </p>
            <p className="mt-1 font-medium">{item.role}</p>
            <p className="mt-1 text-neutral-600 dark:text-neutral-400">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
