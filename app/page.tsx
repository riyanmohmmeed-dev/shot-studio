"use client";

import { useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import PromptInput from "@/components/PromptInput";
import PromptTemplates from "@/components/PromptTemplates";
import DirectorNote from "@/components/DirectorNote";
import CameraControls, {
  ASPECT_RATIOS,
  FOCAL_LENGTHS,
  APERTURES,
} from "@/components/CameraControls";
import FilmStockPresets from "@/components/FilmStockPresets";
import QualityAndSeed from "@/components/QualityAndSeed";
import VoiceInput from "@/components/VoiceInput";
import ResultPanel from "@/components/ResultPanel";
import Gallery from "@/components/Gallery";
import Onboarding from "@/components/Onboarding";
import { addToGallery } from "@/lib/galleryStorage";
import type { FilmStockId } from "@/lib/buildPrompt";

type AspectValue = (typeof ASPECT_RATIOS)[number]["value"];
type FocalLength = (typeof FOCAL_LENGTHS)[number];
type Aperture = (typeof APERTURES)[number];

const LOADING_STEPS = [
  "Composing scene…",
  "Rendering light & depth…",
  "Finalizing frame…",
];

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [directorNote, setDirectorNote] = useState("");
  const [aspectRatio, setAspectRatio] = useState<AspectValue>("16:9");
  const [focalLength, setFocalLength] = useState<FocalLength>(35);
  const [aperture, setAperture] = useState<Aperture>("f/1.4");
  const [filmStock, setFilmStock] = useState<FilmStockId | null>("neutral");
  const [megapixels, setMegapixels] = useState("2");
  const [seed, setSeed] = useState("");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [lastSeed, setLastSeed] = useState<number | undefined>();
  const [isGenerating, setIsGenerating] = useState(false);
  const [loadingStep, setLoadingStep] = useState(LOADING_STEPS[0]);
  const [error, setError] = useState<string | null>(null);
  const [galleryRefresh, setGalleryRefresh] = useState(0);

  // Rotate loading message while generating
  useEffect(() => {
    if (!isGenerating) return;
    const id = setInterval(() => {
      setLoadingStep((s) => {
        const i = LOADING_STEPS.indexOf(s);
        return LOADING_STEPS[(i + 1) % LOADING_STEPS.length];
      });
    }, 2500);
    return () => clearInterval(id);
  }, [isGenerating]);

  const generate = useCallback(async () => {
    if (!prompt.trim()) {
      setError("Describe a scene to generate.");
      return;
    }
    setError(null);
    setIsGenerating(true);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: prompt.trim(),
          aspectRatio,
          focalLength,
          aperture,
          filmStockId: filmStock ?? undefined,
          directorNote: directorNote.trim() || undefined,
          seed: seed ? Number(seed) : undefined,
          megapixels,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        if (res.status === 402) {
          setError(
            data.error + " Add credit: replicate.com/account/billing"
          );
        } else {
          setError(data.error ?? "Generation failed.");
        }
        return;
      }
      setImageUrl(data.imageUrl);
      if (data.seed != null) setLastSeed(data.seed);
      addToGallery({
        imageUrl: data.imageUrl,
        prompt: prompt.trim(),
      });
      setGalleryRefresh((c) => c + 1);
    } catch (e) {
      setError("Network error. Try again.");
    } finally {
      setIsGenerating(false);
    }
  }, [
    prompt,
    aspectRatio,
    focalLength,
    aperture,
    filmStock,
    directorNote,
    seed,
    megapixels,
  ]);

  const handleNewShot = useCallback(() => {
    setImageUrl(null);
    setError(null);
  }, []);

  const handleVoiceTranscript = useCallback((text: string) => {
    setPrompt((p) => (p ? `${p} ${text}` : text));
  }, []);

  // Keyboard: Cmd/Ctrl + Enter to generate
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
        e.preventDefault();
        if (!isGenerating && prompt.trim()) generate();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [generate, isGenerating, prompt]);

  return (
    <div className="relative min-h-screen" id="generator">
      <Nav />
      <Onboarding onDismiss={() => {}} />

      <main className="relative mx-auto max-w-5xl px-6 pb-24">
        <Hero />

        <section className="space-y-6">
          <PromptTemplates onSelect={setPrompt} />

          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:gap-4">
            <div className="flex-1">
              <PromptInput
                value={prompt}
                onChange={setPrompt}
                placeholder="e.g. A battle in an ancient fantasy forest. Armored knights, mythical creatures, magic spells, towering glowing trees, dense fog, motion blur, sweeping cinematic angle."
                disabled={isGenerating}
              />
            </div>
            <VoiceInput onTranscript={handleVoiceTranscript} disabled={isGenerating} />
          </div>

          <DirectorNote
            value={directorNote}
            onChange={setDirectorNote}
            disabled={isGenerating}
          />

          <FilmStockPresets value={filmStock} onChange={setFilmStock} />

          <CameraControls
            aspectRatio={aspectRatio}
            focalLength={focalLength}
            aperture={aperture}
            onAspectRatioChange={setAspectRatio}
            onFocalLengthChange={setFocalLength}
            onApertureChange={setAperture}
          />

          <QualityAndSeed
            megapixels={megapixels}
            seed={seed}
            onMegapixelsChange={setMegapixels}
            onSeedChange={setSeed}
            lastSeed={lastSeed}
          />

          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300"
            >
              <p>{error}</p>
              {error.includes("Add credit") && (
                <a
                  href="https://replicate.com/account/billing#billing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-block font-medium text-accentWarm hover:underline"
                >
                  Add credit at Replicate →
                </a>
              )}
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <button
              type="button"
              onClick={generate}
              disabled={isGenerating}
              className="rounded-xl bg-accentWarm px-8 py-4 text-lg font-semibold text-void transition hover:bg-accentWarm/90 disabled:opacity-60"
            >
              {isGenerating ? "Generating…" : "GENERATE"}
            </button>
            <span className="text-xs text-muted">⌘↵ or Ctrl+Enter</span>
          </motion.div>
        </section>

        <section className="mt-12">
          <ResultPanel
            imageUrl={imageUrl}
            isGenerating={isGenerating}
            loadingStep={loadingStep}
            seed={lastSeed}
            onRegenerate={generate}
            onNewShot={handleNewShot}
          />
        </section>

        <Gallery onSelectImage={setImageUrl} refreshTrigger={galleryRefresh} />
      </main>
    </div>
  );
}
