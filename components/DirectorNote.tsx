"use client";

import { motion } from "framer-motion";

type Props = {
  value: string;
  onChange: (v: string) => void;
  disabled?: boolean;
};

export default function DirectorNote({ value, onChange, disabled }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.38 }}
      className="w-full"
    >
      <label htmlFor="director-note" className="mb-2 block text-xs font-medium uppercase tracking-wider text-muted">
        Director&apos;s note (optional)
      </label>
      <input
        id="director-note"
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="e.g. Golden hour, backlit, lens flare"
        disabled={disabled}
        className="w-full rounded-xl border border-glassBorder bg-surface/80 px-4 py-3 text-white placeholder:text-white/40 backdrop-blur-xl transition focus:border-accent/50"
      />
    </motion.div>
  );
}
