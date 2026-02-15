"use client";

import { motion } from "framer-motion";

type Props = {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  disabled?: boolean;
};

export default function PromptInput({
  value,
  onChange,
  placeholder = "Describe the scene you imagine...",
  disabled = false,
}: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.4 }}
      className="w-full"
    >
      <label htmlFor="prompt" className="sr-only">
        Scene description
      </label>
      <textarea
        id="prompt"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        rows={4}
        className="w-full resize-none rounded-2xl border border-glassBorder bg-surface/80 px-5 py-4 text-white placeholder:text-white/40 backdrop-blur-xl transition focus:border-accent/50"
      />
    </motion.div>
  );
}
