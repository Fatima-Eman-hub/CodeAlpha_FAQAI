import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Moon, Sun, Menu, X, Compass } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const NAV_LINKS = [
  { label: "Home", hash: "#home" },
  { label: "About", hash: "#about" },
  { label: "Contact", hash: "#contact" },
];

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleAnchorClick = (hash) => (e) => {
    e.preventDefault();
    setMenuOpen(false);
    if (location.pathname !== "/") {
      navigate("/" + hash);
      return;
    }
    const el = document.querySelector(hash);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className="sticky top-0 z-50 border-b-[1.5px] transition-colors duration-300"
      style={{
        backgroundColor: scrolled ? "var(--bg-base)" : "transparent",
        borderColor: scrolled ? "var(--border-subtle)" : "transparent",
      }}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        <Link to="/" className="group flex items-center gap-2.5">
          <span
            className="flex h-9 w-9 items-center justify-center rounded-md transition-transform group-hover:-rotate-6"
            style={{ backgroundColor: "var(--ink)" }}
          >
            <Compass className="h-[18px] w-[18px]" style={{ color: "var(--bg-base)" }} strokeWidth={2} />
          </span>
          <span className="font-display text-lg font-bold tracking-tight">
            FAQ<span style={{ color: "var(--color-mustard-500)" }}>AI</span>
          </span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.hash}
              onClick={handleAnchorClick(link.hash)}
              className="label-tab border-b-2 border-transparent pb-1 text-secondary transition-colors hover:border-current hover:text-[var(--text-primary)]"
            >
              {link.label}
            </a>
          ))}
          <Link
            to="/chatbot"
            className="label-tab border-b-2 border-transparent pb-1 text-secondary transition-colors hover:border-current hover:text-[var(--text-primary)]"
          >
            Chatbot
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
            className="flex h-9 w-9 items-center justify-center rounded-md border-[1.5px] text-secondary transition-colors hover:text-[var(--text-primary)]"
            style={{ borderColor: "var(--border-subtle)" }}
          >
            {theme === "dark" ? <Sun className="h-[16px] w-[16px]" /> : <Moon className="h-[16px] w-[16px]" />}
          </button>

          <Link
            to="/chatbot"
            className="hidden rounded-md px-5 py-2.5 text-sm font-semibold transition-transform hover:-translate-y-0.5 sm:inline-block"
            style={{ backgroundColor: "var(--ink)", color: "var(--bg-base)" }}
          >
            Try Chatbot
          </Link>

          <button
            onClick={() => setMenuOpen((o) => !o)}
            className="flex h-9 w-9 items-center justify-center rounded-md text-secondary hover:text-[var(--text-primary)] md:hidden"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div
          className="border-t-[1.5px] px-6 py-4 md:hidden"
          style={{ borderColor: "var(--border-subtle)", backgroundColor: "var(--bg-elevated)" }}
        >
          <div className="flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.hash}
                onClick={handleAnchorClick(link.hash)}
                className="text-sm font-medium text-secondary"
              >
                {link.label}
              </a>
            ))}
            <Link to="/chatbot" onClick={() => setMenuOpen(false)} className="text-sm font-medium text-secondary">
              Chatbot
            </Link>
            <Link
              to="/chatbot"
              onClick={() => setMenuOpen(false)}
              className="rounded-md px-5 py-2.5 text-center text-sm font-semibold"
              style={{ backgroundColor: "var(--ink)", color: "var(--bg-base)" }}
            >
              Try Chatbot
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
