"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ONBOARDING_KEY = "shot-studio-onboarding-done";

const STEPS = [
  "Describe your scene (or pick a template).",
  "Choose film stock, focal length & aperture.",
  "Hit Generate — or press ⌘↵ / Ctrl+Enter.",
];

type Props = {
  onDismiss: () => void;
};

export default function Onboarding({ onDismiss }: Props) {
  const [step, setStep] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const done = localStorage.getItem(ONBOARDING_KEY);
    if (!done) setVisible(true);
  }, []);

  const handleClose = () => {
    localStorage.setItem(ONBOARDING_KEY, "1");
    setVisible(false);
    onDismiss();
  };

  const next = () => {
    if (step < STEPS.length - 1) setStep((s) => s + 1);
    else handleClose();
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-40 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="glass-panel max-w-md rounded-2xl p-8 shadow-2xl"
          >
            <h3 className="text-xl font-semibold text-white">
              How Shot Studio works
            </h3>
            <ul className="mt-4 space-y-3">
              {STEPS.map((text, i) => (
                <li
                  key={i}
                  className={`flex items-center gap-3 text-sm ${
                    i <= step ? "text-white/90" : "text-muted"
                  }`}
                >
                  <span
                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-medium ${
                      i < step
                        ? "bg-accent text-white"
                        : i === step
                          ? "bg-accentWarm text-void"
                          : "bg-glass text-muted"
                    }`}
                  >
                    {i < step ? "✓" : i + 1}
                  </span>
                  {text}
                </li>
              ))}
            </ul>
            <div className="mt-6 flex justify-between">
              <button
                type="button"
                onClick={handleClose}
                className="text-sm text-muted hover:text-white"
              >
                Skip
              </button>
              <button
                type="button"
                onClick={next}
                className="rounded-xl bg-accent px-5 py-2.5 text-sm font-medium text-white hover:bg-accent/90"
              >
                {step < STEPS.length - 1 ? "Next" : "Get started"}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
