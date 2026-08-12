import { useEffect, useMemo, useState } from "react";
import { Layers, TrendingUp, ChevronDown, Search, Star, X } from "lucide-react";
import { fetchCategories, fetchPopularFaqs, fetchAllFaqs } from "../services/api";
import { useBookmarks } from "../hooks/useBookmarks";

function QuestionRow({ faq, onSelectQuestion, isBookmarked, onToggleBookmark }) {
  return (
    <div className="group flex items-center gap-1 rounded-md pr-1 hover:bg-[var(--bg-subtle)]">
      <button
        onClick={() => onSelectQuestion(faq.question)}
        className="flex-1 truncate px-3 py-2 text-left text-sm text-secondary hover:text-[var(--text-primary)]"
      >
        {faq.question}
      </button>
      <button
        onClick={() => onToggleBookmark(faq)}
        aria-label={isBookmarked ? "Remove bookmark" : "Add bookmark"}
        className={`flex h-6 w-6 shrink-0 items-center justify-center rounded transition-opacity ${
          isBookmarked ? "opacity-100" : "opacity-0 group-hover:opacity-100"
        }`}
      >
        <Star
          className="h-3.5 w-3.5"
          style={
            isBookmarked
              ? { fill: "var(--color-mustard-500)", color: "var(--color-mustard-600)" }
              : { color: "var(--text-muted)" }
          }
        />
      </button>
    </div>
  );
}

export default function CategorySidebar({ activeCategory, onSelectCategory, onSelectQuestion }) {
  const [categories, setCategories] = useState([]);
  const [popular, setPopular] = useState([]);
  const [allFaqs, setAllFaqs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const { bookmarks, isBookmarked, toggleBookmark } = useBookmarks();

  useEffect(() => {
    fetchCategories().then(setCategories).catch(() => setCategories([]));
    fetchPopularFaqs().then(setPopular).catch(() => setPopular([]));
    fetchAllFaqs().then(setAllFaqs).catch(() => setAllFaqs([]));
  }, []);

  const searchResults = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return [];
    return allFaqs.filter((f) => f.question.toLowerCase().includes(term)).slice(0, 10);
  }, [searchTerm, allFaqs]);

  const isSearching = searchTerm.trim().length > 0;

  const content = (
    <div className="space-y-7">
      {/* Search */}
      <div>
        <div
          className="flex items-center gap-2 rounded-md border-[1.5px] px-3 py-2"
          style={{ borderColor: "var(--border-strong)", backgroundColor: "var(--bg-elevated)" }}
        >
          <Search className="h-3.5 w-3.5 shrink-0 text-muted" />
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search FAQs…"
            className="w-full bg-transparent text-sm outline-none placeholder:text-muted"
          />
          {searchTerm && (
            <button onClick={() => setSearchTerm("")} aria-label="Clear search">
              <X className="h-3.5 w-3.5 text-muted hover:text-[var(--text-primary)]" />
            </button>
          )}
        </div>

        {isSearching && (
          <div className="mt-2 flex flex-col gap-0.5">
            {searchResults.length === 0 ? (
              <p className="px-3 py-2 text-sm text-muted">No matching FAQs.</p>
            ) : (
              searchResults.map((faq) => (
                <QuestionRow
                  key={faq.id}
                  faq={faq}
                  onSelectQuestion={onSelectQuestion}
                  isBookmarked={isBookmarked(faq.id)}
                  onToggleBookmark={toggleBookmark}
                />
              ))
            )}
          </div>
        )}
      </div>

      {!isSearching && (
        <>
          {/* Categories */}
          <div>
            <div className="label-tab mb-3 flex items-center gap-2 text-muted">
              <Layers className="h-3.5 w-3.5" />
              Categories
            </div>
            <div className="flex flex-col gap-1">
              <button
                onClick={() => onSelectCategory(null)}
                className="flex items-center justify-between rounded-md px-3 py-2 text-left text-sm font-semibold transition-colors"
                style={
                  !activeCategory
                    ? { backgroundColor: "var(--ink)", color: "var(--bg-base)" }
                    : { color: "var(--text-secondary)" }
                }
                onMouseEnter={(e) => { if (activeCategory) e.currentTarget.style.backgroundColor = "var(--bg-subtle)"; }}
                onMouseLeave={(e) => { if (activeCategory) e.currentTarget.style.backgroundColor = "transparent"; }}
              >
                All Questions
              </button>
              {categories.map((cat) => {
                const active = activeCategory === cat.name;
                return (
                  <button
                    key={cat.name}
                    onClick={() => onSelectCategory(cat.name)}
                    className="flex items-center justify-between rounded-md px-3 py-2 text-left text-sm transition-colors"
                    style={active ? { backgroundColor: "var(--ink)", color: "var(--bg-base)", fontWeight: 600 } : { color: "var(--text-secondary)" }}
                    onMouseEnter={(e) => { if (!active) e.currentTarget.style.backgroundColor = "var(--bg-subtle)"; }}
                    onMouseLeave={(e) => { if (!active) e.currentTarget.style.backgroundColor = "transparent"; }}
                  >
                    <span>{cat.name}</span>
                    <span
                      className="rounded-full px-1.5 py-0.5 font-mono text-[11px]"
                      style={
                        active
                          ? { backgroundColor: "var(--color-mustard-400)", color: "var(--color-teal-800)" }
                          : { backgroundColor: "var(--bg-subtle)", color: "var(--text-muted)" }
                      }
                    >
                      {cat.count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Popular / Trending */}
          {popular.length > 0 && (
            <div>
              <div className="label-tab mb-3 flex items-center gap-2 text-muted">
                <TrendingUp className="h-3.5 w-3.5" />
                Trending Questions
              </div>
              <div className="flex flex-col gap-0.5">
                {popular.map((faq) => (
                  <QuestionRow
                    key={faq.id}
                    faq={faq}
                    onSelectQuestion={onSelectQuestion}
                    isBookmarked={isBookmarked(faq.id)}
                    onToggleBookmark={toggleBookmark}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Bookmarks */}
          {bookmarks.length > 0 && (
            <div>
              <div className="label-tab mb-3 flex items-center gap-2 text-muted">
                <Star className="h-3.5 w-3.5" />
                Bookmarked
              </div>
              <div className="flex flex-col gap-1">
                {bookmarks.map((b) => (
                  <button
                    key={b.id}
                    onClick={() => onSelectQuestion(b.question)}
                    className="truncate rounded-md px-3 py-2 text-left text-sm text-secondary hover:bg-[var(--bg-subtle)] hover:text-[var(--text-primary)]"
                  >
                    {b.question}
                  </button>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="surface-card sticky top-24 hidden h-fit max-h-[75vh] shrink-0 overflow-y-auto p-5 lg:block lg:w-72">
        {content}
      </aside>

      {/* Mobile dropdown */}
      <div className="surface-card mb-4 lg:hidden">
        <button
          onClick={() => setMobileOpen((o) => !o)}
          className="flex w-full items-center justify-between px-5 py-4 text-sm font-semibold"
        >
          <span className="flex items-center gap-2">
            <Layers className="h-4 w-4" style={{ color: "var(--color-mustard-600)" }} />
            Browse categories, search &amp; trending
          </span>
          <ChevronDown className={`h-4 w-4 transition-transform ${mobileOpen ? "rotate-180" : ""}`} />
        </button>
        {mobileOpen && (
          <div className="max-h-96 overflow-y-auto border-t px-5 py-4" style={{ borderColor: "var(--border-subtle)" }}>
            {content}
          </div>
        )}
      </div>
    </>
  );
}
