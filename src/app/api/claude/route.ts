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
      model: "claude-3-haiku-20240307",
      max_tokens: 100,
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

// lica-world
// AQXiNtHNEf8Ubt8vId_gzoGGraGKwv3ItDnZahe0uUik0LZQOs-f4dy0rTlNRGIkTqcfhxr2JaQMOHMLH-XiIHiJ_maOI0MIqG-mSq3AMfQMGFvDytZ422LsgyqnbjupdDEEmaYsJJ_zpHH_banGcpiwL2xE1GTHgnd7_9lwyYQS4_U_8OtNjSKCGtwEGQOnxmlfAn6BCiOlvoEuI-XKaQJM0E2tHymO3y6uI6D7_iACGp-HDCd9WR9-N30YqQNcEXfXDVsQ8djo2sSw0lI0XAwjYrv6u4Ps-R2Z228JvKWZldlhG4WcgEgT44bMiiuXuf1R--qXPyYgYW5gdm48SAvABqldBg

// lica-world-test
// AQUuXUNG5lrMbxiZMpuGgOsSFNo6tzjeMLfNgJglruzDds3sKuF4kJKR53KrWbJo_s3DGd7Rfx9g93lWa4NsDE3u9iYhy76p0PXYse56CXM9QFrfKC0aHhsXbp7_rK1oSrya63vtIdc_KAffE_LkAsXKMiYwzy_8JByJVKw1IuElA_FvIHKC6kygTxNgmRwDHi4qAinonp0D2YblB2KgW56N3q6_qa8Sey0LyntgwSCkuauy2UQt-bGQs1z9XosjrEpp5EoeU7CGhEbtSHMLNnPv1_8J51LPb4gfC8QEfnKXfu1jtvOyJE8l_0CiFN2fLjsiLUzpeMzljK38HJwcWXFKSPQWkA
