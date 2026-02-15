"use client";

import { motion } from "framer-motion";
import { FILM_STOCKS, type FilmStockId } from "@/lib/buildPrompt";

type Props = {
  value: FilmStockId | null;
  onChange: (id: FilmStockId) => void;
};

export default function FilmStockPresets({ value, onChange }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.35 }}
      className="glass-panel rounded-2xl p-6"
    >
      <p className="mb-3 text-xs font-medium uppercase tracking-wider text-muted">
        Film stock / look
      </p>
      <div className="flex flex-wrap gap-2">
        {FILM_STOCKS.map(({ id, label }) => (
          <button
            key={id}
            type="button"
            onClick={() => onChange(id)}
            className={`rounded-xl px-4 py-2.5 text-sm font-medium transition ${
              value === id
                ? "bg-accentWarm/20 text-accentWarm border border-accentWarm/50"
                : "border border-glassBorder bg-glass text-muted hover:bg-white/10 hover:text-white"
            }`}
          >
            {label}
          </button>
        ))}
      </div>
    </motion.div>
  );
}
