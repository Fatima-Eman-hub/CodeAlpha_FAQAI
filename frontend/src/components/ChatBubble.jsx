import { useState } from "react";
import { motion } from "framer-motion";
import { Compass, User, AlertCircle, Copy, Check, Volume2, Square } from "lucide-react";

function formatTime(date) {
  return new Date(date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function ConfidenceStamp({ confidence, matched }) {
  if (confidence === undefined || confidence === null) return null;
  const pct = Math.round(confidence * 100);

  return (
    <span
      className="rounded px-1.5 py-0.5 font-mono text-[11px] font-semibold"
      style={
        matched
          ? { backgroundColor: "var(--color-mustard-400)", color: "var(--color-teal-800)" }
          : { color: "var(--text-muted)", border: "1px solid var(--border-subtle)" }
      }
    >
      {pct}% {matched ? "MATCH" : "below threshold"}
    </span>
  );
}

export default function ChatBubble({ message, onAskRelated, disabled }) {
  const isUser = message.role === "user";
  const [copied, setCopied] = useState(false);
  const [speaking, setSpeaking] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message.text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard API unavailable; ignore silently
    }
  };

  const handleSpeak = () => {
    if (!("speechSynthesis" in window)) return;
    if (speaking) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(message.text);
    utterance.rate = 1;
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);
    window.speechSynthesis.speak(utterance);
    setSpeaking(true);
  };

  const canSpeak = typeof window !== "undefined" && "speechSynthesis" in window;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`group flex items-end gap-2.5 ${isUser ? "flex-row-reverse" : "flex-row"}`}
    >
      <span
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md"
        style={
          isUser
            ? { backgroundColor: "var(--ink)" }
            : { backgroundColor: message.isError ? "transparent" : "var(--ink)", border: message.isError ? "1.5px solid var(--color-mustard-500)" : "none" }
        }
      >
        {isUser ? (
          <User className="h-4 w-4" style={{ color: "var(--bg-base)" }} strokeWidth={2} />
        ) : message.isError ? (
          <AlertCircle className="h-4 w-4" style={{ color: "var(--color-mustard-600)" }} strokeWidth={2} />
        ) : (
          <Compass className="h-4 w-4" style={{ color: "var(--bg-base)" }} strokeWidth={2} />
        )}
      </span>

      <div className={`flex max-w-[78%] flex-col gap-1 sm:max-w-[65%] ${isUser ? "items-end" : "items-start"}`}>
        <div
          className={`rounded-lg px-4 py-2.5 text-[15px] leading-relaxed ${
            isUser ? "rounded-br-sm" : "surface-card rounded-bl-sm"
          }`}
          style={isUser ? { backgroundColor: "var(--ink)", color: "var(--bg-base)" } : undefined}
        >
          {message.text}
        </div>

        {!isUser && !message.isError && message.relatedQuestions?.length > 0 && (
          <div className="mt-1 max-w-full">
            <p className="label-tab mb-1.5 text-muted">
              {message.matched ? "You might also ask" : "Did you mean"}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {message.relatedQuestions.map((rq) => (
                <button
                  key={rq.id}
                  onClick={() => onAskRelated?.(rq.question)}
                  disabled={disabled}
                  className="rounded-md border-[1.5px] px-3 py-1 text-xs text-secondary transition-colors hover:border-current hover:text-[var(--text-primary)] disabled:opacity-50"
                  style={{ borderColor: "var(--border-subtle)", backgroundColor: "var(--bg-subtle)" }}
                >
                  {rq.question}
                </button>
              ))}
            </div>
          </div>
        )}
        <div className="flex items-center gap-2 px-1">
          <span className="font-mono text-xs text-muted">{formatTime(message.timestamp)}</span>
          {!isUser && !message.isError && (
            <ConfidenceStamp confidence={message.confidence} matched={message.matched} />
          )}
          {!isUser && !message.isError && (
            <span className="flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
              <button
                onClick={handleCopy}
                aria-label="Copy response"
                className="flex h-5 w-5 items-center justify-center rounded text-muted hover:text-[var(--text-primary)]"
              >
                {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
              </button>
              {canSpeak && (
                <button
                  onClick={handleSpeak}
                  aria-label={speaking ? "Stop reading" : "Read answer aloud"}
                  className="flex h-5 w-5 items-center justify-center rounded text-muted hover:text-[var(--text-primary)]"
                >
                  {speaking ? <Square className="h-3 w-3" /> : <Volume2 className="h-3.5 w-3.5" />}
                </button>
              )}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
