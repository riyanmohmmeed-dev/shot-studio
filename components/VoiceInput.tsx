"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";

type Props = {
  onTranscript: (text: string) => void;
  disabled?: boolean;
};

export default function VoiceInput({ onTranscript, disabled }: Props) {
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const toggleMic = useCallback(() => {
    if (disabled) return;

    if (isListening) {
      (window as unknown as { speechRecognition?: { stop: () => void } }).speechRecognition?.stop?.();
      setIsListening(false);
      return;
    }

    setError(null);
    const SpeechRecognition =
      typeof window !== "undefined" &&
      (window.SpeechRecognition || (window as unknown as { webkitSpeechRecognition?: typeof SpeechRecognition })["webkitSpeechRecognition"]);
    if (!SpeechRecognition) {
      setError("Voice input not supported in this browser.");
      return;
    }

    const rec = new SpeechRecognition();
    rec.continuous = true;
    rec.interimResults = true;
    rec.lang = "en-US";

    rec.onresult = (event: SpeechRecognitionEvent) => {
      const last = event.results.length - 1;
      const text = event.results[last][0].transcript;
      if (event.results[last].isFinal) onTranscript(text);
    };
    rec.onerror = () => setError("Could not start microphone.");
    rec.onend = () => setIsListening(false);

    (window as unknown as { speechRecognition?: typeof rec }).speechRecognition = rec;
    rec.start();
    setIsListening(true);
  }, [disabled, isListening, onTranscript]);

  return (
    <div className="flex items-center gap-2">
      <motion.button
        type="button"
        onClick={toggleMic}
        disabled={disabled}
        whileTap={{ scale: 0.98 }}
        className={`flex h-10 w-10 items-center justify-center rounded-xl border transition ${
          isListening
            ? "border-red-500/60 bg-red-500/20 text-red-400"
            : "border-glassBorder bg-glass text-muted hover:bg-white/10 hover:text-white"
        } ${disabled ? "opacity-50" : ""}`}
        title={isListening ? "Stop listening" : "Describe by voice"}
      >
        <span className="text-lg" aria-hidden>
          {isListening ? "⏹" : "🎤"}
        </span>
      </motion.button>
      {isListening && (
        <span className="text-xs text-muted">Listening…</span>
      )}
      {error && (
        <span className="text-xs text-red-400">{error}</span>
      )}
    </div>
  );
}
