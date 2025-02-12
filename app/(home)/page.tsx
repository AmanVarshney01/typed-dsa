import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col items-center min-h-screen bg-fd-background">
      <section className="w-full px-4 py-20 md:py-32 bg-gradient-to-b from-fd-accent to-fd-background">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6 bg-gradient-to-r from-fd-foreground to-fd-primary bg-clip-text text-transparent">
            Data Structures & Algorithms in TypeScript
          </h1>
          <p className="text-xl text-fd-muted-foreground mb-10 max-w-2xl mx-auto">
            Master type-safe implementations of data structures and algorithms
            with our comprehensive guide
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/docs"
              className="px-6 py-2.5 rounded-lg bg-fd-foreground text-fd-background font-medium
              hover:bg-fd-foreground/90 transition-all duration-200 shadow-sm"
            >
              Get Started
            </Link>
            <Link
              href="https://github.com/amanvarshney01/typed-dsa"
              className="px-6 py-2.5 rounded-lg border border-fd-foreground text-fd-foreground font-medium
              hover:bg-fd-foreground hover:text-fd-background transition-all duration-200"
            >
              View on GitHub
            </Link>
          </div>
        </div>
      </section>
      <section className="w-full px-4 py-16 md:py-24">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-16 text-fd-foreground">
            Everything you need to master DSA
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => (
              <FeatureCard key={feature.title} {...feature} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function FeatureCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div
      className="group p-6 rounded-lg bg-fd-card border border-fd-border
      hover:border-fd-foreground transition-all duration-200"
    >
      <h3 className="text-xl font-semibold mb-3 text-fd-foreground">{title}</h3>
      <p className="text-fd-muted-foreground">{description}</p>
    </div>
  );
}

const features = [
  {
    title: "Data Structures",
    description:
      "Implementation of fundamental data structures like Arrays, Linked Lists, Trees, Graphs, and more.",
  },
  {
    title: "Algorithms",
    description:
      "Common algorithmic patterns and solutions including sorting, searching, and graph algorithms.",
  },
  {
    title: "Type Safety",
    description:
      "Leverage TypeScript's type system for robust and maintainable implementations.",
  },
  {
    title: "Time Complexity",
    description:
      "Detailed analysis of time and space complexity for each implementation.",
  },
  {
    title: "Examples",
    description:
      "Practical examples and use cases for each data structure and algorithm.",
  },
  {
    title: "Interview Prep",
    description:
      "Common interview problems and their solutions using TypeScript.",
  },
];
