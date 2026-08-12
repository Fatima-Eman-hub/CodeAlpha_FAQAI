import { motion } from "framer-motion";

export default function FeatureCard({ icon: Icon, title, description, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: (index % 4) * 0.06 }}
      className="surface-card group relative p-7"
    >
      <span className="label-tab absolute right-5 top-5 text-muted">
        Fig. {String(index + 1).padStart(2, "0")}
      </span>
      <div className="icon-glow mb-5 flex h-11 w-11 items-center justify-center rounded-md">
        <Icon className="h-5 w-5" strokeWidth={2} />
      </div>
      <h3 className="font-display text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-[15px] leading-relaxed text-secondary">{description}</p>
    </motion.div>
  );
}
