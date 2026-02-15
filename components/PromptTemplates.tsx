"use client";

import { motion } from "framer-motion";
import { PROMPT_TEMPLATES } from "@/lib/promptTemplates";

type Props = {
  onSelect: (prompt: string) => void;
};

export default function PromptTemplates({ onSelect }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.25 }}
      className="glass-panel rounded-2xl p-6"
    >
      <p className="mb-3 text-xs font-medium uppercase tracking-wider text-muted">
        Infinite budget — quick start
      </p>
      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {PROMPT_TEMPLATES.map(({ id, label, prompt }) => (
          <button
            key={id}
            type="button"
            onClick={() => onSelect(prompt)}
            className="rounded-xl border border-glassBorder bg-glass px-4 py-3 text-left text-sm text-white/90 transition hover:border-accent/40 hover:bg-accent/10"
          >
            <span className="font-medium">{label}</span>
            <span className="mt-1 block truncate text-xs text-muted">{prompt.slice(0, 50)}…</span>
          </button>
        ))}
      </div>
    </motion.div>
  );
}
