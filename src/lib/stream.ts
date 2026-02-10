import OpenAI from "openai";

function getClient(): OpenAI {
  return new OpenAI({
    apiKey: process.env.OPENAI_API_KEY || "",
  });
}

export function createStreamingResponse(
  systemPrompt: string,
  userMessages: { role: "user" | "assistant"; content: string }[]
): ReadableStream<Uint8Array> {
  const encoder = new TextEncoder();

  return new ReadableStream({
    async start(controller) {
      try {
        const client = getClient();

        const messages: OpenAI.ChatCompletionMessageParam[] = [
          { role: "system", content: systemPrompt },
          ...userMessages.map((m) => ({
            role: m.role as "user" | "assistant",
            content: m.content,
          })),
        ];

        const stream = await client.chat.completions.create({
          model: "gpt-4o",
          max_tokens: 4096,
          stream: true,
          messages,
        });

        for await (const chunk of stream) {
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
