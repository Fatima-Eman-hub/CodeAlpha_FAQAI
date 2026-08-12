import { Link } from "react-router-dom";
import { Compass } from "lucide-react";
import GithubIcon from "./GithubIcon";

const PAGES = [
  { label: "Home", hash: "#home" },
  { label: "Chatbot", to: "/chatbot" },
  { label: "About", hash: "#about" },
  { label: "Contact", hash: "#contact" },
];

const TECH_STACK = ["React + Vite", "Tailwind CSS", "FastAPI", "NLTK + Scikit-learn", "TF-IDF / Cosine"];

export default function Footer() {
  const handleAnchor = (hash) => (e) => {
    e.preventDefault();
    if (window.location.pathname !== "/") {
      window.location.href = "/" + hash;
      return;
    }
    document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer
      className="px-6 pb-8 pt-16 lg:px-8"
      style={{ backgroundColor: "var(--footer-bg)", color: "var(--footer-text)" }}
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-3">
          <div>
            <div className="flex items-center gap-2">
              <span
                className="flex h-8 w-8 items-center justify-center rounded-md"
                style={{ backgroundColor: "var(--footer-badge-bg)" }}
              >
                <Compass className="h-4 w-4" strokeWidth={2} style={{ color: "var(--footer-badge-fg)" }} />
              </span>
              <span className="font-display text-base font-bold" style={{ color: "var(--footer-text)" }}>
                FAQ<span style={{ color: "var(--color-mustard-400)" }}>AI</span>
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed" style={{ color: "var(--footer-text-secondary)" }}>
              An NLP-powered FAQ chatbot built for learning purposes. Uses
              TF-IDF and Cosine Similarity for intelligent question matching.
            </p>
          </div>

          <div>
            <h4 className="label-tab" style={{ color: "var(--footer-text-muted)" }}>Pages</h4>
            <ul className="mt-4 space-y-2.5">
              {PAGES.map((page) => (
                <li key={page.label}>
                  {page.to ? (
                    <Link
                      to={page.to}
                      className="text-sm transition-colors hover:text-[var(--color-mustard-400)]"
                      style={{ color: "var(--footer-text-secondary)" }}
                    >
                      {page.label}
                    </Link>
                  ) : (
                    <a
                      href={page.hash}
                      onClick={handleAnchor(page.hash)}
                      className="text-sm transition-colors hover:text-[var(--color-mustard-400)]"
                      style={{ color: "var(--footer-text-secondary)" }}
                    >
                      {page.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="label-tab" style={{ color: "var(--footer-text-muted)" }}>Tech Stack</h4>
            <ul className="mt-4 space-y-2.5">
              {TECH_STACK.map((tech) => (
                <li key={tech} className="text-sm" style={{ color: "var(--footer-text-secondary)" }}>
                  {tech}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div
          className="mt-14 flex flex-col items-center justify-between gap-4 border-t-[1.5px] pt-6 text-xs sm:flex-row"
          style={{ borderColor: "var(--footer-border)", color: "var(--footer-text-muted)" }}
        >
          <p>A personal project: the FAQAI FAQ chatbot</p>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/Fatima-Eman-hub/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 transition-colors hover:text-[var(--color-mustard-400)]"
            >
              <GithubIcon className="h-3.5 w-3.5" /> GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
