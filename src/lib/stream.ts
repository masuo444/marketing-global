import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic();

export function createStreamingResponse(
  systemPrompt: string,
  userMessages: { role: "user" | "assistant"; content: string }[]
): ReadableStream<Uint8Array> {
  const encoder = new TextEncoder();

  return new ReadableStream({
    async start(controller) {
      try {
        const stream = await client.messages.stream({
          model: "claude-sonnet-4-5-20250929",
          max_tokens: 4096,
          system: systemPrompt,
          messages: userMessages,
        });

        for await (const event of stream) {
          if (
            event.type === "content_block_delta" &&
            event.delta.type === "text_delta"
          ) {
            const data = `data: ${JSON.stringify({ text: event.delta.text })}\n\n`;
            controller.enqueue(encoder.encode(data));
          }
        }

        controller.enqueue(encoder.encode("data: [DONE]\n\n"));
        controller.close();
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Unknown error";
        const data = `data: ${JSON.stringify({ error: errorMessage })}\n\n`;
        controller.enqueue(encoder.encode(data));
        controller.close();
      }
    },
  });
}
