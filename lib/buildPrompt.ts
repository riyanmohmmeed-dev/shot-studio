import type { FocalLength, Aperture } from "@/components/CameraControls";

export const FILM_STOCKS = [
  { id: "neutral", label: "Neutral", hint: "clean, neutral color grade, versatile" },
  { id: "kodak5219", label: "Kodak 5219", hint: "Kodak Vision3 500T, warm highlights, cinematic teal shadows, anamorphic feel" },
  { id: "fuji_eterna", label: "Fuji Eterna", hint: "Fuji Eterna 500, soft contrast, organic skin tones, documentary look" },
  { id: "noir", label: "Noir", hint: "black and white, high contrast, dramatic shadows, 1940s film noir" },
  { id: "bleach", label: "Bleach Bypass", hint: "bleach bypass process, desaturated, gritty, Saving Private Ryan style" },
  { id: "vintage", label: "Vintage", hint: "vintage film grain, faded highlights, nostalgic, 70s cinema" },
  { id: "neon", label: "Neon / Synth", hint: "neon lights, cyberpunk, strong magenta and cyan, Blade Runner" },
] as const;

export type FilmStockId = (typeof FILM_STOCKS)[number]["id"];

/**
 * Enhances user prompt with cinematic / camera semantics + film stock + director's note.
 */
export function buildCinematicPrompt(
  userPrompt: string,
  focalLength: FocalLength,
  aperture: Aperture,
  options?: { filmStockId?: FilmStockId; directorNote?: string }
): string {
  const focalHint =
    focalLength <= 35
      ? "wide angle, expansive frame, environmental scale"
      : focalLength <= 50
        ? "natural perspective, balanced composition"
        : "telephoto compression, intimate detail, shallow depth of field";

  const apertureHint =
    aperture === "f/1.4" || aperture === "f/2"
      ? "shallow depth of field, creamy bokeh, subject isolation"
      : aperture === "f/2.8" || aperture === "f/4"
        ? "moderate depth of field, cinematic focus"
        : "deep focus, sharp detail throughout";

  const film = options?.filmStockId
    ? FILM_STOCKS.find((f) => f.id === options.filmStockId)
    : null;
  const filmHint = film ? `, ${film.hint}` : "";

  const prefix =
    "Cinematic frame, professional film still, high production value, no AI slop, ";
  const director = options?.directorNote?.trim()
    ? ` ${options.directorNote.trim()}.`
    : "";
  const suffix = ` ${focalHint}, ${apertureHint}${filmHint}, 8K, photorealistic, dramatic lighting.${director}`;

  return `${prefix}${userPrompt.trim()}${suffix}`;
}
