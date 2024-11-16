import { NextRequest, NextResponse } from 'next/server';

const DIFY_API_KEY = process.env.DIFY_API_KEY;
const DIFY_API_URL = "https://api.dify.ai/v1/chat-messages";

export async function POST(req: NextRequest) {
  const controller = new AbortController();
  
  try {
    // 监听请求中止
    req.signal.addEventListener('abort', () => {
      controller.abort();
    });

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
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    // 创建转换流来处理响应
    const transformStream = new TransformStream({
      transform(chunk, controller) {
        controller.enqueue(chunk);
      },
    });

    // 将响应流通过管道传输到转换流
    if (response.body) {
      response.body.pipeTo(transformStream.writable).catch((error) => {
        if (error.name !== 'AbortError') {
          console.error('Stream error:', error);
        }
      });
    }

    return new Response(transformStream.readable, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });

  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      return new Response('{"error": "请求已中止"}', {
        status: 499,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : '未知错误' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
