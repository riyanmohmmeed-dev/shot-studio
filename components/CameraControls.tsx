"use client";

import { motion } from "framer-motion";

export const ASPECT_RATIOS = [
  { label: "16:9", value: "16:9" },
  { label: "21:9", value: "21:9" },
  { label: "9:16", value: "9:16" },
  { label: "1:1", value: "1:1" },
  { label: "4:5", value: "4:5" },
] as const;

export const FOCAL_LENGTHS = [24, 35, 50, 85, 135] as const;
export const APERTURES = ["f/1.4", "f/2", "f/2.8", "f/4", "f/5.6", "f/8"] as const;

export type AspectValue = (typeof ASPECT_RATIOS)[number]["value"];
export type FocalLength = (typeof FOCAL_LENGTHS)[number];
export type Aperture = (typeof APERTURES)[number];

type Props = {
  aspectRatio: AspectValue;
  focalLength: FocalLength;
  aperture: Aperture;
  onAspectRatioChange: (v: AspectValue) => void;
  onFocalLengthChange: (v: FocalLength) => void;
  onApertureChange: (v: Aperture) => void;
};

export default function CameraControls({
  aspectRatio,
  focalLength,
  aperture,
  onAspectRatioChange,
  onFocalLengthChange,
  onApertureChange,
}: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.4 }}
      className="glass-panel rounded-2xl p-6"
    >
      <p className="mb-4 text-xs font-medium uppercase tracking-wider text-muted">
        Camera & lens
      </p>
      <div className="grid gap-6 sm:grid-cols-3">
        {/* Focal length */}
        <div>
          <label className="mb-2 block text-sm text-muted">Focal length</label>
          <div className="flex flex-wrap gap-2">
            {FOCAL_LENGTHS.map((mm) => (
              <button
                key={mm}
                type="button"
                onClick={() => onFocalLengthChange(mm)}
                className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
                  focalLength === mm
                    ? "bg-accent text-white"
                    : "bg-glass text-muted hover:bg-white/10 hover:text-white"
                }`}
              >
                {mm}mm
              </button>
            ))}
          </div>
        </div>

        {/* Aperture */}
        <div>
          <label className="mb-2 block text-sm text-muted">Aperture</label>
          <div className="flex flex-wrap gap-2">
            {APERTURES.map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => onApertureChange(f)}
                className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
                  aperture === f
                    ? "bg-accent text-white"
                    : "bg-glass text-muted hover:bg-white/10 hover:text-white"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Aspect ratio */}
        <div>
          <label className="mb-2 block text-sm text-muted">Aspect ratio</label>
          <div className="flex flex-wrap gap-2">
            {ASPECT_RATIOS.map(({ label, value }) => (
              <button
                key={value}
                type="button"
                onClick={() => onAspectRatioChange(value)}
                className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
                  aspectRatio === value
                    ? "bg-accent text-white"
                    : "bg-glass text-muted hover:bg-white/10 hover:text-white"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
