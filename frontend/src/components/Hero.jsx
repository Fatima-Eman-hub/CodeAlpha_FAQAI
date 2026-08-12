import { Link } from "react-router-dom";
import { ArrowRight, Compass } from "lucide-react";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section id="home" className="relative overflow-hidden px-6 pb-20 pt-14 sm:pb-28 sm:pt-20 lg:px-8 lg:pt-24">
      <div className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
        {/* Left: thesis text */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="label-tab mb-6 inline-flex items-center gap-2"
            style={{ color: "var(--color-mustard-600)" }}
          >
            <Compass className="h-3.5 w-3.5" />
            Field notes on AI &amp; ML
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl"
          >
            Ask anything about
            <br />
            AI &amp; Machine
            <br />
            Learning
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 max-w-md text-lg leading-relaxed text-secondary"
          >
            No LLM, no guesswork. Every answer is traced back to a matched
            question with a real confidence score: TF-IDF and Cosine
            Similarity, shown in the open.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center"
          >
            <Link
              to="/chatbot"
              className="group inline-flex items-center gap-2 rounded-md px-7 py-3.5 text-sm font-semibold transition-transform hover:-translate-y-0.5"
              style={{ backgroundColor: "var(--ink)", color: "var(--bg-base)" }}
            >
              Start Chatting
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <a
              href="#about"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="rounded-md border-[1.5px] px-7 py-3.5 text-sm font-semibold transition-colors hover:bg-[var(--bg-subtle)]"
              style={{ borderColor: "var(--border-strong)" }}
            >
              How it works
            </a>
          </motion.div>
        </div>

        {/* Right: signature element, an annotated "specimen card" showing a real match */}
        <motion.div
          initial={{ opacity: 0, y: 20, rotate: -1 }}
          animate={{ opacity: 1, y: 0, rotate: -1.5 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="surface-card relative mx-auto max-w-sm p-6 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <span className="label-tab" style={{ color: "var(--text-muted)" }}>
              Query #0417
            </span>
            <span
              className="rounded px-2 py-0.5 font-mono text-xs font-semibold"
              style={{ backgroundColor: "var(--color-mustard-400)", color: "var(--color-teal-800)" }}
            >
              94% MATCH
            </span>
          </div>

          <p className="mt-4 font-mono text-sm" style={{ color: "var(--text-muted)" }}>
            &gt; "what causes overfitting?"
          </p>

          <div className="my-4 h-px w-full" style={{ backgroundColor: "var(--border-subtle)" }} />

          <p className="label-tab mb-1.5" style={{ color: "var(--color-teal-400)" }}>
            Machine Learning
          </p>
          <p className="text-sm leading-relaxed text-secondary">
            Overfitting occurs when a model learns training data too well,
            including its noise, and performs poorly on unseen data.
          </p>

          <div className="mt-5 flex items-center gap-1.5 font-mono text-xs" style={{ color: "var(--text-muted)" }}>
            <span>preprocess</span>
            <span>→</span>
            <span>vectorize</span>
            <span>→</span>
            <span>cosine sim.</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
