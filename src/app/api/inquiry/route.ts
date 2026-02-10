import { NextRequest } from "next/server";
import {
  buildInquirySystemPrompt,
  buildInquiryUserMessage,
  buildCulturalContext,
} from "@/lib/prompts";
import { createStreamingResponse } from "@/lib/stream";
import { InquiryRequest } from "@/types";

export const maxDuration = 60;
export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const body: InquiryRequest = await request.json();
    const { category, customMessage, targetLanguages, tone } = body;

    if (!targetLanguages?.length || (!category && !customMessage)) {
      return new Response(
        JSON.stringify({ error: "必須パラメータが不足しています" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const systemPrompt = [
      buildInquirySystemPrompt(tone),
      buildCulturalContext(targetLanguages),
    ].join("\n\n");

    const userMessage = buildInquiryUserMessage(
      category,
      customMessage,
      targetLanguages,
      tone
    );

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
