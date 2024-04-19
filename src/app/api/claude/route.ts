import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { message } = await req.json();

  const options: RequestInit = {
    method: "POST",
    headers: {
      "x-api-key": process.env.CLAUDE_API_KEY as string,
      "anthropic-version": "2023-06-01",
      "content-type": "application/json",
    },
    body: JSON.stringify({
      model: "claude-3-opus-20240229",
      max_tokens: 20,
      temperature: 0,
      system: "Respond in short and clear sentences.",
      messages: [{ role: "user", content: message }],
    }),
  };

  const response = await fetch(
    "https://api.anthropic.com/v1/messages",
    options
  );
  const data = await response.json();
  return NextResponse.json(data);
}
