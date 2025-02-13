import Squares from "@/components/squares-background";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col items-center min-h-screen bg-fd-background/80 relative">
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0">
          <Squares
            speed={0.5}
            squareSize={40}
            direction="diagonal"
            borderColor="rgba(255, 255, 255, 0.1)"
            hoverFillColor="rgba(34, 34, 34, 0.5)"
          />
        </div>
      </div>
      <div className="relative z-10 w-full pointer-events-none">
        <section className="w-full px-4 py-20 md:py-32 bg-gradient-to-b from-fd-accent/50 to-transparent">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="pointer-events-auto text-5xl md:text-6xl font-bold tracking-tight mb-6 bg-gradient-to-r from-fd-foreground to-fd-primary bg-clip-text text-transparent">
              Data Structures & Algorithms in{" "}
              <HoverCard>
                <HoverCardTrigger>
                  <span className="cursor-help decoration-blue-500/50 hover:decoration-blue-500 underline decoration-wavy decoration-2 underline-offset-4 transition-all duration-300">
                    TypeScript
                  </span>
                </HoverCardTrigger>
                <HoverCardContent className="w-80 text-start border-[#45475a] bg-[#1e1e2e] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2">
                  <div className="font-mono text-sm">
                    <div className="flex flex-col space-y-2">
                      <div className="text-sm font-semibold text-[#cdd6f4] animate-fade-in">
                        TypeScript
                      </div>
                      <div className="text-xs text-[#cdd6f4] font-normal bg-[#181825] p-2 rounded-md overflow-hidden">
                        <div className="animate-slide-in-right">
                          <span className="text-[#89b4fa]">interface</span>{" "}
                          <span className="text-[#a6e3a1]">TypeScript</span>{" "}
                          {"{"}
                        </div>
                        <div className="pl-4">
                          {[
                            {
                              prop: "version",
                              value: '"5.0+"',
                              delay: "delay-[50ms]",
                            },
                            {
                              prop: "strict",
                              value: "boolean",
                              delay: "delay-[100ms]",
                            },
                            {
                              prop: "superset",
                              value: '"JavaScript"',
                              delay: "delay-[150ms]",
                            },
                          ].map((item) => (
                            <div
                              key={item.prop}
                              className={`animate-slide-in-right ${item.delay}`}
                            >
                              <span className="text-[#f5c2e7]">
                                {item.prop}
                              </span>
                              :{" "}
                              <span className="text-[#fab387]">
                                {item.value}
                              </span>
                              ;
                            </div>
                          ))}
                        </div>
                        <div className="animate-slide-in-right delay-[200ms]">
                          {"}"}
                        </div>
                      </div>
                      <div className="text-xs text-[#bac2de] animate-fade-in delay-[250ms]">
                        A strongly typed programming language that builds on
                        JavaScript, adding static type definitions.
                      </div>
                    </div>
                  </div>
                </HoverCardContent>
              </HoverCard>
            </h1>
            <p className="pointer-events-auto text-xl text-fd-muted-foreground mb-10 max-w-2xl mx-auto">
              Master type-safe implementations of data structures and algorithms
              with our comprehensive guide
            </p>
            <div className="pointer-events-auto flex flex-col sm:flex-row gap-4 justify-center">
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
            <h2 className="pointer-events-auto text-3xl font-bold text-center mb-16 text-fd-foreground">
              Everything you need to master DSA
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature) => (
                <div key={feature.title} className="pointer-events-auto">
                  <FeatureCard {...feature} />
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
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
      className="group p-6 rounded-lg bg-fd-card/95 border border-fd-border
      hover:border-fd-foreground transition-all duration-200 backdrop-blur-sm"
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
