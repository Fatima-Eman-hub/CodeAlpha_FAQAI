import { Brain, BarChart3, Zap, MessageSquare, Gauge, Code2 } from "lucide-react";
import { motion } from "framer-motion";
import FeatureCard from "./FeatureCard";

const FEATURES = [
  {
    icon: Brain,
    title: "NLP Preprocessing",
    description:
      "Lowercasing, tokenization, stop-word removal, and stemming prepare each query for precise matching.",
  },
  {
    icon: BarChart3,
    title: "TF-IDF Vectorization",
    description:
      "Term Frequency–Inverse Document Frequency converts both questions and FAQs into numerical vectors for comparison.",
  },
  {
    icon: Zap,
    title: "Cosine Similarity",
    description:
      "Measures the angle between query and FAQ vectors to find the most similar answer, regardless of length.",
  },
  {
    icon: MessageSquare,
    title: "Smart Fallback",
    description:
      "When similarity is too low, a friendly message appears instead of a wrong answer. It knows what it doesn't know.",
  },
  {
    icon: Gauge,
    title: "Confidence Score",
    description:
      "Every response includes a similarity percentage so you can see exactly how confident the match is.",
  },
  {
    icon: Code2,
    title: "REST API Backend",
    description:
      "FastAPI backend with CORS, input validation, and modular architecture, ready to deploy on Render.",
  },
];

const PIPELINE_STEPS = ["User Query", "Preprocess", "TF-IDF Vector", "Cosine Similarity", "Best Match"];

export default function HowItWorks() {
  return (
    <section className="px-6 py-16 sm:py-24 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <span className="label-tab" style={{ color: "var(--color-mustard-600)" }}>
            How it works
          </span>
          <h2 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl">
            Powered by real NLP
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-secondary">
            No keyword matching. No hardcoded rules. Pure statistical NLP: the
            same techniques used in production information retrieval systems.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {FEATURES.map((feature, i) => (
            <FeatureCard key={feature.title} index={i} {...feature} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5 }}
          className="surface-card mt-12 p-5 sm:mt-16 sm:p-8 lg:p-10"
        >
          <p className="label-tab text-center text-muted">Diagram: Query Processing Pipeline</p>
          <div className="mt-6 flex flex-wrap items-start justify-center gap-x-1 gap-y-5 sm:mt-8 sm:flex-nowrap sm:items-center sm:gap-0">
            {PIPELINE_STEPS.map((step, i) => {
              const isBookend = i === 0 || i === PIPELINE_STEPS.length - 1;
              return (
                <div key={step} className="flex items-center">
                  <div className="flex w-16 flex-col items-center gap-2 px-1 text-center sm:w-auto sm:px-2">
                    <span
                      className="flex h-9 w-9 items-center justify-center rounded-md font-mono text-sm font-bold"
                      style={
                        isBookend
                          ? { backgroundColor: "var(--ink)", color: "var(--bg-base)" }
                          : {
                              backgroundColor: "var(--bg-subtle)",
                              color: "var(--color-teal-500)",
                              border: "1.5px solid var(--color-teal-300)",
                            }
                      }
                    >
                      {i + 1}
                    </span>
                    <span className="text-xs text-secondary sm:whitespace-nowrap sm:text-sm">{step}</span>
                  </div>
                  {i < PIPELINE_STEPS.length - 1 && (
                    <div
                      className="hidden h-px w-8 border-t border-dashed sm:block lg:w-16"
                      style={{ borderColor: "var(--border-strong)" }}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
