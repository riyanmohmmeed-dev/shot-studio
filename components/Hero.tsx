"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20">
      {/* Ambient glow orbs */}
      <div
        className="pointer-events-none absolute inset-0 bg-glow-orb-blue"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-glow-orb-amber"
        aria-hidden
      />

      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="mb-4 text-sm font-medium uppercase tracking-widest text-accent"
        >
          Cinema Studio 2.0
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl"
        >
          What would you shoot with infinite budget?
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.5 }}
          className="mx-auto mt-6 max-w-2xl text-lg text-muted"
        >
          Create stunning, high-aesthetic cinematic frames in seconds. Director-style
          controls: focal length, aperture, aspect ratio — then one click to generate.
        </motion.p>
      </div>
    </section>
  );
}
