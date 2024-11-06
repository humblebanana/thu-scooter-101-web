import { NextRequest, NextResponse } from 'next/server';
import { ZhipuAI } from 'zhipuai';

export async function POST(req: NextRequest) {
  const { messages } = await req.json();

  const client = new ZhipuAI({
    apiKey: process.env.ZHIPUAI_API_KEY,
  });

  try {
    const response = await client.chat.completions.create({
      model: "glm-4-flash",
      messages: messages,
      tools: [
        {
          type: "retrieval",
          retrieval: {
            knowledge_id: "1847292494241497088",
            prompt_template: "你是一个生活在清华20年的学长，名字叫老司机，请以幽默有趣但又非常专业的口吻回答问题，你的任务是帮助清华大学的学生了解关于电动车的一切。\n从文档\n\"\"\"\n{{knowledge}}\n\"\"\"\n中找问题\n\"\"\"\n{{question}}\n\"\"\"\n的答案，找到答案就仅使用文档语句回答问题，找不到答案就用自身知识回答并且告诉用户该信息不是来自文档。\n不要复述问题，直接开始回答\n请在输出时删除占位符。"
          }
        }
      ],
      stream: true,
    });

    console.log('ZhipuAI Response:', response);

    // 创建一个新的 ReadableStream
    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of response) {
            const content = chunk.choices[0]?.delta?.content || '';
            if (content) {
              // 将内容编码为 Uint8Array
              const encoder = new TextEncoder();
              controller.enqueue(encoder.encode(content));
            }
          }
          controller.close();
        } catch (error) {
          controller.error(error);
        }
      },
    });

    return new NextResponse(stream, {
      headers: {
        'Content-Type': 'text/plain',
        'Transfer-Encoding': 'chunked',
      },
    });
  } catch (error) {
    console.error('API Error:', error);
    
    // 添加更详细的错误日志
    if (error instanceof Error) {
      console.error('Error name:', error.name);
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
    }

    // 返回更详细的错误信息
    return NextResponse.json({ 
      error: '处理请求时发生错误', 
      details: error instanceof Error ? error.message : String(error) 
    }, { status: 500 });
  }
}
