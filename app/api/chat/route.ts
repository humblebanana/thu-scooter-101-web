import { NextRequest, NextResponse } from 'next/server';

const DIFY_API_KEY = process.env.DIFY_API_KEY;
const DIFY_API_URL = "https://api.dify.ai/v1/chat-messages";

export const runtime = 'edge'

export async function POST(req: Request) {
  const DIFY_API_KEY = process.env.DIFY_API_KEY;
  const DIFY_API_URL = "https://api.dify.ai/v1/chat-messages";
  
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
      throw new Error(`API Error: ${response.status}`);
    }

    // 直接返回流式响应
    return new Response(response.body, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
        'x-powered-by': 'edge-runtime',
        'x-edge-runtime': 'true'
      },
    });

  } catch (error) {
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : '未知错误' 
      }),
      { 
        status: 500, 
        headers: { 'Content-Type': 'application/json' } 
      }
    );
  }
}
