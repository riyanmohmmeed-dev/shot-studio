import { NextRequest, NextResponse } from "next/server";
import Replicate from "replicate";
import { buildCinematicPrompt } from "@/lib/buildPrompt";
import type { FilmStockId } from "@/lib/buildPrompt";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN ?? "",
});

/**
 * POST /api/generate
 * Body: { prompt, aspectRatio, focalLength, aperture, filmStockId?, directorNote?, seed?, megapixels? }
 */
export async function POST(request: NextRequest) {
  try {
    if (!process.env.REPLICATE_API_TOKEN) {
      return NextResponse.json(
        { error: "REPLICATE_API_TOKEN is not set. Add it in .env.local." },
        { status: 503 }
      );
    }

    const body = await request.json();
    const {
      prompt: userPrompt,
      aspectRatio = "16:9",
      focalLength = 35,
      aperture = "f/1.4",
      filmStockId,
      directorNote,
      seed,
      megapixels = "2",
    } = body;

    if (!userPrompt || typeof userPrompt !== "string") {
      return NextResponse.json(
        { error: "Missing or invalid prompt." },
        { status: 400 }
      );
    }

    const fullPrompt = buildCinematicPrompt(userPrompt, focalLength, aperture, {
      filmStockId: filmStockId as FilmStockId | undefined,
      directorNote: directorNote as string | undefined,
    });

    const input: Record<string, unknown> = {
      prompt: fullPrompt,
      aspect_ratio: aspectRatio,
      num_outputs: 1,
      output_format: "webp",
      output_quality: 95,
      megapixels: String(megapixels),
    };
    if (seed != null && Number.isInteger(Number(seed))) {
      input.seed = Number(seed);
    }

    const output = await replicate.run("black-forest-labs/flux-schnell", {
      input,
    });

    const result = Array.isArray(output) ? output[0] : output;
    let imageUrl: string | null = null;
    if (typeof result === "string") imageUrl = result;
    else if (result && typeof result === "object" && typeof (result as { url?: () => string }).url === "function")
      imageUrl = (result as { url: () => string }).url();

    if (!imageUrl) {
      return NextResponse.json(
        { error: "Generation succeeded but no image URL returned." },
        { status: 502 }
      );
    }

    return NextResponse.json({
      imageUrl,
      promptUsed: fullPrompt,
      seed: input.seed ?? undefined,
    });
  } catch (err) {
    console.error("Generate API error:", err);
    const msg = err instanceof Error ? err.message : String(err);
    const is402 = msg.includes("402") || msg.includes("Insufficient credit") || msg.includes("Payment Required");
    if (is402) {
      return NextResponse.json(
        {
          error: "Your Replicate account has no credit. Add credit to generate images.",
          billingUrl: "https://replicate.com/account/billing#billing",
        },
        { status: 402 }
      );
    }
    return NextResponse.json({ error: msg || "Generation failed." }, { status: 500 });
  }
}
