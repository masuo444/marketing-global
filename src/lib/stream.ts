import OpenAI from "openai";

function getClient(): OpenAI {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error("OPENAI_API_KEY is not configured");
  }
  return new OpenAI({ apiKey });
}

export async function createStreamingResponse(
  systemPrompt: string,
  userMessages: { role: "user" | "assistant"; content: string }[]
): Promise<ReadableStream<Uint8Array>> {
  const client = getClient();
  const encoder = new TextEncoder();

  const messages: OpenAI.ChatCompletionMessageParam[] = [
    { role: "system", content: systemPrompt },
    ...userMessages.map((m) => ({
      role: m.role as "user" | "assistant",
      content: m.content,
    })),
  ];

  // Establish OpenAI connection BEFORE creating the stream
  // This ensures auth/connection errors are thrown to the route handler
  const openaiStream = await client.chat.completions.create({
    model: "gpt-4o",
    max_tokens: 4096,
    stream: true,
    messages,
  });

  return new ReadableStream({
    async start(controller) {
      try {
        for await (const chunk of openaiStream) {
          const delta = chunk.choices[0]?.delta?.content;
          if (delta) {
            const data = `data: ${JSON.stringify({ text: delta })}\n\n`;
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
