import { motion } from "framer-motion";
import { Compass } from "lucide-react";

export default function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-end gap-2.5"
    >
      <span className="icon-glow flex h-8 w-8 shrink-0 items-center justify-center rounded-md">
        <Compass className="h-4 w-4" strokeWidth={2} />
      </span>
      <div className="surface-card flex items-center gap-1.5 rounded-lg rounded-bl-sm px-4 py-3.5">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="h-1.5 w-1.5 animate-bounce rounded-full"
            style={{ backgroundColor: "var(--color-mustard-500)", animationDelay: `${i * 0.15}s` }}
          />
        ))}
      </div>
    </motion.div>
  );
}
