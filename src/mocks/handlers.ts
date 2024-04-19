import { http, HttpResponse } from "msw";

interface RequestBody {
  message: string;
}

export const handlers = [
  http.post("/api/claude", async ({ request }) => {
    const { message } = (await request.json()) as RequestBody;

    return HttpResponse.json({
      id: "msg_01UdTcTiezafsQwCq5T2rQZ8",
      type: "message",
      role: "assistant",
      model: "claude-3-opus-20240229",
      stop_sequence: null,
      usage: { input_tokens: 22, output_tokens: 6 },
      content: [{ type: "text", text: message }],
      stop_reason: "end_turn",
    });
  }),
];
