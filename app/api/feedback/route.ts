import { promises as fs } from 'fs';
import { NextRequest, NextResponse } from 'next/server';
import path from 'path';

export async function POST(req: NextRequest) {
  try {
    const feedback = await req.json();
    
    // 读取现有反馈文件
    const filePath = path.join(process.cwd(), 'public/data/feedback.json');
    const fileData = await fs.readFile(filePath, 'utf8');
    const data = JSON.parse(fileData);
    
    // 添加新反馈
    data.feedback.push(feedback);
    
    // 写入文件
    await fs.writeFile(filePath, JSON.stringify(data, null, 2));
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('保存反馈时出错:', error);
    return NextResponse.json(
      { error: '保存反馈失败' },
      { status: 500 }
    );
  }
} 