import { NextRequest, NextResponse } from 'next/server';

const DIFY_API_KEY = process.env.DIFY_API_KEY;
const DIFY_API_URL = "https://api.dify.ai/v1/chat-messages";

export async function POST(req: NextRequest) {
  if (!DIFY_API_KEY) {
    return NextResponse.json({ error: 'API key not configured' }, { status: 500 });
  }

  try {
    const { messages } = await req.json();
    const userMessage = messages[messages.length - 1].content;

    const response = await fetch(DIFY_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${DIFY_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        inputs: {},
        query: userMessage,
        response_mode: "streaming",
        user: "user-" + Date.now(),
      }),
    });

    if (!response.ok) {
      throw new Error(`Dify API Error: ${response.status}`);
    }

    // 转换为 ReadableStream
    const encoder = new TextEncoder();
    const decoder = new TextDecoder();

    const transformStream = new TransformStream({
      async transform(chunk, controller) {
        const text = decoder.decode(chunk);
        const lines = text.split('\n');
        
        for (const line of lines) {
          if (line.trim()) {
            controller.enqueue(encoder.encode(line + '\n'));
          }
        }
      },
    });

    response.body?.pipeTo(transformStream.writable);

    return new Response(transformStream.readable, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });

  } catch (error) {
    console.error('API Route Error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : '请求失败' },
      { status: 500 }
    );
  }
}
