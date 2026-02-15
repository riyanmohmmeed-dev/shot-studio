"use client";

import { motion } from "framer-motion";

const MEGAPIXELS = [
  { label: "1 MP", value: "1" },
  { label: "2 MP", value: "2" },
  { label: "4 MP", value: "4" },
] as const;

type Props = {
  megapixels: string;
  seed: string;
  onMegapixelsChange: (v: string) => void;
  onSeedChange: (v: string) => void;
  lastSeed?: number;
};

export default function QualityAndSeed({
  megapixels,
  seed,
  onMegapixelsChange,
  onSeedChange,
  lastSeed,
}: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.42 }}
      className="glass-panel rounded-2xl p-6"
    >
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-muted">
            Quality (megapixels)
          </label>
          <div className="flex flex-wrap gap-2">
            {MEGAPIXELS.map(({ label, value }) => (
              <button
                key={value}
                type="button"
                onClick={() => onMegapixelsChange(value)}
                className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
                  megapixels === value
                    ? "bg-accent text-white"
                    : "bg-glass text-muted hover:bg-white/10 hover:text-white"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label htmlFor="seed" className="mb-2 block text-xs font-medium uppercase tracking-wider text-muted">
            Seed (optional — for reproducibility)
          </label>
          <div className="flex items-center gap-2">
            <input
              id="seed"
              type="text"
              inputMode="numeric"
              value={seed}
              onChange={(e) => onSeedChange(e.target.value.replace(/\D/g, "").slice(0, 12))}
              placeholder="Leave empty for random"
              className="w-full rounded-lg border border-glassBorder bg-glass px-3 py-2 text-sm text-white placeholder:text-white/40"
            />
            {lastSeed != null && (
              <span className="whitespace-nowrap text-xs text-muted">Last: {lastSeed}</span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
