"use client";

import { motion } from "framer-motion";

const navItems = [
  "Explore",
  "Image",
  "Video",
  "Edit",
  "Character",
  "Contests",
  "Cinema Studio",
  "Apps",
  "Community",
];

export default function Nav() {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-glassBorder bg-void/80 backdrop-blur-xl"
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <a href="/" className="text-xl font-semibold tracking-tight text-white">
          Shot Studio
        </a>
        <div className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <a
              key={item}
              href={item === "Cinema Studio" ? "#generator" : "#"}
              className={`text-sm transition-colors hover:text-white ${
                item === "Cinema Studio" ? "text-accent font-medium" : "text-muted"
              }`}
            >
              {item}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-4">
          <button
            type="button"
            className="rounded-full border border-glassBorder bg-glass px-4 py-2 text-sm text-white/90 transition hover:bg-white/10"
          >
            Sign in
          </button>
          <button
            type="button"
            className="rounded-full bg-accent px-4 py-2 text-sm font-medium text-white transition hover:bg-accent/90"
          >
            Get started
          </button>
        </div>
      </nav>
    </motion.header>
  );
}
