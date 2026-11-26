export const CATEGORIES = ["Foundations", "Backend", "Infra & Ops", "AI"] as const;

export type Category = (typeof CATEGORIES)[number];

export interface Book {
  id: string;
  title: string;
  author: string;
  category: Category;
  /** Six-digit hex colour. The text colour is derived from it. */
  spineColor: string;
  /**
   * ISBN for the Open Library cover. `npm run covers` saves the cover to
   * public/covers/<id>.jpg. Without a cover, a typographic cover is drawn.
   */
  isbn?: string;
  /** Open Library cover id. Use it when the ISBN has no cover. */
  coverId?: number;
  /** Set from public/covers by `withCovers()`. Do not set it by hand. */
  coverImage?: string;
  description: string;
  /** Shorter title for the spine. */
  spineTitle?: string;
  /** Size in px at desktop scale. Stable values are derived from the id if omitted. */
  thickness?: number;
  height?: number;
}

export const BOOKS: Book[] = [
  {
    id: "sicp",
    isbn: "9780262510875",
    title: "Structure and Interpretation of Computer Programs",
    spineTitle: "Structure & Interpretation",
    author: "Harold Abelson & Gerald Jay Sussman",
    category: "Foundations",
    spineColor: "#4B2E5C",
    thickness: 62,
    description:
      "Builds programming up from first principles in Scheme: abstraction, state, interpreters, and finally a register machine and its compiler.",
  },
  {
    id: "csapp",
    isbn: "9780134092669",
    title: "Computer Systems: A Programmer's Perspective",
    spineTitle: "Computer Systems",
    author: "Randal E. Bryant & David R. O'Hallaron",
    category: "Foundations",
    spineColor: "#1F4E5F",
    thickness: 72,
    height: 372,
    description:
      "How programs really run: machine code, caches, linking, virtual memory, and concurrency, seen from the side of the person writing the code.",
  },
  {
    id: "pragmatic-programmer",
    isbn: "9780135957059",
    title: "The Pragmatic Programmer",
    author: "David Thomas & Andrew Hunt",
    category: "Foundations",
    spineColor: "#E4DCCB",
    thickness: 48,
    description:
      "Short, practical advice on the craft: owning your work, removing duplication, tracer bullets, and knowing your tools well.",
  },
  {
    id: "philosophy-software-design",
    isbn: "9781732102217",
    coverId: 10352230,
    title: "A Philosophy of Software Design",
    author: "John Ousterhout",
    category: "Foundations",
    spineColor: "#C8553D",
    thickness: 38,
    description:
      "Argues that complexity is the real enemy, and that deep modules with simple interfaces are the best defence against it.",
  },
  {
    id: "refactoring",
    isbn: "9780134757599",
    title: "Refactoring",
    author: "Martin Fowler",
    category: "Foundations",
    spineColor: "#2F3E46",
    thickness: 54,
    description:
      "A catalogue of small, safe changes that improve the design of existing code, with the tests and code smells that guide them.",
  },
  {
    id: "code-petzold",
    isbn: "9780137909100",
    title: "Code",
    author: "Charles Petzold",
    category: "Foundations",
    spineColor: "#E9B44C",
    thickness: 46,
    description:
      "From flashlights and Braille to a working computer. A patient explanation of how hardware and software encode ideas.",
  },
  {
    id: "ddia",
    isbn: "9781449373320",
    title: "Designing Data-Intensive Applications",
    spineTitle: "Designing Data-Intensive Apps",
    author: "Martin Kleppmann",
    category: "Backend",
    spineColor: "#8C2F39",
    thickness: 64,
    height: 366,
    description:
      "Replication, partitioning, transactions, consensus, and stream processing. The trade-offs behind every modern data system.",
  },
  {
    id: "system-design-interview",
    isbn: "9798664653403",
    title: "System Design Interview",
    author: "Alex Xu",
    category: "Backend",
    spineColor: "#3D7068",
    thickness: 42,
    description:
      "A repeatable framework for open-ended design questions, worked through rate limiters, chat systems, news feeds, and more.",
  },
  {
    id: "building-microservices",
    isbn: "9781492034025",
    title: "Building Microservices",
    author: "Sam Newman",
    category: "Backend",
    spineColor: "#D9C5A0",
    thickness: 56,
    description:
      "How to split a system into services: boundaries, communication, deployment, testing, and when not to do it at all.",
  },
  {
    id: "database-internals",
    isbn: "9781492040347",
    title: "Database Internals",
    author: "Alex Petrov",
    category: "Backend",
    spineColor: "#283D6B",
    thickness: 50,
    description:
      "Inside storage engines and distributed databases: B-trees, log-structured storage, failure detection, and consensus.",
  },
  {
    id: "domain-driven-design",
    isbn: "9780321125217",
    title: "Domain-Driven Design",
    author: "Eric Evans",
    category: "Backend",
    spineColor: "#6B7F59",
    thickness: 58,
    description:
      "Puts the model of the business at the centre of the code, with a shared language and explicit boundaries between contexts.",
  },
  {
    id: "release-it",
    isbn: "9781680502398",
    title: "Release It!",
    author: "Michael T. Nygard",
    category: "Backend",
    spineColor: "#DD7A4A",
    thickness: 44,
    description:
      "What breaks in production and why. Stability patterns such as circuit breakers and bulkheads, taught through real outages.",
  },
  {
    id: "docker-deep-dive",
    isbn: "9781521822807",
    title: "Docker Deep Dive",
    author: "Nigel Poulton",
    category: "Infra & Ops",
    spineColor: "#2E6F9E",
    thickness: 40,
    description:
      "Images, containers, networking, volumes, and Compose, explained from the ground up with commands you can follow along.",
  },
  {
    id: "kubernetes-up-and-running",
    isbn: "9781098110208",
    title: "Kubernetes: Up & Running",
    spineTitle: "Kubernetes Up & Running",
    author: "Brendan Burns, Joe Beda & Kelsey Hightower",
    category: "Infra & Ops",
    spineColor: "#EFE9DD",
    thickness: 46,
    description:
      "A practical route into Kubernetes: pods, services, deployments, and configuration, and the ideas that hold them together.",
  },
  {
    id: "sre",
    isbn: "9781491929124",
    title: "Site Reliability Engineering",
    author: "Betsy Beyer, Chris Jones & others",
    category: "Infra & Ops",
    spineColor: "#1E5B4F",
    thickness: 62,
    description:
      "How Google runs production systems: error budgets, service level objectives, toil, on-call, and blameless postmortems.",
  },
  {
    id: "terraform-up-and-running",
    isbn: "9781098116743",
    coverId: 10158247,
    title: "Terraform: Up & Running",
    spineTitle: "Terraform Up & Running",
    author: "Yevgeniy Brikman",
    category: "Infra & Ops",
    spineColor: "#5D4A8A",
    thickness: 48,
    description:
      "Infrastructure as code in practice: state, modules, testing, and the team workflow needed to change real systems safely.",
  },
  {
    id: "phoenix-project",
    isbn: "9781942788294",
    title: "The Phoenix Project",
    author: "Gene Kim, Kevin Behr & George Spafford",
    category: "Infra & Ops",
    spineColor: "#B23A2E",
    thickness: 44,
    description:
      "A novel about an IT department in trouble, and how flow, feedback, and continual learning turn it around.",
  },
  {
    id: "accelerate",
    isbn: "9781942788331",
    title: "Accelerate",
    author: "Nicole Forsgren, Jez Humble & Gene Kim",
    category: "Infra & Ops",
    spineColor: "#F0C75E",
    thickness: 38,
    description:
      "Research on what separates high-performing software teams, and the four delivery metrics that came out of it.",
  },
  {
    id: "observability-engineering",
    isbn: "9781492076445",
    title: "Observability Engineering",
    author: "Charity Majors, Liz Fong-Jones & George Miranda",
    category: "Infra & Ops",
    spineColor: "#34495E",
    thickness: 50,
    description:
      "Moving from dashboards to questions: structured events, tracing, and debugging problems you did not predict.",
  },
  {
    id: "deep-learning",
    isbn: "9780262035613",
    title: "Deep Learning",
    author: "Ian Goodfellow, Yoshua Bengio & Aaron Courville",
    category: "AI",
    spineColor: "#22313F",
    thickness: 70,
    height: 370,
    description:
      "The mathematical and conceptual background of neural networks, from linear algebra to generative models.",
  },
  {
    id: "designing-ml-systems",
    isbn: "9781098107963",
    title: "Designing Machine Learning Systems",
    spineTitle: "Designing ML Systems",
    author: "Chip Huyen",
    category: "AI",
    spineColor: "#A7BBB0",
    thickness: 48,
    description:
      "Everything around the model: data, features, deployment, monitoring, and iterating when the world changes.",
  },
  {
    id: "ai-engineering",
    isbn: "9781098166304",
    title: "AI Engineering",
    author: "Chip Huyen",
    category: "AI",
    spineColor: "#D46A6A",
    thickness: 56,
    description:
      "Building applications on foundation models: evaluation, prompting, retrieval, agents, fine-tuning, and inference cost.",
  },
  {
    id: "hands-on-llms",
    isbn: "9781098150969",
    title: "Hands-On Large Language Models",
    spineTitle: "Hands-On LLMs",
    author: "Jay Alammar & Maarten Grootendorst",
    category: "AI",
    spineColor: "#EADBC8",
    thickness: 50,
    description:
      "A visual, code-first tour of tokens, embeddings, attention, semantic search, and fine-tuning.",
  },
  {
    id: "llm-from-scratch",
    isbn: "9781633437166",
    title: "Build a Large Language Model (From Scratch)",
    spineTitle: "Build an LLM From Scratch",
    author: "Sebastian Raschka",
    category: "AI",
    spineColor: "#3A5A98",
    thickness: 44,
    description:
      "Writes a GPT-style model step by step in PyTorch, then pretrains it and fine-tunes it to follow instructions.",
  },
];
