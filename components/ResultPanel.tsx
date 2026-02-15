"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

type Props = {
  imageUrl: string | null;
  isGenerating: boolean;
  loadingStep?: string;
  seed?: number;
  onRegenerate: () => void;
  onNewShot: () => void;
};

const LOADING_STEPS = [
  "Composing scene…",
  "Rendering light & depth…",
  "Finalizing frame…",
];

export default function ResultPanel({
  imageUrl,
  isGenerating,
  loadingStep,
  seed,
  onRegenerate,
  onNewShot,
}: Props) {
  const [copied, setCopied] = useState(false);
  const showPlaceholder = !imageUrl && !isGenerating;
  const showImage = imageUrl && !isGenerating;

  const copyLink = () => {
    if (!imageUrl) return;
    navigator.clipboard.writeText(imageUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.4 }}
      className="glass-panel rounded-2xl overflow-hidden"
    >
      <div className="relative aspect-video min-h-[280px] w-full flex items-center justify-center bg-void/80">
        <AnimatePresence mode="wait">
          {isGenerating && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex flex-col items-center justify-center gap-4"
            >
              <div className="h-12 w-12 animate-spin rounded-full border-2 border-accent border-t-transparent" />
              <p className="text-sm text-muted">
                {loadingStep ?? LOADING_STEPS[Math.floor(Date.now() / 2000) % 3]}
              </p>
            </motion.div>
          )}
          {showPlaceholder && (
            <motion.div
              key="placeholder"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center text-muted"
            >
              <p className="text-sm">Your cinematic frame will appear here.</p>
              <p className="mt-1 text-xs">
                Describe a scene, pick a film look, then hit Generate. ⌘↵
              </p>
            </motion.div>
          )}
          {showImage && imageUrl && (
            <motion.div
              key="image"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="relative h-full w-full"
            >
              <Image
                src={imageUrl}
                alt="Generated cinematic frame"
                fill
                className="object-contain"
                unoptimized
              />
              {seed != null && (
                <span className="absolute bottom-2 left-2 rounded bg-black/60 px-2 py-1 text-xs text-white/80">
                  Seed: {seed}
                </span>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {(showImage || isGenerating) && (
        <div className="flex flex-wrap items-center justify-center gap-3 border-t border-glassBorder p-4">
          <button
            type="button"
            onClick={onRegenerate}
            disabled={isGenerating}
            className="inline-flex items-center gap-2 rounded-xl border border-glassBorder bg-glass px-5 py-2.5 text-sm font-medium text-white transition hover:bg-white/10 disabled:opacity-50"
          >
            <span className="text-lg" aria-hidden>↻</span>
            REGENERATE
          </button>
          {imageUrl && (
            <>
              <a
                href={imageUrl}
                download="shot-studio-frame.webp"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-glassBorder bg-glass px-5 py-2.5 text-sm font-medium text-white transition hover:bg-white/10"
              >
                <span className="text-lg" aria-hidden>↓</span>
                DOWNLOAD
              </a>
              <button
                type="button"
                onClick={copyLink}
                className={`inline-flex items-center gap-2 rounded-xl border border-glassBorder bg-glass px-5 py-2.5 text-sm font-medium text-white transition hover:bg-white/10 ${
                  copied ? "border-green-500/50 text-green-400" : ""
                }`}
              >
                <span className="text-lg" aria-hidden>⎘</span>
                {copied ? "COPIED" : "COPY LINK"}
              </button>
            </>
          )}
          <button
            type="button"
            onClick={onNewShot}
            disabled={isGenerating}
            className="inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-2.5 text-sm font-medium text-white transition hover:bg-accent/90 disabled:opacity-50"
          >
            <span className="text-lg" aria-hidden>+</span>
            NEW SHOT
          </button>
        </div>
      )}
    </motion.div>
  );
}
