import { NextRequest } from "next/server";
import {
  buildSystemPrompt,
  buildCulturalContext,
  buildUserMessage,
} from "@/lib/prompts";
import { createStreamingResponse } from "@/lib/stream";
import { GenerateRequest } from "@/types";

export const maxDuration = 60;
export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const body: GenerateRequest = await request.json();
    const { category, contentType, languages, brand, tone } = body;

    if (!category || !contentType || !languages?.length || !brand?.name) {
      return new Response(
        JSON.stringify({ error: "必須パラメータが不足しています" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const systemPrompt = [
      buildSystemPrompt(category, contentType, tone),
      buildCulturalContext(languages),
    ].join("\n\n");

    const userMessage = buildUserMessage(brand, contentType, languages, tone);

    const stream = await createStreamingResponse(systemPrompt, [
      { role: "user", content: userMessage },
    ]);

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Internal server error";
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
